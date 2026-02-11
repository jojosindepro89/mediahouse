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
        const { reference, productId, quantity } = body;

        if (!reference || !productId || !quantity) {
            return NextResponse.json(
                { message: "Missing required fields" },
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

        // Fetch product to get price and check stock
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        if (product.stock < quantity) {
            return NextResponse.json({ message: "Insufficient stock" }, { status: 400 });
        }

        // Create Order
        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                total: product.price * quantity,
                status: "paid",
                items: {
                    create: {
                        productId: product.id,
                        quantity: quantity,
                        price: product.price
                    }
                }
            },
        });

        // Decrement stock
        await prisma.product.update({
            where: { id: productId },
            data: { stock: { decrement: quantity } }
        });

        return NextResponse.json(
            { message: "Order placed successfully", order },
            { status: 201 }
        );
    } catch (error) {
        console.error("Order payment error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
