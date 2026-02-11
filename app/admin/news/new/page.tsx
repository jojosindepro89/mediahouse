"use client";

import { createPost } from "@/app/actions/news";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function NewPostPage() {
    const [featuredImage, setFeaturedImage] = useState("");

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center gap-4">
                <Link
                    href="/admin/news"
                    className="rounded-full bg-[#121212] p-2 text-[#BDBDBD] hover:bg-[#1a1a1a] hover:text-[#D4AF37]"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-[#F5F5F5]">Add New Article</h1>
            </div>

            <form action={createPost} className="space-y-6 rounded-lg border border-[#333] bg-[#121212] p-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-[#BDBDBD]">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="e.g. Manchester United sign new striker"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="slug" className="block text-sm font-medium text-[#BDBDBD]">
                            Slug (Optional - auto-generated from title)
                        </label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="e.g. man-utd-sign-striker"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="excerpt" className="block text-sm font-medium text-[#BDBDBD]">
                            Excerpt
                        </label>
                        <textarea
                            name="excerpt"
                            id="excerpt"
                            rows={2}
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="Short summary for preview cards..."
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="content" className="block text-sm font-medium text-[#BDBDBD]">
                            Content (HTML supported)
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            rows={10}
                            required
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] font-mono text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="<p>Full article content here...</p>"
                        />
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
                            placeholder="e.g. Transfer News"
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-[#BDBDBD]">
                            Status
                        </label>
                        <select
                            name="status"
                            id="status"
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#BDBDBD]">
                            Featured Image
                        </label>
                        <div className="mt-2">
                            <ImageUpload
                                value={featuredImage}
                                onChange={(url) => setFeaturedImage(url)}
                                onRemove={() => setFeaturedImage("")}
                            />
                            {/* Hidden input to pass the URL to the server action */}
                            <input type="hidden" name="featuredImage" value={featuredImage} />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black hover:bg-[#B5952F]"
                    >
                        <Save className="h-4 w-4" />
                        Save Article
                    </button>
                </div>
            </form>
        </div>
    );
}

