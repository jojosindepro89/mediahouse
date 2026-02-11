import Link from "next/link";

const navigation = {
    main: [
        { name: "Home", href: "/" },
        { name: "News", href: "/news" },
        { name: "Predictions", href: "/predictions" },
        { name: "Shop", href: "/shop" },
    ],
    support: [
        { name: "Contact", href: "#" }, // Placeholder
        { name: "Privacy", href: "#" }, // Placeholder
        { name: "Terms", href: "#" }, // Placeholder
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[#050505]" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-[#D4AF37]">
                            CHIGOZIEMEDIA<span className="text-[#F5F5F5]">HOUSE</span>
                        </Link>
                        <p className="text-sm leading-6 text-[#BDBDBD]">
                            Premium football analysis, betting tips, and sports news.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-[#F5F5F5]">
                                    Navigation
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.main.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-[#BDBDBD] hover:text-[#D4AF37]"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-[#F5F5F5]">
                                    Support
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-[#BDBDBD] hover:text-[#D4AF37]"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-[#333] pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-[#666]">
                        &copy; {new Date().getFullYear()} Chibazen Media. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
