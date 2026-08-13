"use client";

import Link from "next/link";

type Category = {
    name: string;
    label: string;
    image: string;
    blendMultiply?: boolean;
};

const CATEGORIES: Category[] = [
    { name: "IPHONE",               label: "iPhone",    image: "/images/categories/iphone.png" },
    { name: "WINDOWS LAPTOPS",      label: "Laptops",   image: "/images/categories/windowslaptop.png" },
    { name: "IPAD",                 label: "Tablets",   image: "/images/categories/Ipad.png" },
    { name: "SMARTWATCHES",         label: "Watches",   image: "/images/categories/smartwatch (2).png" },
    { name: "ANDROID",              label: "Android",   image: "/images/categories/android.png" },
    { name: "MACBOOK",              label: "MacBook",   image: "/images/categories/macbook.png" },
    { name: "AIRPODS",              label: "AirPods",   image: "/images/categories/airpds.png" },
    { name: "VIDEO GAMES CONSOLES", label: "Gaming",    image: "/images/categories/ps5.png" },
];

export default function CategoryRow() {
    return (
        <section style={{
            backgroundColor: "var(--bg)",
            padding: "40px 0",
            borderBottom: "1px solid var(--border)",
        }}>
            <div className="container">
                <div style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}>
                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "var(--text)",
                        margin: 0,
                    }}>
                        Shop by Category
                    </h2>
                    <Link href="/products" style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--primary)",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                    }}>
                        View All →
                    </Link>
                </div>

                <div className="cat-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                }}>
                    {CATEGORIES.map((cat) => (
                        <CategoryCard key={cat.name} cat={cat} />
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .cat-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 8px !important; }
                }
                @media (max-width: 600px) {
                    .cat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
                    .cat-label { font-size: 13px !important; padding: 10px 12px 4px !important; }
                    .cat-bottom { padding: 8px 12px 10px !important; }
                }
            `}</style>
        </section>
    );
}

function CategoryCard({ cat }: { cat: Category }) {
    return (
        <Link
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                overflow: "hidden",
                textDecoration: "none",
                backgroundColor: "#EDF7EE",
                border: "1px solid #D4EDDA",
                transition: "box-shadow 0.18s ease, transform 0.18s ease",
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 6px 20px rgba(22,163,74,0.15)";
                el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
            }}
        >
            {/* Label at top */}
            <div className="cat-label" style={{
                padding: "14px 16px 4px",
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.01em",
                flexShrink: 0,
            }}>
                {cat.label}
            </div>

            {/* 
              * Aspect-ratio box: always square, scales with card width.
              * Image fills the box via object-fit: contain with padding.
              * This makes images large and fully responsive.
              */}
            <div style={{
                position: "relative",
                width: "100%",
                /* Square aspect ratio — image area grows with card */
                paddingBottom: "85%",
                backgroundColor: "#EDF7EE",
                overflow: "hidden",
            }}>
                <img
                    src={cat.image}
                    alt={cat.label}
                    style={{
                        position: "absolute",
                        inset: "8% 10%",        /* padding inside the box */
                        width: "80%",
                        height: "84%",
                        objectFit: "contain",
                        objectPosition: "center",
                        display: "block",
                        transition: "transform 0.3s ease",
                        mixBlendMode: cat.blendMultiply ? "multiply" : "normal",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.07)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    }}
                />
            </div>

            {/* Bottom bar */}
            <div className="cat-bottom" style={{
                padding: "10px 16px 12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderTop: "1px solid #D4EDDA",
                flexShrink: 0,
            }}>
                <svg width="12" height="12" fill="none" stroke="#16A34A" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" />
                </svg>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#16A34A" }}>
                    Shop {cat.label}
                </span>
                <svg width="10" height="10" fill="none" stroke="#16A34A" viewBox="0 0 24 24" style={{ marginLeft: "auto" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
