"use client";

import { useState, useRef } from "react";

interface MediaUploaderProps {
    onUploadComplete: (url: string, type: "image" | "video") => void;
}

export default function MediaUploader({ onUploadComplete }: MediaUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = async (file: File) => {
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
            setError(err.message || "Failed to upload file");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    return (
        <div className="w-full">
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`group border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                        ? "border-primary bg-primary/10 scale-[1.01]"
                        : "hover:border-primary/60 hover:bg-black/5 dark:hover:bg-white/5"
                } ${isUploading ? "opacity-60 pointer-events-none" : ""}`}
                style={{
                    borderColor: isDragging ? "var(--primary)" : "var(--border)",
                    backgroundColor: "var(--bg)",
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,video/*"
                />

                {isUploading ? (
                    <div className="flex flex-col items-center py-4">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-xs font-bold" style={{ color: "var(--text)" }}>Uploading Media Asset...</p>
                        <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Optimizing to Cloud Storage</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-2">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border)",
                                color: "var(--primary)"
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold tracking-tight" style={{ color: "var(--text)" }}>
                                Click to Upload or Drag & Drop
                            </p>
                            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                                PNG, JPG, WebP (Max 2MB) or MP4 (Max 10MB)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-2.5 p-2 rounded-xl text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 text-center">
                    {error}
                </div>
            )}
        </div>
    );
}

