"use client";

import { useState, ChangeEvent } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onRemove: (url: string) => void;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                onChange(data.url);
            } else {
                console.error("Upload failed:", data.message);
                alert("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && (
                    <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
                        <div className="absolute top-2 right-2 z-10">
                            <button
                                type="button"
                                onClick={() => onRemove(value)}
                                className="rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={value}
                        />
                    </div>
                )}
            </div>
            <div>
                <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#333] bg-[#0B0B0B] hover:bg-[#121212]">
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        {isUploading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                        ) : (
                            <Upload className="mb-4 h-8 w-8 text-[#BDBDBD]" />
                        )}
                        <p className="mb-2 text-sm text-[#BDBDBD]">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-[#666]">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={onUpload}
                    />
                </label>
            </div>
        </div>
    );
}
