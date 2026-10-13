"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function AdminNavbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const isActive = (path: string) => {
        if (path === "/company/admin") return pathname === "/company/admin";
        return pathname.startsWith(path);
    };

    const navLinks = [
        {
            href: "/company/admin",
            label: "Dashboard",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            href: "/company/admin/products",
            label: "Products Catalog",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            href: "/company/admin/orders",
            label: "Orders & Sales",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
    ];

    const handleSignOut = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/company/admin/login";
        } catch (err) {
            console.error("Sign out error", err);
            window.location.href = "/company/admin/login";
        }
    };

    return (
        <>
            <header
                className="sticky top-0 left-0 right-0 z-40 border-b transition-all"
                style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)"
                }}
            >
                <div className="w-full px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Left: Brand Logo & Admin Status Pill */}
                        <div className="flex items-center gap-6 sm:gap-8">
                            <Link href="/company/admin" className="flex items-center gap-3 group transition-transform active:scale-98">
                                <Logo tagline="Admin Console" variant="custom" />
                            </Link>

                            <div
                                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border shadow-xs"
                                style={{
                                    borderColor: "rgba(22, 163, 74, 0.25)",
                                    backgroundColor: "rgba(22, 163, 74, 0.08)",
                                    color: "var(--primary)"
                                }}
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20"></span>
                                <span className="tracking-wide">Executive Console</span>
                            </div>
                        </div>

                        {/* Center: Luxury Segmented Menu Capsule */}
                        <nav
                            className="hidden md:flex items-center p-1.5 rounded-2xl border shadow-xs"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                borderColor: "var(--border)"
                            }}
                        >
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                                            active
                                                ? "text-white shadow-md shadow-emerald-600/25"
                                                : "hover:text-emerald-600 dark:hover:text-emerald-400 opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                                        }`}
                                        style={{
                                            background: active ? "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)" : "transparent",
                                            border: active ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid transparent",
                                            color: active ? "#ffffff" : "var(--text)"
                                        }}
                                    >
                                        <span className={active ? "text-white" : "text-emerald-600 dark:text-emerald-400"}>
                                            {link.icon}
                                        </span>
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right: Luxury Actions Toolbar */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Primary "+ Add Product" Button */}
                            <Link
                                href="/company/admin/products/new"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    height: "38px",
                                    padding: "0 13px",
                                    borderRadius: "11px",
                                    fontSize: "12px",
                                    fontWeight: "800",
                                    letterSpacing: "-0.01em",
                                    color: "#FFFFFF",
                                    background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                                    border: "1px solid rgba(22, 163, 74, 0.9)",
                                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 3px 10px rgba(22, 163, 74, 0.35)",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                                    userSelect: "none",
                                    whiteSpace: "nowrap"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 6px 18px rgba(22, 163, 74, 0.45)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 3px 10px rgba(22, 163, 74, 0.35)";
                                }}
                            >
                                <span
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        borderRadius: "5px",
                                        backgroundColor: "rgba(255, 255, 255, 0.22)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}
                                >
                                    <svg style={{ width: "11px", height: "11px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                                <span>Add Product</span>
                            </Link>

                            {/* Storefront Link */}
                            <Link
                                href="/"
                                className="hidden sm:inline-flex"
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    height: "40px",
                                    padding: "0 14px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    letterSpacing: "-0.01em",
                                    borderColor: "var(--border)",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    backgroundColor: "var(--bg-secondary)",
                                    color: "var(--text)",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                                    transition: "all 0.15s ease",
                                    cursor: "pointer",
                                    textDecoration: "none"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.borderColor = "var(--border-strong)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.borderColor = "var(--border)";
                                }}
                                title="Open Live Storefront"
                            >
                                <svg style={{ width: "15px", height: "15px", flexShrink: 0, color: "#16A34A" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Store</span>
                            </Link>

                            {/* Sign Out Button (Ruby Tinted Luxury) */}
                            <button
                                onClick={handleSignOut}
                                className="hidden sm:inline-flex"
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    height: "40px",
                                    padding: "0 14px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    letterSpacing: "-0.01em",
                                    borderColor: "rgba(239, 68, 68, 0.25)",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                                    color: "#EF4444",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                                    transition: "all 0.15s ease",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.backgroundColor = "#EF4444";
                                    e.currentTarget.style.color = "#FFFFFF";
                                    e.currentTarget.style.borderColor = "#EF4444";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.08)";
                                    e.currentTarget.style.color = "#EF4444";
                                    e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.25)";
                                }}
                                title="Sign Out from Admin"
                            >
                                <svg style={{ width: "15px", height: "15px", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Sign Out</span>
                            </button>

                            {/* Mobile Hamburger Toggle */}
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden rounded-xl flex items-center justify-center border transition-all active:scale-95 shadow-xs"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border)",
                                    color: "var(--text)"
                                }}
                                aria-label="Toggle Navigation Menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu with Executive Suite Design */}
                {mobileMenuOpen && (
                    <div
                        className="md:hidden border-t px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border)",
                            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px", marginBottom: "4px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                Navigation Menu
                            </span>
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#16A34A", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: "#16A34A" }} />
                                Executive Portal
                            </span>
                        </div>

                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                                        style={{
                                            background: active
                                                ? "linear-gradient(135deg, #16A34A 0%, #15803D 100%)"
                                                : "var(--bg)",
                                            border: active
                                                ? "1px solid rgba(22, 163, 74, 0.8)"
                                                : "1px solid var(--border)",
                                            color: active ? "#ffffff" : "var(--text)",
                                            boxShadow: active
                                                ? "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(22, 163, 74, 0.28)"
                                                : "0 1px 2px rgba(0, 0, 0, 0.02)",
                                            fontWeight: "700",
                                            fontSize: "13px"
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span style={{ color: active ? "#FFFFFF" : "#16A34A" }}>
                                                {link.icon}
                                            </span>
                                            <span>{link.label}</span>
                                        </div>
                                        <svg style={{ width: "14px", height: "14px", opacity: active ? 0.9 : 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                );
                            })}
                        </div>

                        <div style={{ paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
                            <div className="grid grid-cols-2 gap-2.5">
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all"
                                    style={{
                                        borderColor: "var(--border)",
                                        backgroundColor: "var(--bg)",
                                        color: "var(--text)"
                                    }}
                                >
                                    <svg style={{ width: "14px", height: "14px", color: "#16A34A" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Storefront</span>
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all"
                                    style={{
                                        borderColor: "rgba(239, 68, 68, 0.25)",
                                        backgroundColor: "rgba(239, 68, 68, 0.08)",
                                        color: "#EF4444"
                                    }}
                                >
                                    <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
