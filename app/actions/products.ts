"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    price: z.coerce.number().min(0.01),
    stock: z.coerce.number().int().min(0),
    category: z.string().min(2),
    images: z.string().min(2), // We'll expect a comma-separated string from the form for simplicity
});

export async function createProduct(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
        images: formData.get("images"),
    };

    const validatedData = productSchema.parse(rawData);

    // Convert comma-separated images string to JSON array string
    const imagesArray = validatedData.images
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

    await prisma.product.create({
        data: {
            name: validatedData.name,
            description: validatedData.description,
            price: validatedData.price,
            stock: validatedData.stock,
            category: validatedData.category,
            images: JSON.stringify(imagesArray),
        },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
}
