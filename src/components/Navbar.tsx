"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useCart } from "./CartProvider";
import Logo from "./Logo";
import MiniCart from "./MiniCart";

const CATEGORIES = [
    { name: "IPHONE", label: "iPhone" },
    { name: "ANDROID", label: "Android" },
    { name: "MACBOOK", label: "MacBook" },
    { name: "IPAD", label: "iPad" },
    { name: "VIDEO GAMES CONSOLES", label: "Consoles" },
    { name: "SMARTWATCHES", label: "Smartwatches" },
    { name: "WINDOWS LAPTOPS", label: "Laptops" },
    { name: "AIRPODS", label: "AirPods" },
];

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { totalItems } = useCart();

    // Track active category from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setActiveCategory(params.get("category"));
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setMobileMenuOpen(false);
        }
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                backgroundColor: "var(--bg)",
                borderBottom: "1px solid var(--border)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}
        >
            {/* ── Top Bar ── */}
            <div className="container">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    height: "64px"
                }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <Logo />
                    </Link>

                    {/* Search bar — fills remaining space */}
                    <form
                        onSubmit={handleSearch}
                        style={{ flex: 1, margin: "0 16px" }}
                        className="hidden md:flex"
                    >
                        <div style={{ position: "relative", width: "100%" }}>
                            <input
                                type="text"
                                placeholder="Search gadgets…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    padding: "0 44px 0 16px",
                                    fontSize: "14px",
                                    border: "1.5px solid var(--border)",
                                    borderRadius: "8px",
                                    backgroundColor: "var(--bg-secondary)",
                                    color: "var(--text)",
                                    outline: "none",
                                    transition: "border-color 0.15s",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                            />
                            <button
                                type="submit"
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    color: "var(--text-muted)",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                aria-label="Search"
                            >
                                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                    <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Spacer - removed to allow search to expand */}

                    {/* Right nav links */}
                    <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden lg:flex">
                        <Link
                            href="/about"
                            style={{
                                padding: "6px 12px",
                                fontSize: "13.5px",
                                fontWeight: 500,
                                color: "var(--text-secondary)",
                                borderRadius: "6px",
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.color = "var(--primary)";
                                (e.target as HTMLElement).style.backgroundColor = "var(--primary-bg)";
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.color = "var(--text-secondary)";
                                (e.target as HTMLElement).style.backgroundColor = "transparent";
                            }}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            style={{
                                padding: "6px 12px",
                                fontSize: "13.5px",
                                fontWeight: 500,
                                color: "var(--text-secondary)",
                                borderRadius: "6px",
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLElement).style.color = "var(--primary)";
                                (e.target as HTMLElement).style.backgroundColor = "var(--primary-bg)";
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLElement).style.color = "var(--text-secondary)";
                                (e.target as HTMLElement).style.backgroundColor = "transparent";
                            }}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Theme toggle + Cart */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="btn btn-icon btn-secondary hidden lg:flex"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Cart */}
                        <div style={{ position: "relative" }}>
                            <button
                                onClick={() => setCartOpen(!cartOpen)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    height: "38px",
                                    padding: "0 14px",
                                    backgroundColor: "var(--primary)",
                                    color: "white",
                                    borderRadius: "8px",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    position: "relative",
                                    transition: "background 0.15s",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary-hover)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)")}
                            >
                                <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="hidden sm:inline">Cart</span>
                                {totalItems > 0 && (
                                    <span style={{
                                        position: "absolute",
                                        top: "-7px",
                                        right: "-7px",
                                        backgroundColor: "#EF4444",
                                        color: "white",
                                        fontSize: "10px",
                                        fontWeight: 700,
                                        width: "18px",
                                        height: "18px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px solid white",
                                    }}>
                                        {totalItems > 9 ? "9+" : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mini Cart Dropdown */}
                            <MiniCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-icon btn-secondary lg:hidden"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Category Strip ── */}
            <div
                style={{
                    borderTop: "1px solid var(--border)",
                    backgroundColor: "var(--bg)",
                }}
                className="hidden md:block"
            >
                <div className="container">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0",
                        height: "40px",
                        overflowX: "auto",
                        scrollbarWidth: "none",
                    }}>
                        <Link
                            href="/products"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                padding: "0 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: !activeCategory ? "var(--primary)" : "var(--text-secondary)",
                                borderBottom: !activeCategory ? "2px solid var(--primary)" : "2px solid transparent",
                                whiteSpace: "nowrap",
                                transition: "color 0.15s",
                                textDecoration: "none",
                            }}
                        >
                            All
                        </Link>
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory?.toLowerCase() === cat.name.toLowerCase();
                            return (
                                <Link
                                    key={cat.name}
                                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        height: "100%",
                                        padding: "0 14px",
                                        fontSize: "13px",
                                        fontWeight: isActive ? 600 : 500,
                                        color: isActive ? "var(--primary)" : "var(--text-secondary)",
                                        borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                                        whiteSpace: "nowrap",
                                        transition: "color 0.15s",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                                    }}
                                >
                                    {cat.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            {mobileMenuOpen && (
                <div
                    style={{
                        borderTop: "1px solid var(--border)",
                        backgroundColor: "var(--bg)",
                        padding: "16px",
                    }}
                    className="lg:hidden animate-fade-in"
                >
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} style={{ marginBottom: "16px" }}>
                        <input
                            type="text"
                            placeholder="Search gadgets…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%",
                                height: "42px",
                                padding: "0 16px",
                                fontSize: "14px",
                                border: "1.5px solid var(--border)",
                                borderRadius: "8px",
                                backgroundColor: "var(--bg-secondary)",
                                color: "var(--text)",
                                outline: "none",
                            }}
                        />
                    </form>

                    {/* Mobile Nav */}
                    <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <Link
                            href="/products"
                            style={{ padding: "10px 12px", fontWeight: 500, color: "var(--text)", borderRadius: "6px", fontSize: "14px" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            All Products
                        </Link>
                        <Link
                            href="/about"
                            style={{ padding: "10px 12px", fontWeight: 500, color: "var(--text-secondary)", borderRadius: "6px", fontSize: "14px" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            style={{ padding: "10px 12px", fontWeight: 500, color: "var(--text-secondary)", borderRadius: "6px", fontSize: "14px" }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact Us
                        </Link>

                        <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0", paddingTop: "8px" }}>
                            <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "4px 12px 8px" }}>
                                Categories
                            </p>
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.name}
                                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                                    style={{ display: "block", padding: "8px 12px", fontSize: "14px", color: "var(--text-secondary)", borderRadius: "6px" }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>

                        <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0", paddingTop: "8px", display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px" }}>
                            <button onClick={toggleTheme} className="btn btn-secondary btn-sm">
                                {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
