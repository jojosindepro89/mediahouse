import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Newspaper, Trophy, ShoppingBag, LogOut, Calendar } from "lucide-react";
import clsx from "clsx";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Predictions", href: "/admin/predictions", icon: Trophy },
        { name: "News", href: "/admin/news", icon: Newspaper },
        { name: "Products", href: "/admin/products", icon: ShoppingBag },
        { name: "Orders", href: "/admin/orders", icon: Calendar },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-[#0B0B0B]">
            {/* Sidebar */}
            <div className="hidden w-64 flex-col border-r border-[#333] bg-[#121212] md:flex">
                <div className="flex h-16 items-center px-6">
                    <span className="text-xl font-bold tracking-tight text-[#D4AF37]">
                        CHIGOZIEMEDIA<span className="text-[#F5F5F5]">ADMIN</span>
                    </span>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
                    <nav className="flex-1 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-[#BDBDBD] hover:bg-[#1a1a1a] hover:text-[#D4AF37]"
                            >
                                <item.icon
                                    className="mr-3 h-5 w-5 flex-shrink-0 text-[#666] group-hover:text-[#D4AF37]"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="border-t border-[#333] p-4">
                    <Link
                        href="/"
                        className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-[#BDBDBD] hover:bg-[#1a1a1a] hover:text-[#D4AF37]"
                    >
                        <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-[#666] group-hover:text-red-500" />
                        Exit Admin
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
