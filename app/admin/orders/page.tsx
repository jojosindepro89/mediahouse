import { prisma } from "@/lib/prisma";
import { DollarSign, Package } from "lucide-react";

export const revalidate = 0;

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#F5F5F5]">Manage Orders</h1>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-[#333] bg-[#121212]">
                <table className="min-w-full divide-y divide-[#333]">
                    <thead className="bg-[#0B0B0B]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Items
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333] bg-[#121212]">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#BDBDBD]">
                                    ...{order.id.slice(-8)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-[#F5F5F5]">{order.user?.name || "Unknown"}</span>
                                        <span className="text-xs text-[#666]">{order.user?.email || "No Email"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#BDBDBD]">
                                    <ul className="list-disc pl-4">
                                        {order.items.map((item) => (
                                            <li key={item.id}>
                                                {item.quantity}x {item.product.name}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-[#D4AF37]">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <span className="inline-flex rounded-full bg-green-900/20 px-2 text-xs font-semibold leading-5 text-green-400">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#BDBDBD]">
                                    {order.createdAt.toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
