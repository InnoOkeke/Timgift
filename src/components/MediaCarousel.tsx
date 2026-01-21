"use client";

import { useState } from "react";

interface MediaItem {
    type: "image" | "video";
    url: string;
}

interface MediaCarouselProps {
    media: MediaItem[];
    productName: string;
}

export default function MediaCarousel({ media, productName }: MediaCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fallback if no media
    const fallbackImage = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop";

    if (!media || media.length === 0) {
        return (
            <div
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: "var(--bg-secondary)", maxWidth: "500px", aspectRatio: "1/1" }}
            >
                <img
                    src={fallbackImage}
                    alt={productName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
        );
    }

    const currentMedia = media[currentIndex];

    return (
        <div style={{ maxWidth: "500px" }}>
            {/* Main Image */}
            <div
                className="relative rounded-2xl overflow-hidden"
                style={{ backgroundColor: "var(--bg-secondary)", aspectRatio: "1/1" }}
            >
                {currentMedia.type === "image" ? (
                    <img
                        src={currentMedia.url}
                        alt={productName}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = fallbackImage;
                        }}
                    />
                ) : (
                    <video
                        src={currentMedia.url}
                        controls
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                )}

                {/* Navigation Arrows */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentIndex(prev => prev === 0 ? media.length - 1 : prev - 1)}
                            style={{
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "var(--bg)",
                                color: "var(--text)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setCurrentIndex(prev => prev === media.length - 1 ? 0 : prev + 1)}
                            style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "var(--bg)",
                                color: "var(--text)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Counter */}
                {media.length > 1 && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 500,
                            backgroundColor: "var(--bg)",
                            color: "var(--text)"
                        }}
                    >
                        {currentIndex + 1} / {media.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {media.length > 1 && (
                <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginTop: "12px", paddingBottom: "4px" }}>
                    {media.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            style={{
                                flexShrink: 0,
                                width: "60px",
                                height: "60px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: index === currentIndex ? "2px solid var(--primary)" : "2px solid var(--border)",
                                opacity: index === currentIndex ? 1 : 0.7,
                                cursor: "pointer",
                                padding: 0,
                                background: "none"
                            }}
                        >
                            {item.type === "image" ? (
                                <img
                                    src={item.url}
                                    alt={`${productName} ${index + 1}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = fallbackImage;
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "var(--bg-secondary)",
                                        color: "var(--text-muted)"
                                    }}
                                >
                                    <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
