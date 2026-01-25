import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// GET /api/products - Fetch all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const formattedProducts = products.map((p: any) => ({
            ...p,
            media: p.media ? JSON.parse(p.media) : []
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("API GET Products Error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, price, category, status, media, stockQuantity, featured } = body;

        // Generate a simple slug
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price: parseFloat(price),
                category,
                status: status || "IN_STOCK",
                media: JSON.stringify(media || []),
                stockQuantity: parseInt(stockQuantity || 0),
                featured: Boolean(featured)
            }
        });

        revalidatePath('/');
        revalidatePath('/products');
        revalidatePath('/admin/products');

        return NextResponse.json(product);
    } catch (error) {
        console.error("API POST Product Error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
