import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";

// GET /api/orders - Fetch all orders (admin only)
export async function GET() {
    const authError = await requireAdminSession();
    if (authError) return authError;

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

// POST /api/orders - This endpoint is no longer used directly.
// Orders are now created via /api/payment/initialize after Paystack verification.
// Kept for backward compatibility but returns 410 Gone.
export async function POST() {
    return NextResponse.json({ error: "Use /api/payment/initialize to place orders." }, { status: 410 });
}

// PATCH /api/orders - Update order status (admin only)
export async function PATCH(request: Request) {
    const authError = await requireAdminSession();
    if (authError) return authError;

    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "Missing ID or Status" }, { status: 400 });
        }

        // Whitelist valid statuses
        const VALID_STATUSES = ["PENDING", "COMPLETED", "CANCELLED"];
        if (!VALID_STATUSES.includes(status)) {
            return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
        }

        const currentOrder = await prisma.order.findUnique({
            where: { id: parseInt(id) }
        });

        if (!currentOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Handle Inventory Reduction: ONLY when transitioning TO 'COMPLETED'
        if (status === 'COMPLETED' && currentOrder.status !== 'COMPLETED') {
            try {
                const items = JSON.parse(currentOrder.items);

                if (Array.isArray(items) && items.length > 0) {
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
                return NextResponse.json({ error: "Inventory update failed." }, { status: 500 });
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
