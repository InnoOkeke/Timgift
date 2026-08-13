import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";

// GET /api/products - Fetch all products (public)
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const formattedProducts = products.map((p) => ({
            ...p,
            media: p.media ? JSON.parse(p.media) : []
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("API GET Products Error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: Request) {
    const authError = await requireAdminSession();
    if (authError) return authError;

    try {
        const body = await request.json();
        const { name, description, price, category, status, media, stockQuantity, featured, limitedTimeDeal } = body;

        if (!name || !description || !category || price === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stockQuantity ?? 0);

        if (isNaN(parsedPrice) || parsedPrice < 0) {
            return NextResponse.json({ error: "Invalid price" }, { status: 400 });
        }
        if (isNaN(parsedStock) || parsedStock < 0) {
            return NextResponse.json({ error: "Invalid stock quantity" }, { status: 400 });
        }

        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();

        const product = await prisma.product.create({
            data: {
                name: String(name).slice(0, 200),
                slug,
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
        revalidatePath('/admin/products');

        return NextResponse.json(product);
    } catch (error) {
        console.error("API POST Product Error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
