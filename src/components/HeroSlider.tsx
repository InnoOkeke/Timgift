"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SLIDES = [
    {
        id: 1,
        tag: "New Arrivals",
        title: "Latest iPhones at Wholesale Prices",
        subtitle: "Get the newest iPhone models delivered to your doorstep. Genuine, verified, unbeatable price.",
        cta: { label: "Shop iPhones", href: "/products?category=IPHONE" },
        ctaSecondary: { label: "View All", href: "/products" },
        bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=700&h=500&fit=crop&auto=format",
        accent: "#3B82F6",
    },
    {
        id: 2,
        tag: "Pre-Order Now",
        title: "Reserve the Hottest Gadgets Before They Sell Out",
        subtitle: "MacBooks, iPads and more — lock in your order today and be first in line.",
        cta: { label: "Pre-Order Now", href: "/products?status=PRE_ORDER" },
        ctaSecondary: { label: "Learn More", href: "/about" },
        bg: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=700&h=500&fit=crop&auto=format",
        accent: "#34D399",
    },
    {
        id: 3,
        tag: "Gaming",
        title: "Consoles, Controllers & More",
        subtitle: "PS5, Xbox, and accessories in stock. Ready to ship nationwide — order via WhatsApp.",
        cta: { label: "Shop Consoles", href: "/products?category=VIDEO%20GAMES%20CONSOLES" },
        ctaSecondary: { label: "All Products", href: "/products" },
        bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=700&h=500&fit=crop&auto=format",
        accent: "#818CF8",
    },
    {
        id: 4,
        tag: "Smartwatches & AirPods",
        title: "Premium Wearables at the Best Prices",
        subtitle: "Apple Watch, Samsung Galaxy Watch, AirPods Pro — all verified authentic.",
        cta: { label: "Shop Wearables", href: "/products?category=SMARTWATCHES" },
        ctaSecondary: { label: "Shop AirPods", href: "/products?category=AIRPODS" },
        bg: "linear-gradient(135deg, #4a1942 0%, #6b21a8 50%, #7c3aed 100%)",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&h=500&fit=crop&auto=format",
        accent: "#C084FC",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = useCallback((index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    const next = useCallback(() => {
        goTo((current + 1) % SLIDES.length);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + SLIDES.length) % SLIDES.length);
    }, [current, goTo]);

    // Auto-advance every 5 seconds
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = SLIDES[current];

    return (
        <div className="container" style={{ position: "relative", overflow: "hidden", userSelect: "none", paddingTop: "24px", paddingBottom: "24px" }}>
            {/* Slide */}
            <div
                key={slide.id}
                style={{
                    background: slide.bg,
                    minHeight: "320px",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    animation: "slideIn 0.5s ease forwards",
                    borderRadius: "16px",
                }}
            >
                {/* Decorative circles */}
                <div style={{
                    position: "absolute",
                    top: "-80px",
                    right: "-80px",
                    width: "360px",
                    height: "360px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute",
                    bottom: "-120px",
                    left: "30%",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    pointerEvents: "none",
                }} />

                    <div style={{ position: "relative", zIndex: 1, padding: "48px 0" }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: "32px",
                            alignItems: "center",
                            maxWidth: "1280px",
                            margin: "0 auto",
                            padding: "0 1.5rem",
                        }}
                            className="hero-grid"
                        >
                        {/* Text side */}
                        <div>
                            {/* Tag pill */}
                            <span style={{
                                display: "inline-block",
                                padding: "4px 12px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.07em",
                                backgroundColor: "rgba(255,255,255,0.15)",
                                color: "white",
                                marginBottom: "16px",
                                border: `1px solid ${slide.accent}40`,
                            }}>
                                {slide.tag}
                            </span>

                            <h1 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(24px, 3.5vw, 42px)",
                                fontWeight: 800,
                                color: "#FFFFFF",
                                lineHeight: 1.15,
                                letterSpacing: "-0.025em",
                                marginBottom: "16px",
                            }}>
                                {slide.title}
                            </h1>

                            <p style={{
                                fontSize: "15px",
                                color: "rgba(255,255,255,0.75)",
                                lineHeight: 1.6,
                                marginBottom: "32px",
                                maxWidth: "460px",
                            }}>
                                {slide.subtitle}
                            </p>

                            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                <Link
                                    href={slide.cta.href}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "12px 24px",
                                        borderRadius: "8px",
                                        backgroundColor: "#FFFFFF",
                                        color: "#111827",
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        textDecoration: "none",
                                        transition: "opacity 0.15s",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                                >
                                    {slide.cta.label}
                                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    href={slide.ctaSecondary.href}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        padding: "12px 24px",
                                        borderRadius: "8px",
                                        backgroundColor: "rgba(255,255,255,0.12)",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        textDecoration: "none",
                                        border: "1px solid rgba(255,255,255,0.25)",
                                        transition: "background 0.15s",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                                >
                                    {slide.ctaSecondary.label}
                                </Link>
                            </div>
                        </div>

                        {/* Image side */}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                            className="hero-image-col"
                        >
                            <div style={{
                                width: "100%",
                                maxWidth: "380px",
                                aspectRatio: "4/3",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }}>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prev / Next arrows */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    transition: "background 0.15s",
                    backdropFilter: "blur(4px)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
            >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={next}
                aria-label="Next slide"
                style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    transition: "background 0.15s",
                    backdropFilter: "blur(4px)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
            >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot indicators */}
            <div style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
                zIndex: 10,
            }}>
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        style={{
                            width: i === current ? "24px" : "8px",
                            height: "8px",
                            borderRadius: "4px",
                            backgroundColor: i === current ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            transition: "width 0.3s ease, background 0.3s ease",
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @media (max-width: 768px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                    .hero-image-col {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
