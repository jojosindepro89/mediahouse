import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trophy, TrendingUp, Calendar, AlertCircle } from "lucide-react";

export const revalidate = 0;

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    // Admins have their own dashboard
    if (session.user.role === "admin") {
        redirect("/admin");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: {
            subscriptions: {
                where: {
                    status: "active",
                    endDate: { gt: new Date() },
                },
                orderBy: { endDate: "desc" },
            },
        },
    });

    const activeSubscription = user?.subscriptions[0];
    const isPremium = !!activeSubscription;

    // Fetch premium predictions if user has active sub
    const premiumPredictions = isPremium
        ? await prisma.prediction.findMany({
            where: {
                isPremium: true,
                status: "published",
            },
            orderBy: { date: "desc" },
            take: 5,
        })
        : [];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold text-[#F5F5F5]">My Dashboard</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Subscription Status Card */}
                <div className="rounded-lg border border-[#333] bg-[#121212] p-6 lg:col-span-1">
                    <h2 className="mb-4 text-xl font-semibold text-[#D4AF37]">Subscription Status</h2>
                    {isPremium ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-green-500">
                                <Trophy className="h-6 w-6" />
                                <span className="font-medium">Active Member</span>
                            </div>
                            <p className="text-[#BDBDBD]">
                                Plan: <span className="text-[#F5F5F5] font-bold">{activeSubscription.plan}</span>
                            </p>
                            <p className="text-[#BDBDBD]">
                                Expires:{" "}
                                <span className="text-[#F5F5F5]">
                                    {activeSubscription.endDate.toLocaleDateString()}
                                </span>
                            </p>
                            <Link
                                href="/predictions"
                                className="mt-4 block w-full rounded-md bg-[#D4AF37] px-4 py-2 text-center text-sm font-bold text-black hover:bg-[#B5952F]"
                            >
                                View Premium Tips
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#BDBDBD]">
                                <AlertCircle className="h-6 w-6" />
                                <span>No Active Subscription</span>
                            </div>
                            <p className="text-sm text-[#666]">
                                Unlock expert predictions and increase your winning chances today.
                            </p>
                            <Link
                                href="/predictions"
                                className="mt-4 block w-full rounded-md bg-[#D4AF37] px-4 py-2 text-center text-sm font-bold text-black hover:bg-[#B5952F]"
                            >
                                Get Premium Integration
                            </Link>
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Premium Tips Preview */}
                    {isPremium && (
                        <div className="rounded-lg border border-[#333] bg-[#121212] p-6">
                            <h2 className="mb-4 text-xl font-semibold text-[#F5F5F5]">
                                Latest Premium Tips
                            </h2>
                            {premiumPredictions.length > 0 ? (
                                <div className="space-y-4">
                                    {premiumPredictions.map((pred) => (
                                        <div
                                            key={pred.id}
                                            className="flex items-center justify-between border-b border-[#333] pb-4 last:border-0 last:pb-0"
                                        >
                                            <div>
                                                <h3 className="font-medium text-[#D4AF37]">{pred.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-[#666]">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{pred.date.toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/predictions`}
                                                className="text-sm font-semibold text-[#F5F5F5] hover:text-[#D4AF37]"
                                            >
                                                View &rarr;
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[#BDBDBD]">No new premium tips available today.</p>
                            )}
                        </div>
                    )}

                    {/* Quick Stats / History Placeholder */}
                    <div className="rounded-lg border border-[#333] bg-[#121212] p-6">
                        <h2 className="mb-4 text-xl font-semibold text-[#F5F5F5]">Results History</h2>
                        <div className="flex items-center justify-center py-8 text-[#666]">
                            <TrendingUp className="mr-2 h-5 w-5" />
                            <span>Your betting history will appear here.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
