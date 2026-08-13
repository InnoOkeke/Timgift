"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";

type Status = "loading" | "success" | "failed";

export default function PaymentVerifyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { clearCart } = useCart();
    const [status, setStatus] = useState<Status>("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const reference = searchParams.get("reference") || searchParams.get("trxref");
        if (!reference) {
            setStatus("failed");
            setMessage("No payment reference found.");
            return;
        }

        fetch(`/api/payment/verify?reference=${encodeURIComponent(reference)}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    clearCart();
                    setStatus("success");
                    setTimeout(() => router.push("/"), 4000);
                } else {
                    setStatus("failed");
                    setMessage(data.message || "Payment could not be verified.");
                }
            })
            .catch(() => {
                setStatus("failed");
                setMessage("An error occurred while verifying your payment.");
            });
    }, [searchParams, clearCart, router]);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg)" }}>
            <Navbar />
            <main style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "56px",
                paddingBottom: "80px",
            }}>
                <div style={{
                    textAlign: "center",
                    maxWidth: "480px",
                    width: "100%",
                    padding: "48px 32px",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "24px",
                    border: "1px solid var(--border)",
                    margin: "0 16px",
                }}>
                    {status === "loading" && (
                        <>
                            <div style={{
                                width: "56px",
                                height: "56px",
                                border: "3px solid var(--border)",
                                borderTopColor: "var(--primary)",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                                margin: "0 auto 24px",
                            }} />
                            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
                                Verifying Payment
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                                Please wait while we confirm your payment...
                            </p>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <div style={{
                                width: "72px",
                                height: "72px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(22, 163, 74, 0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 24px",
                                fontSize: "36px",
                            }}>
                                ✓
                            </div>
                            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
                                Payment Successful!
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "32px" }}>
                                Your order has been placed. You&apos;ll be redirected to the home page shortly.
                            </p>
                            <Link href="/" style={{
                                display: "inline-block",
                                padding: "14px 28px",
                                backgroundColor: "var(--primary)",
                                color: "white",
                                borderRadius: "12px",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                            }}>
                                Back to Home
                            </Link>
                        </>
                    )}

                    {status === "failed" && (
                        <>
                            <div style={{
                                width: "72px",
                                height: "72px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(239, 68, 68, 0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 24px",
                                fontSize: "36px",
                            }}>
                                ✕
                            </div>
                            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
                                Payment Failed
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "32px" }}>
                                {message || "Your payment could not be completed. Please try again."}
                            </p>
                            <Link href="/checkout" style={{
                                display: "inline-block",
                                padding: "14px 28px",
                                backgroundColor: "var(--primary)",
                                color: "white",
                                borderRadius: "12px",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                            }}>
                                Try Again
                            </Link>
                        </>
                    )}
                </div>
            </main>
            <Footer />
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
