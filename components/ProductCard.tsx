"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        images: string; // JSON string
        category: string | null;
    };
}

export default function ProductCard({ product }: ProductProps) {
    const images = JSON.parse(product.images) as string[];
    const mainImage = images[0] || "https://placehold.co/600x400/121212/D4AF37/png?text=No+Image";

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-[#121212] border border-[#333] shadow-md transition-all hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl">
            <Link href={`/shop/${product.id}`} className="block overflow-hidden">
                <div className="aspect-square w-full bg-[#0B0B0B]">
                    <img
                        src={mainImage}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2">
                    <span className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider">
                        {product.category || "General"}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-[#F5F5F5]">
                    <Link href={`/shop/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-[#BDBDBD] line-clamp-2">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-[#F5F5F5]">${product.price.toFixed(2)}</p>
                    <button
                        type="button"
                        className="relative z-10 flex items-center gap-2 rounded-md bg-[#D4AF37] px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#B5952F]"
                        onClick={(e) => {
                            e.preventDefault();
                            alert(`Added ${product.name} to cart!`);
                        }}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
