import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash, CheckCircle, XCircle, Clock } from "lucide-react";
import { deletePrediction } from "@/app/actions/predictions";

export const revalidate = 0;

export default async function AdminPredictionsPage() {
    const predictions = await prisma.prediction.findMany({
        orderBy: { date: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#F5F5F5]">Manage Predictions</h1>
                <Link
                    href="/admin/predictions/new"
                    className="flex items-center gap-2 rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#B5952F]"
                >
                    <Plus className="h-4 w-4" />
                    Add New
                </Link>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-[#333] bg-[#121212]">
                <table className="min-w-full divide-y divide-[#333]">
                    <thead className="bg-[#0B0B0B]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Match / Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Content
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#BDBDBD]">
                                Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333] bg-[#121212]">
                        {predictions.map((prediction) => (
                            <tr key={prediction.id}>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-[#F5F5F5]">{prediction.title}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm text-[#BDBDBD]">
                                        {prediction.date.toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-[#BDBDBD] truncate max-w-xs">{prediction.content}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {prediction.isPremium ? (
                                        <span className="inline-flex rounded-full bg-[#D4AF37]/10 px-2 text-xs font-semibold leading-5 text-[#D4AF37]">
                                            Premium
                                        </span>
                                    ) : (
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                            Free
                                        </span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center">
                                        {prediction.status === "pending" && <span className="flex items-center gap-1 text-gray-400"><Clock className="h-4 w-4" /> Pending</span>}
                                        {prediction.status === "won" && <span className="flex items-center gap-1 text-green-500"><CheckCircle className="h-4 w-4" /> Won</span>}
                                        {prediction.status === "lost" && <span className="flex items-center gap-1 text-red-500"><XCircle className="h-4 w-4" /> Lost</span>}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <form action={deletePrediction.bind(null, prediction.id)}>
                                        <button className="text-red-500 hover:text-red-400">
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
