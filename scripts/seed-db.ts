import { seedDatabase } from "@/lib/seed-data";
import { prisma } from "@/lib/prisma";

seedDatabase()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
