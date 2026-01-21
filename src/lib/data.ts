import prisma from "./prisma";
import { Product } from "@/types";

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return products.map(p => ({
            ...p,
            media: p.media ? JSON.parse(p.media) : []
        })) as Product[];
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

        return {
            ...product,
            media: product.media ? JSON.parse(product.media) : []
        } as Product;
    } catch (error) {
        console.error("Error fetching product by id:", error);
        return null;
    }
};

export const getFeaturedProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            take: 4,
            orderBy: { createdAt: 'desc' }
        });

        return products.map(p => ({
            ...p,
            media: p.media ? JSON.parse(p.media) : []
        })) as Product[];
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

        return products.map(p => ({
            ...p,
            media: p.media ? JSON.parse(p.media) : []
        })) as Product[];
    } catch (error) {
        console.error("Error fetching pre-order products:", error);
        return [];
    }
};

// We keep the PRODUCTS constant as a fallback or for development reference
export const PRODUCTS: Product[] = []; 
