import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash, Package } from "lucide-react";
import { deleteProduct } from "@/app/actions/products";

export const revalidate = 0;

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#F5F5F5]">Manage Products</h1>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#B5952F]"
                >
                    <Plus className="h-4 w-4" />
                    Add Product
                </Link>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-[#333] bg-[#121212]">
                <table className="min-w-full divide-y divide-[#333]">
                    <thead className="bg-[#0B0B0B]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Stock
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333] bg-[#121212]">
                        {products.map((product) => {
                            const images = JSON.parse(product.images) as string[];
                            const mainImage = images[0] || "https://placehold.co/100x100/333/666?text=No+Img";

                            return (
                                <tr key={product.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="mr-4 h-10 w-10 overflow-hidden rounded bg-[#0B0B0B]">
                                                <img src={mainImage} alt="" className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-[#F5F5F5]">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#BDBDBD]">
                                        {product.category}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-[#D4AF37]">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-[#BDBDBD]">
                                        {product.stock}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <form action={deleteProduct.bind(null, product.id)}>
                                            <button className="text-red-500 hover:text-red-400">
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
