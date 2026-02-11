"use client";

import { Lock, CheckCircle, XCircle, Clock } from "lucide-react";
import clsx from "clsx";

interface PredictionProps {
    prediction: {
        id: string;
        title: string;
        date: Date;
        content: string;
        odds: string | null;
        confidence: number | null;
        isPremium: boolean;
        status: string;
        result: string | null;
    };
    isPremiumUser: boolean;
}

export default function PredictionCard({ prediction, isPremiumUser }: PredictionProps) {
    const canView = !prediction.isPremium || isPremiumUser;
    const isPending = prediction.status === "pending";
    const isWon = prediction.status === "won" || prediction.result === "won";
    const isLost = prediction.status === "lost" || prediction.result === "lost";

    return (
        <div className="relative overflow-hidden rounded-xl border border-[#333] bg-[#121212] p-6 shadow-lg transition-all hover:border-[#D4AF37]/50">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-[#F5F5F5]">{prediction.title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-xs text-[#BDBDBD]">
                        <Clock className="h-3 w-3" />
                        {new Date(prediction.date).toLocaleString([], {
                            weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {prediction.isPremium && (
                        <span className="rounded-full bg-[#D4AF37]/10 px-2 py-1 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/20">
                            PREMIUM
                        </span>
                    )}
                    {isPending && (
                        <span className="rounded-full bg-gray-800 px-2 py-1 text-xs font-semibold text-gray-400">
                            Pending
                        </span>
                    )}
                    {isWon && (
                        <span className="flex items-center gap-1 rounded-full bg-green-900/20 px-2 py-1 text-xs font-semibold text-green-400">
                            <CheckCircle className="h-3 w-3" /> Won
                        </span>
                    )}
                    {isLost && (
                        <span className="flex items-center gap-1 rounded-full bg-red-900/20 px-2 py-1 text-xs font-semibold text-red-400">
                            <XCircle className="h-3 w-3" /> Lost
                        </span>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="mt-6">
                {canView ? (
                    <div className="space-y-4">
                        <div className="rounded-lg bg-[#0B0B0B] p-4 ring-1 ring-[#333]">
                            <p className="font-medium text-[#D4AF37]">Tip:</p>
                            <p className="mt-1 text-lg font-bold text-[#F5F5F5]">{prediction.content}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-[#1a1a1a] p-3 text-center">
                                <p className="text-xs text-[#BDBDBD]">Odds</p>
                                <p className="text-lg font-bold text-[#F5F5F5]">{prediction.odds || "-"}</p>
                            </div>
                            <div className="rounded-lg bg-[#1a1a1a] p-3 text-center">
                                <p className="text-xs text-[#BDBDBD]">Confidence</p>
                                <p className="text-lg font-bold text-[#F5F5F5]">{prediction.confidence ? `${prediction.confidence}%` : "-"}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-lg bg-[#0B0B0B] text-center">
                        <div className="absolute inset-0 bg-[#0B0B0B] blur-sm filter flex items-center justify-center">
                            <p className="text-lg font-bold text-[#333]">BLURRED CONTENT</p>
                        </div>
                        <div className="z-10 flex flex-col items-center gap-2 p-4">
                            <Lock className="h-8 w-8 text-[#D4AF37]" />
                            <p className="text-sm font-semibold text-[#F5F5F5]">Premium Content</p>
                            <p className="text-xs text-[#BDBDBD]">Subscribe to unlock this tip</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
