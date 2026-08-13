"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const SLIDES = [
    {
        id: 1,
        tag: "New Arrivals",
        title: "The Phones Everyone\nWants. Now in Lagos.",
        subtitle: "Latest iPhone models. Verified authentic. Prices that make sense. Delivered to your door anywhere in Nigeria.",
        cta: { label: "Shop iPhones", href: "/products?category=IPHONE" },
        ctaSecondary: { label: "Browse All", href: "/products" },
        bg: "linear-gradient(135deg, #0f0c29 0%, #1a1a4e 50%, #0f3460 100%)",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=700&h=500&fit=crop&auto=format",
        accent: "#3B82F6",
    },
    {
        id: 2,
        tag: "Pre-Order Now",
        title: "Be First. Reserve\nBefore It Sells Out.",
        subtitle: "MacBooks, iPads, and next-gen gadgets. Lock in your order today at today's price.",
        cta: { label: "Pre-Order Now", href: "/products?status=PRE_ORDER" },
        ctaSecondary: { label: "Learn More", href: "/about" },
        bg: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=700&h=500&fit=crop&auto=format",
        accent: "#34D399",
    },
    {
        id: 3,
        tag: "Gaming",
        title: "Game at the\nHighest Level.",
        subtitle: "PS5, Xbox, controllers and accessories. In stock, ready to ship. Order via WhatsApp in minutes.",
        cta: { label: "Shop Consoles", href: "/products?category=VIDEO%20GAMES%20CONSOLES" },
        ctaSecondary: { label: "All Products", href: "/products" },
        bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=700&h=500&fit=crop&auto=format",
        accent: "#818CF8",
    },
    {
        id: 4,
        tag: "Wearables",
        title: "Wear Tech That\nTurns Heads.",
        subtitle: "Apple Watch, Samsung Galaxy Watch, AirPods Pro. All verified authentic. All priced to move.",
        cta: { label: "Shop Wearables", href: "/products?category=SMARTWATCHES" },
        ctaSecondary: { label: "Shop AirPods", href: "/products?category=AIRPODS" },
        bg: "linear-gradient(135deg, #3b0764 0%, #6b21a8 50%, #7c3aed 100%)",
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

    const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
    const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

    useEffect(() => {
        const t = setInterval(next, 5500);
        return () => clearInterval(t);
    }, [next]);

    const slide = SLIDES[current];

    return (
        <div style={{ position: "relative", userSelect: "none", padding: "16px 0 0" }}>
            <div className="container">
                <div
                    key={slide.id}
                    style={{
                        background: slide.bg,
                        borderRadius: "20px",
                        overflow: "hidden",
                        position: "relative",
                        animation: "heroSlideIn 0.45s ease forwards",
                    }}
                >
                    {/* Decorative blobs */}
                    <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: "-80px", left: "25%", width: "220px", height: "220px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

                    <div className="hero-inner">
                        {/* Text */}
                        <div className="hero-text">
                            <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", backgroundColor: "rgba(255,255,255,0.12)", color: "white", marginBottom: "14px", border: `1px solid ${slide.accent}50` }}>
                                {slide.tag}
                            </span>

                            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 4vw, 44px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "14px", whiteSpace: "pre-line" }}>
                                {slide.title}
                            </h1>

                            <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: "28px", maxWidth: "420px" }}>
                                {slide.subtitle}
                            </p>

                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <Link href={slide.cta.href} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "11px 20px", borderRadius: "8px", backgroundColor: "#FFFFFF", color: "#111827", fontWeight: 700, fontSize: "13.5px", textDecoration: "none" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                                    {slide.cta.label}
                                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link href={slide.ctaSecondary.href} style={{ display: "inline-flex", alignItems: "center", padding: "11px 20px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.1)", color: "white", fontWeight: 600, fontSize: "13.5px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}>
                                    {slide.ctaSecondary.label}
                                </Link>
                            </div>
                        </div>

                        {/* Image — hidden on mobile */}
                        <div className="hero-image">
                            <div style={{ width: "100%", maxWidth: "360px", aspectRatio: "4/3", borderRadius: "14px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <img src={slide.image} alt={slide.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        </div>
                    </div>

                    {/* Arrows */}
                    <button onClick={prev} aria-label="Previous" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, backdropFilter: "blur(4px)" }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={next} aria-label="Next" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, backdropFilter: "blur(4px)" }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Dots — desktop only via CSS */}
                    <div className="hero-dots">
                        {SLIDES.map((_, i) => (
                            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === current ? "22px" : "7px", height: "7px", borderRadius: "4px", backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s ease, background 0.2s" }} />
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes heroSlideIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to   { opacity: 1; transform: scale(1); }
                }
                .hero-inner {
                    display: grid;
                    grid-template-columns: 1fr;
                    align-items: center;
                    padding: 40px 24px 52px;
                    gap: 0;
                }
                .hero-image {
                    display: none;
                    justify-content: center;
                    align-items: center;
                }
                .hero-dots {
                    display: none;
                    position: absolute;
                    bottom: 14px;
                    left: 50%;
                    transform: translateX(-50%);
                    gap: 6px;
                }
                @media (min-width: 768px) {
                    .hero-inner {
                        grid-template-columns: 1fr 1fr;
                        gap: 48px;
                        padding: 64px 48px;
                    }
                    .hero-image {
                        display: flex;
                    }
                    .hero-dots {
                        display: flex;
                    }
                }
            `}</style>
        </div>
    );
}
