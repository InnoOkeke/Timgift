import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get("reference");

        if (!reference || typeof reference !== "string" || reference.length > 100) {
            return NextResponse.json({ error: "Invalid reference" }, { status: 400 });
        }

        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
        }

        // Look up the order first — reference must exist and be unpaid
        const order = await prisma.order.findFirst({
            where: { paymentReference: reference, paymentStatus: "UNPAID" },
        });

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found or already processed" }, { status: 400 });
        }

        // Verify with Paystack
        const paystackRes = await fetch(
            `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
            { headers: { Authorization: `Bearer ${secretKey}` } }
        );

        const paystackData = await paystackRes.json();

        if (!paystackData.status || paystackData.data?.status !== "success") {
            return NextResponse.json({ success: false, message: "Payment not verified" }, { status: 400 });
        }

        // Confirm the amount Paystack charged matches our server-stored total (within 1 kobo tolerance)
        const paidAmountKobo: number = paystackData.data.amount;
        const expectedAmountKobo = Math.round(order.totalAmount * 100);

        if (Math.abs(paidAmountKobo - expectedAmountKobo) > 1) {
            console.error(`Amount mismatch for ref ${reference}: expected ${expectedAmountKobo}, got ${paidAmountKobo}`);
            return NextResponse.json({ success: false, message: "Payment amount mismatch" }, { status: 400 });
        }

        // Mark order as paid
        await prisma.order.update({
            where: { id: order.id },
            data: { paymentStatus: "PAID", status: "PENDING" },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Payment Verify Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
