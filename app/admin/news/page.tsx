import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash, Globe, FileText, Eye } from "lucide-react";
import { deletePost } from "@/app/actions/news";

export const revalidate = 0;

export default async function AdminNewsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#F5F5F5]">Manage News</h1>
                <Link
                    href="/admin/news/new"
                    className="flex items-center gap-2 rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#B5952F]"
                >
                    <Plus className="h-4 w-4" />
                    Add Article
                </Link>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-[#333] bg-[#121212]">
                <table className="min-w-full divide-y divide-[#333]">
                    <thead className="bg-[#0B0B0B]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Published
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333] bg-[#121212]">
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center">
                                        {post.featuredImage && (
                                            <div className="mr-4 h-10 w-10 overflow-hidden rounded bg-[#0B0B0B]">
                                                <img src={post.featuredImage} alt="" className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-[#F5F5F5]">{post.title}</div>
                                            <div className="text-xs text-[#666]">{post.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className="inline-flex rounded-full bg-[#1a1a1a] px-2 text-xs font-semibold leading-5 text-[#BDBDBD]">
                                        {post.category}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {post.status === "published" ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-900/20 px-2 py-0.5 text-xs font-medium text-green-400">
                                            <Globe className="h-3 w-3" /> Published
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-900/20 px-2 py-0.5 text-xs font-medium text-yellow-400">
                                            <FileText className="h-3 w-3" /> Draft
                                        </span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#BDBDBD]">
                                    {post.publishedAt ? post.publishedAt.toLocaleDateString() : "-"}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link href={`/news/${post.slug}`} target="_blank" className="text-[#D4AF37] hover:text-[#B5952F]">
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                        <form action={deletePost.bind(null, post.id)}>
                                            <button className="text-red-500 hover:text-red-400">
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
