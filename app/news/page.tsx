import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate every minute

export default async function NewsPage() {
    const posts = await prisma.post.findMany({
        where: { status: "published" },
        orderBy: { publishedAt: "desc" },
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-[#D4AF37] sm:text-5xl">
                    Football News
                </h1>
                <p className="mt-4 text-lg text-[#BDBDBD]">
                    Latest updates, transfer rumors, and match analysis.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="text-center text-[#BDBDBD] py-20">
                    <p>No news posts available at the moment. Check back later!</p>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="flex flex-col overflow-hidden rounded-lg bg-[#121212] border border-[#333] shadow-md transition-transform hover:scale-[1.02]"
                        >
                            <div className="aspect-[16/9] w-full bg-[#0B0B0B]">
                                {post.featuredImage ? (
                                    <img
                                        src={post.featuredImage}
                                        alt={post.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a] text-[#333]">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex items-center justify-between text-xs text-[#666]">
                                    <time dateTime={post.publishedAt?.toISOString()}>
                                        {post.publishedAt?.toLocaleDateString()}
                                    </time>
                                    <span className="rounded-full bg-[#1a1a1a] px-2 py-1 text-[#D4AF37]">
                                        {post.category}
                                    </span>
                                </div>
                                <h3 className="mt-4 text-xl font-semibold leading-snug text-[#F5F5F5] hover:text-[#D4AF37]">
                                    <Link href={`/news/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#BDBDBD] line-clamp-3">
                                    {post.excerpt || "No excerpt available."}
                                </p>
                                <div className="mt-6 flex items-center">
                                    <Link
                                        href={`/news/${post.slug}`}
                                        className="text-sm font-semibold text-[#D4AF37] hover:text-[#B5952F]"
                                    >
                                        Read full article &rarr;
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
