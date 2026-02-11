import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    // Fetch updated user data including subscription
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            subscriptions: {
                where: {
                    status: "active",
                    endDate: { gte: new Date() },
                },
                orderBy: { endDate: "desc" },
                take: 1,
            },
            orders: {
                orderBy: { createdAt: "desc" },
                include: {
                    items: {
                        include: { product: true }
                    }
                }
            }
        },
    });

    const activeSubscription = user?.subscriptions[0];
    const isPremium = !!activeSubscription;

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="rounded-lg border border-[#333] bg-[#121212] p-8 shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-[#D4AF37]">Dashboard</h1>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* User Profile */}
                    <div className="space-y-4 rounded-md bg-[#0B0B0B] p-6 shadow-sm ring-1 ring-[#333]">
                        <h2 className="text-xl font-semibold text-[#F5F5F5]">Profile</h2>
                        <div className="space-y-2">
                            <p className="text-[#BDBDBD]">
                                <span className="block text-xs font-medium uppercase text-[#666]">
                                    Name
                                </span>
                                {user?.name}
                            </p>
                            <p className="text-[#BDBDBD]">
                                <span className="block text-xs font-medium uppercase text-[#666]">
                                    Email
                                </span>
                                {user?.email}
                            </p>
                            <p className="text-[#BDBDBD]">
                                <span className="block text-xs font-medium uppercase text-[#666]">
                                    Role
                                </span>
                                {user?.role}
                            </p>
                        </div>
                    </div>

                    {/* Subscription Status */}
                    <div className="space-y-4 rounded-md bg-[#0B0B0B] p-6 shadow-sm ring-1 ring-[#333]">
                        <h2 className="text-xl font-semibold text-[#F5F5F5]">
                            Subscription
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[#BDBDBD]">
                                    <span className="block text-xs font-medium uppercase text-[#666]">
                                        Status
                                    </span>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${isPremium
                                            ? "bg-green-900 text-green-100"
                                            : "bg-red-900 text-red-100"
                                            }`}
                                    >
                                        {isPremium ? "Active" : "Inactive"}
                                    </span>
                                </p>
                            </div>

                            {isPremium ? (
                                <div>
                                    <p className="text-[#BDBDBD]">
                                        <span className="block text-xs font-medium uppercase text-[#666]">
                                            Plan
                                        </span>
                                        {activeSubscription.plan}
                                    </p>
                                    <p className="text-[#BDBDBD]">
                                        <span className="block text-xs font-medium uppercase text-[#666]">
                                            Expires
                                        </span>
                                        {activeSubscription.endDate.toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm text-[#BDBDBD]">
                                        You don't have an active subscription.
                                    </p>
                                    <Link
                                        href="/predictions"
                                        className="mt-4 inline-block rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#B5952F]"
                                    >
                                        Get Premium Tips
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div className="md:col-span-2 space-y-4 rounded-md bg-[#0B0B0B] p-6 shadow-sm ring-1 ring-[#333]">
                    <h2 className="text-xl font-semibold text-[#F5F5F5]">
                        Order History
                    </h2>
                    {user?.orders && user.orders.length > 0 ? (
                        <div className="overflow-x-auto text-[#BDBDBD]">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-[#333] text-[#666]">
                                    <tr>
                                        <th className="pb-2">Order ID</th>
                                        <th className="pb-2">Items</th>
                                        <th className="pb-2">Total</th>
                                        <th className="pb-2">Status</th>
                                        <th className="pb-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {user.orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="py-2">...{order.id.slice(-6)}</td>
                                            <td className="py-2">
                                                {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(", ")}
                                            </td>
                                            <td className="py-2 font-bold text-[#D4AF37]">${order.total.toFixed(2)}</td>
                                            <td className="py-2 capitalize">{order.status}</td>
                                            <td className="py-2">{order.createdAt.toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-[#BDBDBD]">No orders found.</p>
                    )}
                </div>
            </div>

            {user?.role === "admin" && (
                <div className="mt-8">
                    <Link
                        href="/admin"
                        className="inline-block rounded-md border border-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    >
                        Go to Admin Dashboard
                    </Link>
                </div>
            )}
        </div>

    );
}
