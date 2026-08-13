"use client";

import Link from "next/link";

interface BrandCardProps {
    name: string;
    icon: string;
    category: string;
}

export default function BrandCard({ name, icon, category }: BrandCardProps) {
    return (
        <Link
            href={`/products?category=${category}`}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "24px 16px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-card)",
                textDecoration: "none",
                transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            <div style={{ fontSize: "32px" }}>{icon}</div>
            <div style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
            }}>
                {name}
            </div>
        </Link>
    );
}
