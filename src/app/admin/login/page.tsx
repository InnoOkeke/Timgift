"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
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
            } else {
                setError("Incorrect administrator password.");
            }
        } catch {
            setError("Unable to connect. Please check connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 select-none"
            style={{ backgroundColor: "var(--bg)" }}
        >
            <div className="w-full max-w-[400px] flex flex-col items-center">
                {/* Brand Logo Header */}
                <div className="mb-6 flex flex-col items-center">
                    <Link href="/" className="transition-opacity hover:opacity-85">
                        <Logo tagline="Admin Portal" variant="custom" />
                    </Link>
                </div>

                {/* macOS / Apple ID Authentication Card */}
                <div
                    className="w-full rounded-2xl border p-7 sm:p-8 shadow-sm transition-all"
                    style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border)",
                    }}
                >
                    {/* Centered Lock Avatar */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm"
                            style={{
                                backgroundColor: "var(--bg)",
                                border: "1px solid var(--border)",
                                color: "var(--primary)"
                            }}
                        >
                            <svg width="20" height="20" style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1
                            className="text-xl font-bold tracking-tight mb-1"
                            style={{ color: "var(--text)" }}
                        >
                            Admin Access
                        </h1>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Enter master password to continue
                        </p>
                    </div>

                    {/* Authentication Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                                Master Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm font-medium border outline-none transition-all"
                                    style={{
                                        backgroundColor: "var(--bg)",
                                        borderColor: "var(--border)",
                                        color: "var(--text)"
                                    }}
                                    placeholder="••••••••••••"
                                    required
                                    autoFocus
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "var(--primary)";
                                        e.target.style.boxShadow = "0 0 0 3px rgba(22, 163, 74, 0.15)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "var(--border)";
                                        e.target.style.boxShadow = "none";
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-lg opacity-60 hover:opacity-100 transition-opacity"
                                    style={{ color: "var(--text-muted)" }}
                                    tabIndex={-1}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg width="15" height="15" style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                className="p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-rose-500 bg-rose-500/10 border border-rose-500/20"
                            >
                                <svg width="14" height="14" style={{ width: "14px", height: "14px" }} className="shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-5 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 shadow-xs"
                            style={{
                                backgroundColor: "var(--primary)",
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>
                    </form>

                    {/* Bottom Back to Store link */}
                    <div className="mt-5 pt-4 border-t text-center" style={{ borderColor: "var(--border)" }}>
                        <Link
                            href="/"
                            className="text-xs font-medium hover:underline inline-flex items-center gap-1.5"
                            style={{ color: "var(--text-muted)" }}
                        >
                            <svg width="13" height="13" style={{ width: "13px", height: "13px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Return to Store</span>
                        </Link>
                    </div>
                </div>

                <p className="text-center text-[10px] mt-5" style={{ color: "var(--text-muted)" }}>
                    TimGift Control Suite &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
