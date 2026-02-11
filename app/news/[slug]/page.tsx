import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage(props: PostPageProps) {
    const params = await props.params;
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post || post.status !== "published") {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-3xl px-4 py-12">
            <Link
                href="/news"
                className="mb-8 inline-flex items-center text-sm font-medium text-[#BDBDBD] hover:text-[#D4AF37]"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
            </Link>

            <article>
                <header className="mb-8">
                    <div className="flex items-center gap-x-4 text-sm text-[#666]">
                        <time dateTime={post.publishedAt?.toISOString()}>
                            {post.publishedAt?.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                        <span className="rounded-full bg-[#1a1a1a] px-3 py-1 font-medium text-[#D4AF37] ring-1 ring-inset ring-[#333]">
                            {post.category}
                        </span>
                    </div>
                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#F5F5F5] sm:text-5xl">
                        {post.title}
                    </h1>
                </header>

                {post.featuredImage && (
                    <div className="mb-10 aspect-video w-full overflow-hidden rounded-xl border border-[#333]">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-[#F5F5F5] prose-a:text-[#D4AF37] prose-strong:text-[#F5F5F5] text-[#BDBDBD]">
                    {/* In a real app, use a markdown renderer here */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </article>
        </div>
    );
}
