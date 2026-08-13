import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";

// GET /api/products/[id] - Fetch a single product (public)
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const numId = parseInt(id);
        if (isNaN(numId)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id: numId } });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...product,
            media: product.media ? JSON.parse(product.media) : []
        });
    } catch (error) {
        console.error("API GET Product ID Error:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

// PUT /api/products/[id] - Update a product (admin only)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdminSession();
    if (authError) return authError;

    try {
        const { id } = await params;
        const numId = parseInt(id);
        if (isNaN(numId)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const body = await request.json();
        const { name, description, price, category, status, media, stockQuantity, featured, limitedTimeDeal } = body;

        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stockQuantity);

        if (isNaN(parsedPrice) || parsedPrice < 0) {
            return NextResponse.json({ error: "Invalid price" }, { status: 400 });
        }
        if (isNaN(parsedStock) || parsedStock < 0) {
            return NextResponse.json({ error: "Invalid stock quantity" }, { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id: numId },
            data: {
                name: String(name).slice(0, 200),
                description: String(description).slice(0, 5000),
                price: parsedPrice,
                category: String(category).slice(0, 100),
                status: status === "PRE_ORDER" ? "PRE_ORDER" : "IN_STOCK",
                media: JSON.stringify(Array.isArray(media) ? media : []),
                stockQuantity: parsedStock,
                featured: Boolean(featured),
                limitedTimeDeal: Boolean(limitedTimeDeal),
            }
        });

        revalidatePath('/');
        revalidatePath('/products');
        revalidatePath(`/product/${id}`);
        revalidatePath('/admin/products');

        return NextResponse.json(product);
    } catch (error) {
        console.error("API PUT Product ID Error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

// DELETE /api/products/[id] - Delete a product (admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdminSession();
    if (authError) return authError;

    try {
        const { id } = await params;
        const numId = parseInt(id);
        if (isNaN(numId)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        await prisma.product.delete({ where: { id: numId } });

        revalidatePath('/');
        revalidatePath('/products');
        revalidatePath('/admin/products');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API DELETE Product ID Error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
