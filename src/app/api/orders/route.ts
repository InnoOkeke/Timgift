import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/orders - Fetch all orders (Admin)
export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const formattedOrders = orders.map(o => ({
            ...o,
            items: o.items ? JSON.parse(o.items) : []
        }));

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error("API GET Orders Error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

// POST /api/orders - Create a new order (Checkout)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerPhone, customerAddress, items, totalAmount } = body;

        const order = await prisma.order.create({
            data: {
                customerName,
                customerPhone,
                customerAddress,
                items: JSON.stringify(items),
                totalAmount: parseFloat(totalAmount),
                status: "PENDING"
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("API POST Order Error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
