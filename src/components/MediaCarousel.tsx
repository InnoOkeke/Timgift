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

    const fallbackImage = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop";

    if (!media || media.length === 0) {
        return (
            <div style={{ width: "100%" }}>
                <div style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "var(--bg-secondary)",
                    aspectRatio: "1/1",
                }}>
                    <img
                        src={fallbackImage}
                        alt={productName}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
            </div>
        );
    }

    const currentMedia = media[currentIndex];
    const prev = () => setCurrentIndex(i => (i === 0 ? media.length - 1 : i - 1));
    const next = () => setCurrentIndex(i => (i === media.length - 1 ? 0 : i + 1));

    return (
        <div style={{ width: "100%" }}>
            {/* Main viewer */}
            <div style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "var(--bg-secondary)",
                aspectRatio: "1/1",
                border: "1px solid var(--border)",
            }}>
                {currentMedia.type === "image" ? (
                    <img
                        src={currentMedia.url}
                        alt={`${productName} — view ${currentIndex + 1}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "opacity 0.2s ease",
                        }}
                        onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                    />
                ) : (
                    <video
                        src={currentMedia.url}
                        controls
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                )}

                {/* Prev / Next arrows */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Previous image"
                            style={{
                                position: "absolute",
                                left: "14px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(0,0,0,0.45)",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                cursor: "pointer",
                                backdropFilter: "blur(4px)",
                                transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.45)")}
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next image"
                            style={{
                                position: "absolute",
                                right: "14px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(0,0,0,0.45)",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                cursor: "pointer",
                                backdropFilter: "blur(4px)",
                                transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.45)")}
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Counter pill */}
                {media.length > 1 && (
                    <div style={{
                        position: "absolute",
                        bottom: "14px",
                        right: "14px",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        backdropFilter: "blur(4px)",
                    }}>
                        {currentIndex + 1} / {media.length}
                    </div>
                )}
            </div>

            {/* Thumbnail strip */}
            {media.length > 1 && (
                <div style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "14px",
                    overflowX: "auto",
                    paddingBottom: "6px",
                    scrollbarWidth: "none",
                }}>
                    {media.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`View image ${index + 1}`}
                            style={{
                                flexShrink: 0,
                                width: "80px",
                                height: "80px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: index === currentIndex
                                    ? "2.5px solid var(--primary)"
                                    : "2px solid var(--border)",
                                opacity: index === currentIndex ? 1 : 0.55,
                                cursor: "pointer",
                                padding: 0,
                                background: "var(--bg-secondary)",
                                transition: "opacity 0.15s, border-color 0.15s, transform 0.15s",
                                transform: index === currentIndex ? "scale(1.05)" : "scale(1)",
                            }}
                            onMouseEnter={(e) => {
                                if (index !== currentIndex) {
                                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                                    (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (index !== currentIndex) {
                                    (e.currentTarget as HTMLElement).style.opacity = "0.55";
                                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                }
                            }}
                        >
                            {item.type === "image" ? (
                                <img
                                    src={item.url}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                                />
                            ) : (
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "var(--bg-secondary)",
                                    color: "white",
                                    fontSize: "22px",
                                }}>
                                    ▶
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Dot indicators (mobile-friendly) */}
            {media.length > 1 && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "10px",
                }}>
                    {media.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            style={{
                                width: index === currentIndex ? "20px" : "7px",
                                height: "7px",
                                borderRadius: "4px",
                                backgroundColor: index === currentIndex ? "var(--primary)" : "var(--border)",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                transition: "width 0.2s ease, background-color 0.15s",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
