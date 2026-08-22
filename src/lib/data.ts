import prisma from "./prisma";
import { Product } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

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
    noStore();
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
    noStore();
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
    noStore();
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
    noStore();
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
    noStore();
    try {
        const products = await prisma.product.findMany({
            where: { status: 'IN_STOCK', featured: false },
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
        // If there aren't enough non-featured products, fill with featured ones
        if (products.length < 4) {
            const extras = await prisma.product.findMany({
                where: {
                    status: 'IN_STOCK',
                    id: { notIn: products.map(p => p.id) }
                },
                take: limit - products.length,
                orderBy: { createdAt: 'desc' }
            });
            return [...products, ...extras].map(parseProduct);
        }
        return products.map(parseProduct);
    } catch (error) {
        console.error("Error fetching latest products:", error);
        return [];
    }
};

export const getLimitedTimeDeals = async (limit: number = 8) => {
    noStore();
    try {
        const products = await prisma.product.findMany({
            where: { limitedTimeDeal: true },
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
        return products.map(parseProduct);
    } catch (error) {
        console.error("Error fetching limited time deals:", error);
        return [];
    }
};

export const getBestSellers = async (limit: number = 8) => {
    noStore();
    try {
        const products = await prisma.product.findMany({
            where: { status: 'IN_STOCK' },
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
        return products.map(parseProduct);
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        return [];
    }
};

// We keep the PRODUCTS constant as a fallback or for development reference
export const PRODUCTS: Product[] = []; 
