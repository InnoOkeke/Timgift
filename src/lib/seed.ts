import prisma from "@/lib/prisma";
import { PRODUCTS } from "@/lib/data";

async function seed() {
    console.log("Seeding database...");

    for (const product of PRODUCTS) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: {
                name: product.name,
                slug: product.slug,
                description: product.description,
                price: product.price,
                category: product.category,
                status: product.status,
                stockQuantity: product.stockQuantity,
                media: JSON.stringify(product.media),
            },
        });
    }

    console.log("Seeding completed!");
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
