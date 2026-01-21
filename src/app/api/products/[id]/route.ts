import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/[id] - Fetch a single product
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const formattedProduct = {
            ...product,
            media: product.media ? JSON.parse(product.media) : []
        };

        return NextResponse.json(formattedProduct);
    } catch (error) {
        console.error("API GET Product ID Error:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description, price, category, status, media, stockQuantity, featured } = body;

        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                status,
                media: JSON.stringify(media),
                stockQuantity: parseInt(stockQuantity),
                featured: Boolean(featured)
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("API PUT Product ID Error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API DELETE Product ID Error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
