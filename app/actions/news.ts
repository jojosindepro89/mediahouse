"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(5),
    slug: z.string().min(5),
    content: z.string().min(10),
    excerpt: z.string().optional(),
    featuredImage: z.string().url().optional().or(z.literal("")),
    category: z.string().min(2),
    status: z.enum(["published", "draft"]),
});

export async function createPost(formData: FormData) {
    const rawData = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        content: formData.get("content"),
        excerpt: formData.get("excerpt"),
        featuredImage: formData.get("featuredImage"),
        category: formData.get("category"),
        status: formData.get("status"),
    };

    const validatedData = postSchema.parse(rawData);

    // Auto-generate slug if not provided or empty (though form should handle it)
    let slug = validatedData.slug;
    if (!slug) {
        slug = validatedData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    }

    await prisma.post.create({
        data: {
            ...validatedData,
            slug,
            publishedAt: validatedData.status === "published" ? new Date() : null,
        },
    });

    revalidatePath("/news");
    revalidatePath("/admin/news");
    redirect("/admin/news");
}

export async function deletePost(id: string) {
    await prisma.post.delete({
        where: { id },
    });

    revalidatePath("/news");
    revalidatePath("/admin/news");
}
