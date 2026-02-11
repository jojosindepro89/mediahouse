import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-[#D4AF37] sm:text-5xl">
                    Official Store
                </h1>
                <p className="mt-4 text-lg text-[#BDBDBD]">
                    Exlusive merchandise and premium gear.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <ShoppingBag className="mb-4 h-16 w-16 text-[#333]" />
                    <h3 className="text-lg font-medium text-[#F5F5F5]">No products found</h3>
                    <p className="mt-2 text-[#BDBDBD]">Check back later for new arrivals.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
