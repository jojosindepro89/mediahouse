"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface SubscribeButtonProps {
    amount: number; // Amount in kobo (e.g., 500000 for 5000 NGN)
    plan: string; // "weekly" | "monthly"
    email: string;
}

export default function SubscribeButton({ amount, plan, email }: SubscribeButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
        return <p className="text-red-500">Paystack public key missing</p>;
    }

    const componentProps = {
        email,
        amount,
        metadata: {
            custom_fields: []
        },
        publicKey,
        text: "Subscribe Now",
        onSuccess: async (reference: any) => {
            setLoading(true);
            try {
                await axios.post("/api/payments/subscription", {
                    reference: reference.reference,
                    plan,
                });
                alert("Subscription successful! Enjoy premium tips.");
                router.refresh();
            } catch (error) {
                console.error("Verification failed", error);
                alert("Payment successful but verification failed. Please contact support.");
            } finally {
                setLoading(false);
            }
        },
        onClose: () => alert("Transaction cancelled"),
    };

    if (loading) {
        return (
            <button disabled className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-8 py-3 text-base font-bold text-black shadow-lg opacity-50 cursor-not-allowed">
                <Loader2 className="animate-spin h-5 w-5" />
                Processing...
            </button>
        )
    }

    return (
        <div className="mt-6">
            {/* @ts-ignore - paystack types can be finicky */}
            <PaystackButton
                {...componentProps}
                className="inline-block rounded-md bg-[#D4AF37] px-8 py-3 text-base font-bold text-black shadow-lg hover:bg-[#B5952F] transition-all hover:scale-105"
            />
        </div>
    );
}
