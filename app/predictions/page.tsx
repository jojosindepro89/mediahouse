import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PredictionCard from "@/components/PredictionCard";
import SubscribeButton from "@/components/SubscribeButton";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic"; // Revalidate every minute

export default async function PredictionsPage() {
    const session = await getServerSession(authOptions);

    // Check if user has active subscription
    let isPremiumUser = false;
    if (session?.user?.id) {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                subscriptions: {
                    where: {
                        status: "active",
                        endDate: { gte: new Date() },
                    },
                },
            },
        });
        isPremiumUser = !!(user?.subscriptions && user.subscriptions.length > 0);
    }

    // Fetch Predictions
    const predictions = await prisma.prediction.findMany({
        orderBy: { date: "asc" },
    });

    // Group by Date (Today, Tomorrow, Later, Past)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysPredictions = predictions.filter(
        (p) =>
            p.date >= today && p.date < tomorrow
    );

    const tomorrowsPredictions = predictions.filter(
        (p) =>
            p.date >= tomorrow &&
            p.date < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
    );

    const otherPredictions = predictions.filter(
        (p) => p.date >= new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
    );

    const pastPredictions = predictions.filter((p) => p.date < today);


    const renderSection = (title: string, items: typeof predictions) => {
        if (items.length === 0) return null;
        return (
            <div className="mb-12">
                <h2 className="mb-6 border-l-4 border-[#D4AF37] pl-4 text-2xl font-bold text-[#F5F5F5]">
                    {title}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((prediction) => (
                        <PredictionCard
                            key={prediction.id}
                            prediction={prediction}
                            isPremiumUser={isPremiumUser}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-[#D4AF37] sm:text-5xl">
                    Expert Predictions
                </h1>
                <p className="mt-4 text-lg text-[#BDBDBD]">
                    Daily betting tips from our professional analysts.
                </p>
            </div>

            {/* Subscription Banner (if not premium) */}
            {/* Subscription Banner (if not premium) */}
            {!isPremiumUser && (
                <div className="mb-12 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#0B0B0B] p-8 text-center ring-1 ring-[#D4AF37]/50">
                    <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-[#D4AF37]" />
                    <h2 className="text-2xl font-bold text-[#F5F5F5]">
                        Unlock Premium Tips
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-[#BDBDBD]">
                        Get access to high-confidence predictions, detailed analysis, and
                        exclusive insights. Start winning today.
                    </p>

                    {session?.user ? (
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <div className="rounded-lg border border-[#333] bg-[#121212] p-4 shadow-sm">
                                <h3 className="text-lg font-bold text-[#F5F5F5]">Weekly Plan</h3>
                                <p className="text-2xl font-bold text-[#D4AF37]">₦2,000</p>
                                {/* @ts-ignore */}
                                <SubscribeButton amount={200000} plan="weekly" email={session.user.email!} />
                            </div>
                            <div className="rounded-lg border border-[#D4AF37] bg-[#121212] p-4 shadow-md relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-bold text-black">
                                    Best Value
                                </div>
                                <h3 className="text-lg font-bold text-[#F5F5F5]">Monthly Plan</h3>
                                <p className="text-2xl font-bold text-[#D4AF37]">₦5,000</p>
                                {/* @ts-ignore */}
                                <SubscribeButton amount={500000} plan="monthly" email={session.user.email!} />
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login?callbackUrl=/predictions"
                            className="mt-6 inline-block rounded-md bg-[#D4AF37] px-8 py-3 text-base font-bold text-black shadow-lg hover:bg-[#B5952F] hover:scale-105 transition-all"
                        >
                            Login to Subscribe
                        </Link>
                    )}
                </div>
            )}

            {/* Predictions Sections */}
            {renderSection("Today's Tips", todaysPredictions)}
            {renderSection("Tomorrow's Tips", tomorrowsPredictions)}
            {renderSection("Upcoming", otherPredictions)}
            {renderSection("Past Results", pastPredictions)}

            {predictions.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[#BDBDBD]">No predictions available at the moment. Check back soon!</p>
                </div>
            )}
        </div>
    );
}
