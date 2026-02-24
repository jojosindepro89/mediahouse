import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Truck, ShieldCheck, Star } from "lucide-react";
import BuyButton from "@/components/BuyButton";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage(props: PageProps) {
    const params = await props.params;
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        notFound();
    }

    const images = JSON.parse(product.images) as string[];
    const mainImage = images[0] || "https://placehold.co/600x400/121212/D4AF37/png?text=No+Image";

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border border-[#333] bg-[#121212] aspect-square">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="overflow-hidden rounded-md border border-[#333] bg-[#121212] aspect-square cursor-pointer hover:border-[#D4AF37]"
                            >
                                <img src={img} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div>

                    <h1 className="text-3xl font-bold text-[#F5F5F5] sm:text-4xl">{product.name}</h1>
                    <div className="mt-4 flex items-center">
                        <div className="flex items-center text-[#D4AF37]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-[#BDBDBD]">(No reviews yet)</span>
                    </div>

                    <p className="mt-6 text-2xl font-bold text-[#F5F5F5]">${product.price.toFixed(2)}</p>

                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-[#F5F5F5]">Description</h3>
                        <div className="mt-2 space-y-4 text-base text-[#BDBDBD] leading-relaxed">
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <BuyButton product={product} quantity={1} />
                    </div>

                    {/* Features */}
                    <div className="mt-12 space-y-6 border-t border-[#333] pt-6">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-[#1a1a1a] p-2 text-[#D4AF37]">
                                <Truck className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#F5F5F5]">Fast Shipping</h4>
                                <p className="text-sm text-[#BDBDBD]">Delivery within 3-5 business days.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-[#1a1a1a] p-2 text-[#D4AF37]">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#F5F5F5]">Secure Payment</h4>
                                <p className="text-sm text-[#BDBDBD]">100% secure checkout via Paystack.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
