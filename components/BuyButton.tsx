"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PaystackButton } from "react-paystack";
import { useState } from "react";
import axios from "axios";
import { Loader2, ShoppingCart } from "lucide-react";

interface BuyButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
    };
    quantity: number;
}

export default function BuyButton({ product, quantity }: BuyButtonProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    const amount = (product.price * quantity) * 100; // Convert to kobo

    const handleLoginRedirect = () => {
        router.push(`/auth/login?callbackUrl=/shop/${product.id}`);
    };

    if (!session?.user?.email) {
        return (
            <button
                onClick={handleLoginRedirect}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-8 py-4 text-base font-bold text-black shadow-lg transition-all hover:bg-[#B5952F] hover:scale-[1.02]"
            >
                <ShoppingCart className="h-5 w-5" />
                Login to Buy
            </button>
        );
    }

    if (!publicKey) {
        return <p className="text-red-500 text-sm mt-2">Paystack key missing</p>;
    }

    const componentProps = {
        email: session.user.email,
        amount,
        metadata: {
            custom_fields: []
        },
        publicKey,
        text: "Buy Now",
        onSuccess: async (reference: any) => {
            setLoading(true);
            try {
                await axios.post("/api/payments/order", {
                    reference: reference.reference,
                    productId: product.id,
                    quantity,
                });
                alert("Order placed successfully!");
                router.push("/dashboard"); // Redirect to dashboard to see order
            } catch (error) {
                console.error("Verification failed", error);
                alert("Payment successful but order creation failed. Please contact support.");
            } finally {
                setLoading(false);
            }
        },
        onClose: () => alert("Transaction cancelled"),
    };

    if (loading) {
        return (
            <button disabled className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-8 py-4 text-base font-bold text-black shadow-lg opacity-50 cursor-not-allowed">
                <Loader2 className="animate-spin h-5 w-5" />
                Processing...
            </button>
        )
    }

    return (
        <div className="w-full">
            {/* @ts-ignore */}
            <PaystackButton
                {...componentProps}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D4AF37] px-8 py-4 text-base font-bold text-black shadow-lg transition-all hover:bg-[#B5952F] hover:scale-[1.02]"
            >
                <ShoppingCart className="h-5 w-5" />
                Buy Now
            </PaystackButton>
        </div>
    );
}
