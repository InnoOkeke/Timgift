import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerEmail, customerPhone, customerAddress, items } = body;

        if (!customerName || !customerEmail || !customerPhone || !customerAddress || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (typeof customerEmail !== "string" || !customerEmail.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
        }

        // Recalculate total server-side — never trust the client-supplied amount
        let serverTotal = 0;
        const validatedItems: { id: number; name: string; price: number; quantity: number; media: any }[] = [];

        for (const item of items) {
            const productId = parseInt(item.id);
            if (isNaN(productId)) continue;

            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) {
                return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
            }

            const quantity = Math.max(1, parseInt(item.quantity) || 1);

            // Stock check
            if (product.status === "IN_STOCK" && product.stockQuantity < quantity) {
                return NextResponse.json(
                    { error: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}` },
                    { status: 400 }
                );
            }

            serverTotal += product.price * quantity;
            validatedItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                media: item.media ?? [],
            });
        }

        if (validatedItems.length === 0) {
            return NextResponse.json({ error: "No valid items in order" }, { status: 400 });
        }

        const reference = `TG-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/verify?reference=${reference}`;

        // Initialize transaction with Paystack using the server-calculated total
        const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: customerEmail,
                amount: Math.round(serverTotal * 100), // kobo, server-calculated
                currency: "NGN",
                reference,
                callback_url: callbackUrl,
                metadata: {
                    customer_name: customerName,
                    phone: customerPhone,
                    address: customerAddress,
                    cancel_action: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout`,
                },
            }),
        });

        const paystackData = await paystackRes.json();

        if (!paystackData.status) {
            console.error("Paystack init error:", paystackData);
            return NextResponse.json({ error: paystackData.message || "Failed to initialize payment" }, { status: 500 });
        }

        // Save pending order with server-calculated total
        await prisma.order.create({
            data: {
                customerName,
                customerPhone,
                customerAddress,
                items: JSON.stringify(validatedItems),
                totalAmount: serverTotal,
                status: "PENDING",
                paymentStatus: "UNPAID",
                paymentReference: reference,
            },
        });

        return NextResponse.json({ authorization_url: paystackData.data.authorization_url });

    } catch (error) {
        console.error("Payment Initialize Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
