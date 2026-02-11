"use client";

import { createProduct } from "@/app/actions/products";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function NewProductPage() {
    const [image, setImage] = useState("");

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="rounded-full bg-[#121212] p-2 text-[#BDBDBD] hover:bg-[#1a1a1a] hover:text-[#D4AF37]"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-[#F5F5F5]">Add New Product</h1>
            </div>

            <form action={createProduct} className="space-y-6 rounded-lg border border-[#333] bg-[#121212] p-8">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#BDBDBD]">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="e.g. Chibazen Jersey"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[#BDBDBD]">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        rows={4}
                        required
                        className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="Product details..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-[#BDBDBD]">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.01"
                            min="0"
                            required
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-[#BDBDBD]">
                            Stock
                        </label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            min="0"
                            required
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="100"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-[#BDBDBD]">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        required
                        className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="e.g. Apparel"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#BDBDBD]">
                        Product Image
                    </label>
                    <div className="mt-2">
                        <ImageUpload
                            value={image}
                            onChange={(url) => setImage(url)}
                            onRemove={() => setImage("")}
                        />
                        {/* Hidden input for images - supporting just one for now to match UI simplification */}
                        <input type="hidden" name="images" value={image} />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black hover:bg-[#B5952F]"
                    >
                        <Save className="h-4 w-4" />
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}

