
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkLatestProducts() {
    try {
        const products = await prisma.product.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                featured: true,
                status: true,
                createdAt: true
            }
        });
        console.log(JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Error fetching products:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkLatestProducts();
