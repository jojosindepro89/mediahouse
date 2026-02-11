import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        // 1. Create Admin User
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const admin = await prisma.user.upsert({
            where: { email: "admin@chibazen.com" },
            update: {},
            create: {
                email: "admin@chibazen.com",
                name: "Chibazen Admin",
                password: hashedPassword,
                role: "admin",
            },
        });

        // 2. Create Predictions
        const predictions = [
            {
                title: "Man City vs Liverpool",
                date: new Date(new Date().setDate(new Date().getDate() + 1)),
                content: "Both teams to score & Over 2.5 Goals. High intensity match predicted.",
                odds: "1.85",
                confidence: 90,
                isPremium: true,
                status: "pending",
            },
            {
                title: "Real Madrid vs Barcelona",
                date: new Date(new Date().setDate(new Date().getDate() + 2)),
                content: "Real Madrid to Win. Home advantage is key here.",
                odds: "2.10",
                confidence: 85,
                isPremium: true,
                status: "pending",
            },
            {
                title: "Arsenal vs Chelsea",
                date: new Date(),
                content: "Arsenal to Win. Chelsea's defense is shaky.",
                odds: "1.95",
                confidence: 88,
                isPremium: false,
                status: "pending",
            },
            {
                title: "Bayern Munich vs Dortmund",
                date: new Date(),
                content: "Over 3.5 Goals. Both teams attack aggressively.",
                odds: "2.50",
                confidence: 80,
                isPremium: true,
                status: "pending",
            },
            {
                title: "PSG vs Lyon",
                date: new Date(new Date().setDate(new Date().getDate() - 1)),
                content: "PSG -1.5 Handicap.",
                odds: "1.65",
                confidence: 95,
                isPremium: true,
                status: "won",
                result: "won"
            },
        ];

        for (const p of predictions) {
            await prisma.prediction.create({
                data: p,
            });
        }

        // 3. Create Products for Shop
        const products = [
            {
                name: "Chibazen Premium Jersey",
                description: "Official limited edition jersey. Black and Gold.",
                price: 49.99,
                images: JSON.stringify(["https://placehold.co/600x400/000000/D4AF37/png?text=Jersey+Front", "https://placehold.co/600x400/000000/D4AF37/png?text=Jersey+Back"]),
                stock: 50,
                category: "Apparel",
            },
            {
                name: "Golden Victory Cap",
                description: "Stylish snapback with embroidered logo.",
                price: 24.99,
                images: JSON.stringify(["https://placehold.co/600x400/000000/D4AF37/png?text=Cap"]),
                stock: 100,
                category: "Accessories",
            },
            {
                name: "VIP Membership Card (Physical)",
                description: "Exclusive metal card for VIP members.",
                price: 99.99,
                images: JSON.stringify(["https://placehold.co/600x400/000000/D4AF37/png?text=VIP+Card"]),
                stock: 20,
                category: "Collectibles",
            },
        ];

        for (const p of products) {
            await prisma.product.create({
                data: p,
            });
        }

        // 4. Create News Posts
        const posts = [
            {
                title: "Season Opener: What to Expect",
                slug: "season-opener-what-to-expect",
                content: "<p>The new season kicks off with a bang. Here is our analysis...</p>",
                excerpt: "The new season kicks off with a bang. Here is our analysis of the top contenders.",
                category: "Analysis",
                status: "published",
                publishedAt: new Date(),
            },
            {
                title: "Top 5 Transfers of the Summer",
                slug: "top-5-transfers-summer",
                content: "<p>Big money moves have reshaped the landscape...</p>",
                excerpt: "Big money moves have reshaped the landscape. Who did the best business?",
                category: "Transfers",
                status: "published",
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
            },
        ];

        for (const p of posts) {
            await prisma.post.upsert({
                where: { slug: p.slug },
                update: {},
                create: p,
            });
        }

        return NextResponse.json({ message: "Seed successful" });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Seed failed" }, { status: 500 });
    }
}
