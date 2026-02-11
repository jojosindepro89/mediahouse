"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import axios from "axios";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterValues) => {
        setIsLoading(true);
        setError(null);

        try {
            await axios.post("/api/auth/register", {
                name: data.name,
                email: data.email,
                password: data.password,
            });

            router.push("/auth/login?registered=true");
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || "Registration failed");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
            <div className="w-full max-w-md space-y-8 rounded-lg border border-[#333] bg-[#121212] p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#D4AF37]">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-[#BDBDBD]">
                        Join Chibazen Media and get winning tips
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-[#F5F5F5]"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                placeholder="John Doe"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#F5F5F5]"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                placeholder="you@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#F5F5F5]"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-[#F5F5F5]"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                className="mt-1 block w-full rounded-md border border-[#333] bg-[#0B0B0B] px-3 py-2 text-[#F5F5F5] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full justify-center rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#B5952F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-[#BDBDBD]">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="font-semibold text-[#D4AF37] hover:text-[#B5952F]"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
