"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useCart } from "./CartProvider";
import Logo from "./Logo";

const CATEGORIES = ["SMARTPHONES", "SMARTWATCHES", "COMPUTERS", "SMART GADGETS", "FASHION"];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
            className="fixed top-0 left-0 right-0 z-50 transition-all"
            style={{
                backgroundColor: "var(--bg)",
                borderBottom: scrolled ? "1px solid var(--border)" : "none",
                boxShadow: scrolled ? "var(--shadow-sm)" : "none"
            }}
        >
            <div className="container">
                <div className="flex items-center justify-between gap-4" style={{ height: "80px" }}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                        <Logo />
                    </Link>

                    {/* Desktop Search */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search gadgets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    paddingRight: "44px"
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--text-muted)",
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    fontSize: "18px"
                                }}
                            >
                                🔍
                            </button>
                        </div>
                    </form>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link
                            href="/products"
                            className="text-sm font-medium transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Products
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="btn btn-icon btn-secondary"
                            aria-label="Toggle theme"
                            style={{ width: "44px", height: "44px" }}
                        >
                            {theme === "dark" ? (
                                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Cart */}
                        <Link
                            href="/checkout"
                            className="btn btn-primary"
                            style={{
                                height: "44px",
                                padding: "0 16px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                position: "relative"
                            }}
                        >
                            <svg
                                style={{ width: "20px", height: "20px" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            <span className="hidden sm:inline">Cart</span>
                            {totalItems > 0 && (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "-6px",
                                        right: "-6px",
                                        backgroundColor: "#EF4444",
                                        color: "white",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {totalItems > 9 ? "9+" : totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-icon btn-secondary lg:hidden"
                            aria-label="Toggle menu"
                            style={{ width: "44px", height: "44px", fontSize: "20px" }}
                        >
                            {mobileMenuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="lg:hidden py-4 animate-fade-in"
                        style={{ borderTop: "1px solid var(--border)" }}
                    >
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <input
                                type="text"
                                placeholder="Search gadgets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input"
                                style={{ backgroundColor: "var(--bg-secondary)" }}
                            />
                        </form>

                        {/* Mobile Nav */}
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/products"
                                className="py-2 font-medium"
                                style={{ color: "var(--text)" }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                All Products
                            </Link>
                            <Link
                                href="/about"
                                className="py-2 font-medium"
                                style={{ color: "var(--text)" }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="py-2 font-medium"
                                style={{ color: "var(--text)" }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                            <div className="pt-3 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
                                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                                    Categories
                                </p>
                                {CATEGORIES.map(cat => (
                                    <Link
                                        key={cat}
                                        href={`/products?category=${encodeURIComponent(cat)}`}
                                        className="block py-2 text-sm"
                                        style={{ color: "var(--text-secondary)" }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
