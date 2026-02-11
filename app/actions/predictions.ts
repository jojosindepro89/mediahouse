"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const predictionSchema = z.object({
    title: z.string().min(3),
    date: z.string(), // ISO string from form
    content: z.string().min(5),
    odds: z.string().optional(),
    confidence: z.coerce.number().min(0).max(100).optional(),
    isPremium: z.coerce.boolean(),
    status: z.enum(["pending", "won", "lost", "void"]),
});

export async function createPrediction(formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        date: formData.get("date"),
        content: formData.get("content"),
        odds: formData.get("odds"),
        confidence: formData.get("confidence"),
        isPremium: formData.get("isPremium") === "on",
        status: formData.get("status"),
    };

    const validatedData = predictionSchema.parse(rawData);

    await prisma.prediction.create({
        data: {
            ...validatedData,
            date: new Date(validatedData.date),
        },
    });

    revalidatePath("/predictions");
    revalidatePath("/admin/predictions");
    redirect("/admin/predictions");
}

export async function deletePrediction(id: string) {
    await prisma.prediction.delete({
        where: { id },
    });

    revalidatePath("/predictions");
    revalidatePath("/admin/predictions");
}
