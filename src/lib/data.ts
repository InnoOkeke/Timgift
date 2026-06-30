import prisma from "./prisma";
import { Product } from "@/types";

// Maps legacy/old category values → current category names.
// If a product is saved with an old name, it will still appear under the right category.
export const CATEGORY_ALIASES: Record<string, string> = {
    "SMARTPHONES":   "ANDROID",
    "SMART GADGETS": "AIRPODS",
    "COMPUTERS":     "WINDOWS LAPTOPS",
    "FASHION":       "ANDROID",
};

// Normalise a stored category value to its canonical display name
export const normaliseCategory = (category: string): string =>
    CATEGORY_ALIASES[category.toUpperCase()] ?? category;

function parseProduct(p: { media: string; category: string; [key: string]: unknown }): Product {
    return {
        ...p,
        category: normaliseCategory(p.category),
        media: p.media ? JSON.parse(p.media) : [],
    } as Product;
}

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return products.map(parseProduct);
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProductById = async (id: string | number) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) }
        });
        if (!product) return null;
        return parseProduct(product);
    } catch (error) {
        console.error("Error fetching product by id:", error);
        return null;
    }
};

export const getFeaturedProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            where: { featured: true },
            take: 4,
            orderBy: { createdAt: 'desc' }
        });
        return products.map(parseProduct);
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
};

export const getPreOrderProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            where: { status: 'PRE_ORDER' },
            orderBy: { createdAt: 'desc' }
        });
        return products.map(parseProduct);
    } catch (error) {
        console.error("Error fetching pre-order products:", error);
        return [];
    }
};

export const getLatestProducts = async (limit: number = 8) => {
    try {
        const products = await prisma.product.findMany({
            where: { status: 'IN_STOCK' },
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
        return products.map(parseProduct);
    } catch (error) {
        console.error("Error fetching latest products:", error);
        return [];
    }
};

// We keep the PRODUCTS constant as a fallback or for development reference
export const PRODUCTS: Product[] = []; 
