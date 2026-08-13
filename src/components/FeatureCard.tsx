"use client";

interface FeatureCardProps {
    icon: string;
    title: string;
    desc: string;
}

export default function FeatureCard({ icon, title, desc }: FeatureCardProps) {
    return (
        <div
            style={{
                padding: "28px",
                borderRadius: "12px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                textAlign: "center",
                transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            <div style={{
                fontSize: "48px",
                marginBottom: "16px",
            }}>
                {icon}
            </div>
            <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text)",
                margin: "0 0 12px 0",
            }}>
                {title}
            </h3>
            <p style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                margin: 0,
            }}>
                {desc}
            </p>
        </div>
    );
}
