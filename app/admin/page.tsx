import { prisma } from "@/lib/prisma";
import { Users, Trophy, ShoppingBag, DollarSign } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
    const [userCount, predictionCount, productCount, subscriptionCount] = await Promise.all([
        prisma.user.count(),
        prisma.prediction.count(),
        prisma.product.count(),
        prisma.subscription.count({ where: { status: "active" } }),
    ]);

    const stats = [
        { name: "Total Users", value: userCount, icon: Users },
        { name: "Active Predictions", value: predictionCount, icon: Trophy },
        { name: "Products", value: productCount, icon: ShoppingBag },
        { name: "Active Subscribers", value: subscriptionCount, icon: DollarSign },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#F5F5F5]">Admin Dashboard</h1>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="overflow-hidden rounded-lg border border-[#333] bg-[#121212] p-6 shadow-sm"
                    >
                        <div className="flex items-center">
                            <div className="rounded-md bg-[#0B0B0B] p-3 text-[#D4AF37] ring-1 ring-[#333]">
                                <item.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-[#BDBDBD]">
                                        {item.name}
                                    </dt>
                                    <dd className="text-2xl font-bold text-[#F5F5F5]">
                                        {item.value}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
