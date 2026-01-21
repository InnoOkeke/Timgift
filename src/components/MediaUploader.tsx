"use client";

import { useState, useRef } from "react";

interface MediaUploaderProps {
    onUploadComplete: (url: string, type: "image" | "video") => void;
}

export default function MediaUploader({ onUploadComplete }: MediaUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError("");

        // Validation
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isVideo && !isImage) {
            setError("Only images and videos are allowed.");
            return;
        }

        if (isImage && file.size > 2 * 1024 * 1024) {
            setError("Images must be under 2MB.");
            return;
        }

        if (isVideo && file.size > 10 * 1024 * 1024) {
            setError("Videos must be under 10MB.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Upload failed");

            onUploadComplete(data.url, isVideo ? "video" : "image");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full">
            <div
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed border-gray-300 dark:border-gray-700 rounded-xl px-4 py-8 text-center cursor-pointer transition-all hover:border-primary hover:bg-primary/5 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,video/*"
                />

                {isUploading ? (
                    <div className="flex flex-col items-center py-1">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-xs font-medium">Uploading...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-200 group-hover:text-primary transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-text">Add Media</p>
                            <p className="text-[10px] text-text-muted mt-1">Images or Video</p>
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        </div>
    );
}
