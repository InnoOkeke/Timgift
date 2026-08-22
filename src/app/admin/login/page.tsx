"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError("Incorrect password. Please try again.");
                setPassword("");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Sales Analytics",
            desc: "Real-time revenue and order metrics",
        },
        {
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "Product Catalog",
            desc: "Manage inventory, pricing and media",
        },
        {
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            title: "Order Management",
            desc: "Track and fulfil customer purchases",
        },
        {
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Media Uploads",
            desc: "Cloud-hosted product images & videos",
        },
    ];

    return (
        <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#0a0a0a" }}>

            {/* ── Left Panel ── */}
            <div style={{
                width: "52%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "48px 56px",
                background: "linear-gradient(145deg, #052e16 0%, #064e3b 40%, #065f46 70%, #047857 100%)",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background decoration */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 10%, rgba(5,150,105,0.1) 0%, transparent 50%)",
                }} />
                <div style={{
                    position: "absolute", top: "-120px", right: "-120px",
                    width: "400px", height: "400px", borderRadius: "50%",
                    background: "rgba(16,185,129,0.06)", pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "-80px", left: "-80px",
                    width: "300px", height: "300px", borderRadius: "50%",
                    background: "rgba(5,150,105,0.08)", pointerEvents: "none",
                }} />

                {/* Logo */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "64px" }}>
                        <div style={{
                            width: "40px", height: "40px", borderRadius: "12px",
                            background: "rgba(255,255,255,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "1px solid rgba(255,255,255,0.2)",
                            backdropFilter: "blur(8px)",
                        }}>
                            <Image src="/images/icon.png" alt="TimGift" width={26} height={26} style={{ objectFit: "contain" }} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 800, fontSize: "16px", color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                                TimGift
                            </p>
                            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: "2px" }}>
                                Admin Console
                            </p>
                        </div>
                    </div>

                    {/* Hero text */}
                    <h1 style={{
                        fontSize: "clamp(28px, 3vw, 40px)",
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1.15,
                        letterSpacing: "-0.03em",
                        marginBottom: "16px",
                        maxWidth: "420px",
                    }}>
                        Your store,<br />
                        <span style={{ color: "#6ee7b7" }}>fully in control.</span>
                    </h1>
                    <p style={{
                        fontSize: "15px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.7,
                        maxWidth: "380px",
                        marginBottom: "48px",
                    }}>
                        Manage products, track orders, and monitor your TimGift store — all from one secure dashboard.
                    </p>

                    {/* Feature list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {features.map((f, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                                    background: "rgba(255,255,255,0.1)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#6ee7b7",
                                }}>
                                    {f.icon}
                                </div>
                                <div>
                                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{f.title}</p>
                                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom badge */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "8px 14px", borderRadius: "20px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                    }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#34d399", flexShrink: 0 }} />
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                            Store is live and accepting orders
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Right Panel — Sign In ── */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 40px",
                backgroundColor: "#0f0f0f",
            }}>
                <div style={{ width: "100%", maxWidth: "380px" }}>

                    {/* Header */}
                    <div style={{ marginBottom: "40px" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            padding: "4px 12px", borderRadius: "20px",
                            backgroundColor: "rgba(22,163,74,0.12)",
                            border: "1px solid rgba(22,163,74,0.2)",
                            marginBottom: "20px",
                        }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#22c55e", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                                Secure Access
                            </span>
                        </div>
                        <h2 style={{
                            fontSize: "28px", fontWeight: 800, color: "#ffffff",
                            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "8px",
                        }}>
                            Admin Sign In
                        </h2>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                            Enter your admin password to access the store console.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                            <label style={{
                                display: "block", fontSize: "12px", fontWeight: 600,
                                color: "rgba(255,255,255,0.5)", marginBottom: "8px",
                                letterSpacing: "0.04em", textTransform: "uppercase",
                            }}>
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <div style={{
                                    position: "absolute", left: "16px", top: "50%",
                                    transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)",
                                    pointerEvents: "none",
                                }}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoFocus
                                    placeholder="Enter admin password"
                                    style={{
                                        width: "100%",
                                        padding: "14px 48px 14px 44px",
                                        fontSize: "15px",
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                                        borderRadius: "12px",
                                        color: "#ffffff",
                                        outline: "none",
                                        transition: "all 0.2s",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "rgba(34,197,94,0.5)";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.1)";
                                        e.target.style.backgroundColor = "rgba(255,255,255,0.07)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)";
                                        e.target.style.boxShadow = "none";
                                        e.target.style.backgroundColor = "rgba(255,255,255,0.05)";
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    style={{
                                        position: "absolute", right: "14px", top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none", border: "none", cursor: "pointer",
                                        color: "rgba(255,255,255,0.3)", padding: "4px",
                                        display: "flex", alignItems: "center",
                                    }}
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Error message */}
                            {error && (
                                <div style={{
                                    marginTop: "8px", display: "flex", alignItems: "center", gap: "6px",
                                    padding: "10px 14px", borderRadius: "8px",
                                    backgroundColor: "rgba(239,68,68,0.1)",
                                    border: "1px solid rgba(239,68,68,0.2)",
                                }}>
                                    <svg width="14" height="14" fill="none" stroke="#EF4444" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span style={{ fontSize: "12px", color: "#EF4444", fontWeight: 500 }}>{error}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading || !password}
                            style={{
                                width: "100%",
                                padding: "15px 24px",
                                fontSize: "15px",
                                fontWeight: 700,
                                background: loading || !password
                                    ? "rgba(255,255,255,0.08)"
                                    : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                                color: loading || !password ? "rgba(255,255,255,0.3)" : "#ffffff",
                                border: "none",
                                borderRadius: "12px",
                                cursor: loading || !password ? "not-allowed" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                transition: "all 0.2s",
                                boxShadow: loading || !password ? "none" : "0 4px 20px rgba(22,163,74,0.35)",
                                marginTop: "4px",
                            }}
                            onMouseEnter={(e) => {
                                if (!loading && password) {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(22,163,74,0.45)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = loading || !password ? "none" : "0 4px 20px rgba(22,163,74,0.35)";
                            }}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: "18px", height: "18px",
                                        border: "2px solid rgba(255,255,255,0.3)",
                                        borderTopColor: "white",
                                        borderRadius: "50%",
                                        animation: "spin 0.8s linear infinite",
                                    }} />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Sign In to Console</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div style={{
                        marginTop: "36px",
                        paddingTop: "24px",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <a
                            href="/"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "6px",
                                fontSize: "12px", color: "rgba(255,255,255,0.35)",
                                textDecoration: "none", fontWeight: 500,
                                transition: "color 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                        >
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Store
                        </a>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
                            TimGift © {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                input::placeholder { color: rgba(255,255,255,0.2); }
                @media (max-width: 768px) {
                    div[style*="width: 52%"] { display: none !important; }
                    div[style*="flex: 1"][style*="0f0f0f"] { flex: 1; }
                }
            `}</style>
        </div>
    );
}
