"use client";

import { useState } from "react";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Please enter a valid email address");
            return;
        }

        setStatus("loading");
        
        // Simulate API call - replace with your actual newsletter API
        setTimeout(() => {
            setStatus("success");
            setMessage("Thanks for subscribing! Check your inbox for exclusive deals.");
            setEmail("");
            
            // Reset after 5 seconds
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 5000);
        }, 1000);
    };

    return (
        <section style={{
            backgroundColor: "var(--primary)",
            padding: "56px 0",
        }}>
            <div className="container">
                <div style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    textAlign: "center",
                }}>
                    <div style={{
                        fontSize: "48px",
                        marginBottom: "16px",
                    }}>
                        📬
                    </div>
                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        margin: "0 0 12px 0",
                    }}>
                        Get Exclusive Deals & Updates
                    </h2>
                    <p style={{
                        fontSize: "15px",
                        color: "rgba(255,255,255,0.9)",
                        marginBottom: "32px",
                        lineHeight: 1.6,
                    }}>
                        Subscribe to our newsletter and be the first to know about new arrivals, special promotions, and exclusive offers. Plus, get 5% off your first order!
                    </p>

                    <form onSubmit={handleSubmit} style={{
                        display: "flex",
                        gap: "12px",
                        maxWidth: "500px",
                        margin: "0 auto",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading" || status === "success"}
                            style={{
                                flex: "1 1 300px",
                                padding: "14px 20px",
                                fontSize: "15px",
                                borderRadius: "8px",
                                border: "2px solid transparent",
                                backgroundColor: "#FFFFFF",
                                color: "#111827",
                                outline: "none",
                                transition: "all 0.15s",
                            }}
                        />
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            style={{
                                padding: "14px 32px",
                                fontSize: "15px",
                                fontWeight: 700,
                                borderRadius: "8px",
                                border: "2px solid #FFFFFF",
                                backgroundColor: status === "success" ? "#10B981" : "#FFFFFF",
                                color: status === "success" ? "#FFFFFF" : "var(--primary)",
                                cursor: status === "loading" || status === "success" ? "not-allowed" : "pointer",
                                transition: "all 0.15s",
                                whiteSpace: "nowrap",
                                opacity: status === "loading" ? 0.7 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (status === "idle" || status === "error") {
                                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.9)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (status === "idle" || status === "error") {
                                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                                }
                            }}
                        >
                            {status === "loading" ? "Subscribing..." : status === "success" ? "✓ Subscribed!" : "Subscribe Now"}
                        </button>
                    </form>

                    {message && (
                        <div style={{
                            marginTop: "20px",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            backgroundColor: status === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                            border: `1px solid ${status === "success" ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 500,
                        }}>
                            {message}
                        </div>
                    )}

                    <p style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.75)",
                        marginTop: "20px",
                        margin: "20px 0 0 0",
                    }}>
                        🔒 We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
}
