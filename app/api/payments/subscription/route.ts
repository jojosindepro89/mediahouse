import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { reference, plan } = body; // plan: "weekly" | "monthly"

        if (!reference || !plan) {
            return NextResponse.json(
                { message: "Missing reference or plan" },
                { status: 400 }
            );
        }

        // Verify transaction with Paystack
        const verifyResponse = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const data = verifyResponse.data.data;

        if (data.status !== "success") {
            return NextResponse.json(
                { message: "Transaction verification failed" },
                { status: 400 }
            );
        }

        // Calculate duration based on plan
        const startDate = new Date();
        const endDate = new Date(startDate);
        if (plan === "weekly") {
            endDate.setDate(endDate.getDate() + 7);
        } else if (plan === "monthly") {
            endDate.setMonth(endDate.getMonth() + 1);
        }

        // Create Subscription
        const subscription = await prisma.subscription.create({
            data: {
                userId: session.user.id,
                plan,
                startDate,
                endDate,
                paymentRef: reference,
                status: "active",
            },
        });

        return NextResponse.json(
            { message: "Subscription activated", subscription },
            { status: 201 }
        );
    } catch (error) {
        console.error("Subscription payment error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
