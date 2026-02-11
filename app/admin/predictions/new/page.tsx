import { createPrediction } from "@/app/actions/predictions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewPredictionPage() {
    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex items-center gap-4">
                <Link
                    href="/admin/predictions"
                    className="rounded-full bg-[#121212] p-2 text-[#BDBDBD] hover:bg-[#1a1a1a] hover:text-[#D4AF37]"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-[#F5F5F5]">Add New Prediction</h1>
            </div>

            <form action={createPrediction} className="space-y-6 rounded-lg border border-[#333] bg-[#121212] p-8">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-[#BDBDBD]">
                        Match / Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="e.g. Man City vs Liverpool"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-[#BDBDBD]">
                        Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        name="date"
                        id="date"
                        required
                        className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-[#BDBDBD]">
                        Prediction / Tip
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        rows={3}
                        required
                        className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="e.g. Home Win & Over 2.5 Goals"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="odds" className="block text-sm font-medium text-[#BDBDBD]">
                            Odds
                        </label>
                        <input
                            type="text"
                            name="odds"
                            id="odds"
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="e.g. 1.85"
                        />
                    </div>

                    <div>
                        <label htmlFor="confidence" className="block text-sm font-medium text-[#BDBDBD]">
                            Confidence (%)
                        </label>
                        <input
                            type="number"
                            name="confidence"
                            id="confidence"
                            min="0"
                            max="100"
                            className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                            placeholder="e.g. 85"
                        />
                    </div>
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
                        <option value="pending">Pending</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                        <option value="void">Void</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <input
                        id="isPremium"
                        name="isPremium"
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#333] bg-[#0B0B0B] text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="isPremium" className="ml-2 block text-sm text-[#BDBDBD]">
                        Premium Content (Locked for free users)
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black hover:bg-[#B5952F]"
                    >
                        <Save className="h-4 w-4" />
                        Save Prediction
                    </button>
                </div>
            </form>
        </div>
    );
}
