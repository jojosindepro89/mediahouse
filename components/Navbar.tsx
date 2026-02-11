"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import clsx from "clsx";

const navigation = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Predictions", href: "/predictions" },
    { name: "Shop", href: "/shop" },
    { name: "Live", href: "/live" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[#333] bg-[#0B0B0B]/95 backdrop-blur-sm">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Chibazen Media</span>
                        <span className="text-xl font-bold tracking-tight text-[#D4AF37]">
                            CHIGOZIEMEDIA<span className="text-[#F5F5F5]">HOUSE</span>
                        </span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#BDBDBD]"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "text-sm font-semibold leading-6 transition-colors hover:text-[#D4AF37]",
                                pathname === item.href ? "text-[#D4AF37]" : "text-[#F5F5F5]"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                    {!session ? (
                        <>
                            <Link
                                href="/auth/login"
                                className="text-sm font-semibold leading-6 text-[#F5F5F5] hover:text-[#D4AF37]"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/predictions"
                                className="rounded-md bg-[#D4AF37] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#B5952F]"
                            >
                                Subscribe
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-sm font-semibold leading-6 text-[#F5F5F5] hover:text-[#D4AF37]"
                            >
                                <User className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 text-sm font-semibold leading-6 text-[#BDBDBD] hover:text-red-500"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </nav>
            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 lg:hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#121212] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-[#333]">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                                    <span className="sr-only">Chibazen Media</span>
                                    <span className="text-xl font-bold tracking-tight text-[#D4AF37]">
                                        CHIGOZIEMEDIA<span className="text-[#F5F5F5]">HOUSE</span>
                                    </span>
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-[#BDBDBD]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-[#333]">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#F5F5F5] hover:bg-[#1a1a1a] hover:text-[#D4AF37]"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        {!session ? (
                                            <div className="flex flex-col gap-4">
                                                <Link
                                                    href="/auth/login"
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#F5F5F5] hover:bg-[#1a1a1a]"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Log in
                                                </Link>
                                                <Link
                                                    href="/predictions"
                                                    className="block w-full text-center rounded-md bg-[#D4AF37] px-3 py-2 text-base font-semibold text-black shadow-sm hover:bg-[#B5952F]"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Subscribe
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4">
                                                <Link
                                                    href="/dashboard"
                                                    className="-mx-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#F5F5F5] hover:bg-[#1a1a1a]"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <User className="h-5 w-5" />
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        signOut();
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className="-mx-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#BDBDBD] hover:bg-[#1a1a1a] hover:text-red-500"
                                                >
                                                    <LogOut className="h-5 w-5" />
                                                    Sign out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
