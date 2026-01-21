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

        // Stock Validation: Ensure items aren't over-ordered
        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: parseInt(item.id) } });
            if (product && product.status === 'IN_STOCK' && product.stockQuantity < parseInt(item.quantity)) {
                return NextResponse.json({
                    error: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}`
                }, { status: 400 });
            }
        }

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

// PATCH /api/orders - Update order status (Admin)
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "Missing ID or Status" }, { status: 400 });
        }

        // Fetch current order to check status before update
        const currentOrder = await prisma.order.findUnique({
            where: { id: parseInt(id) }
        });

        if (!currentOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Handle Inventory Reduction: ONLY when transitioning TO 'COMPLETED' from something else
        if (status === 'COMPLETED' && currentOrder.status !== 'COMPLETED') {
            try {
                const items = JSON.parse(currentOrder.items);

                if (Array.isArray(items) && items.length > 0) {
                    // Filter out invalid items and prepare updates
                    const updates = items
                        .filter((item: any) => item && item.id && !isNaN(parseInt(item.id)))
                        .map((item: any) =>
                            prisma.product.update({
                                where: { id: parseInt(item.id) },
                                data: {
                                    stockQuantity: {
                                        decrement: Math.max(0, parseInt(item.quantity) || 0)
                                    }
                                }
                            })
                        );

                    if (updates.length > 0) {
                        await prisma.$transaction(updates);
                    }
                }
            } catch (err) {
                console.error("Critical: Inventory deduction failed for order", id, err);
                // We might want to stop the status update if inventory deduction fails
                return NextResponse.json({ error: "Inventory update failed. Please check stock levels." }, { status: 500 });
            }
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error("API PATCH Order Error:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
