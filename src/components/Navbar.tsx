"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { totalItems } = useCart();
    const mobileSearchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setActiveCategory(params.get("category"));
    }, []);

    useEffect(() => {
        if (mobileSearchOpen) mobileSearchRef.current?.focus();
    }, [mobileSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setMobileSearchOpen(false);
            setMobileMenuOpen(false);
        }
    };

    return (
        <>
            <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "var(--bg)", borderBottom: "1px solid var(--border)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

                {/* ── Top Bar ── */}
                <div className="container">
                    <div style={{ display: "flex", alignItems: "center", height: "64px" }}>

                        {/* Logo */}
                        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                            <Logo />
                        </Link>

                        {/* Desktop search — hidden on mobile via CSS class */}
                        <form onSubmit={handleSearch} className="navbar-search-form">
                            <div style={{ position: "relative", width: "100%" }}>
                                <input
                                    type="text"
                                    placeholder="Search gadgets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: "100%", height: "42px", padding: "0 44px 0 16px", fontSize: "14px", border: "1.5px solid var(--border)", borderRadius: "8px", backgroundColor: "var(--bg-secondary)", color: "var(--text)", outline: "none", transition: "border-color 0.15s" }}
                                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                                />
                                <button type="submit" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }} aria-label="Search">
                                    <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                        <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Desktop nav links — hidden on mobile */}
                        <nav className="navbar-desktop-nav">
                            {[{ href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(({ href, label }) => (
                                <Link key={href} href={href} style={{ padding: "6px 12px", fontSize: "13.5px", fontWeight: 500, color: "var(--text-secondary)", borderRadius: "6px", transition: "all 0.15s" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary-bg)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right actions */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "auto" }}>

                            {/* Mobile: search icon */}
                            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} aria-label="Search" className="navbar-mobile-only"
                                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                    <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>

                            {/* Theme toggle — always visible */}
                            <button onClick={toggleTheme} aria-label="Toggle theme"
                                className="btn btn-icon btn-secondary"
                                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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

                            {/* Cart — always visible */}
                            <div style={{ position: "relative" }}>
                                <button onClick={() => setCartOpen(!cartOpen)}
                                    style={{ display: "flex", alignItems: "center", gap: "6px", height: "38px", padding: "0 14px", backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer", position: "relative", transition: "background 0.15s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}>
                                    <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="navbar-cart-label">Cart</span>
                                    {totalItems > 0 && (
                                        <span style={{ position: "absolute", top: "-7px", right: "-7px", backgroundColor: "#EF4444", color: "white", fontSize: "10px", fontWeight: 700, width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>
                                            {totalItems > 9 ? "9+" : totalItems}
                                        </span>
                                    )}
                                </button>
                                <MiniCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                            </div>

                            {/* Hamburger — mobile only */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu"
                                className="btn btn-icon btn-secondary navbar-mobile-only"
                                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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

                {/* Mobile search bar */}
                {mobileSearchOpen && (
                    <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)", padding: "10px 16px" }}>
                        <form onSubmit={handleSearch}>
                            <div style={{ position: "relative" }}>
                                <input ref={mobileSearchRef} type="text" placeholder="Search gadgets..." value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: "100%", height: "40px", padding: "0 40px 0 14px", fontSize: "14px", border: "1.5px solid var(--primary)", borderRadius: "8px", backgroundColor: "var(--bg-secondary)", color: "var(--text)", outline: "none" }} />
                                <button type="submit" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--primary)", display: "flex" }}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                        <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ── Category Strip — desktop only ── */}
                <div className="navbar-category-strip" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
                    <div className="container">
                        <div style={{ display: "flex", alignItems: "center", gap: "0", height: "40px", overflowX: "auto", scrollbarWidth: "none" }}>
                            <Link href="/products" style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 14px", fontSize: "13px", fontWeight: 600, color: !activeCategory ? "var(--primary)" : "var(--text-secondary)", borderBottom: !activeCategory ? "2px solid var(--primary)" : "2px solid transparent", whiteSpace: "nowrap", textDecoration: "none", transition: "color 0.15s" }}>
                                All
                            </Link>
                            {CATEGORIES.map((cat) => {
                                const isActive = activeCategory?.toLowerCase() === cat.name.toLowerCase();
                                return (
                                    <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`}
                                        style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 14px", fontSize: "13px", fontWeight: isActive ? 600 : 500, color: isActive ? "var(--primary)" : "var(--text-secondary)", borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent", whiteSpace: "nowrap", textDecoration: "none", transition: "color 0.15s" }}
                                        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                                        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
                                        {cat.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                {mobileMenuOpen && (
                    <div className="navbar-mobile-only" style={{
                        borderTop: "1px solid var(--border)",
                        backgroundColor: "var(--bg)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                        maxHeight: "calc(100vh - 64px)",
                        overflowY: "auto",
                    }}>
                        {/* Main nav links — single horizontal row */}
                        <div style={{ padding: "8px 12px 4px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                {[
                                    {
                                        href: "/products", label: "All Products",
                                        icon: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="15" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="2" y="14" width="7" height="7" rx="1" strokeWidth="2"/><rect x="15" y="14" width="7" height="7" rx="1" strokeWidth="2"/></svg>
                                    },
                                    {
                                        href: "/about", label: "About Us",
                                        icon: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" strokeWidth="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeWidth="2" strokeLinecap="round"/></svg>
                                    },
                                    {
                                        href: "/contact", label: "Contact Us",
                                        icon: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" strokeWidth="2"/></svg>
                                    },
                                ].map(({ href, label, icon }) => (
                                    <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                                        className="mobile-menu-link"
                                        style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 12px", fontWeight: 500, color: "var(--text)", borderRadius: "8px", fontSize: "13.5px", textDecoration: "none", transition: "background 0.13s", flex: 1, justifyContent: "center", whiteSpace: "nowrap" }}>
                                        <span style={{ color: "var(--text-muted)", display: "flex", flexShrink: 0 }}>{icon}</span>
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: "1px", backgroundColor: "var(--border)", margin: "4px 12px" }} />

                        {/* Categories section */}
                        <div style={{ padding: "8px 12px 16px" }}>
                            <p style={{ fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", padding: "6px 12px 10px" }}>
                                Shop by Category
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                                {CATEGORIES.map((cat) => {
                                    const isActive = activeCategory?.toLowerCase() === cat.name.toLowerCase();
                                    return (
                                        <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="mobile-menu-cat"
                                            style={{
                                                display: "flex", alignItems: "center", gap: "8px",
                                                padding: "9px 12px", fontSize: "13.5px",
                                                color: isActive ? "var(--primary)" : "var(--text-secondary)",
                                                backgroundColor: isActive ? "var(--primary-bg)" : "transparent",
                                                borderRadius: "8px", textDecoration: "none",
                                                fontWeight: isActive ? 600 : 400,
                                                transition: "background 0.13s",
                                                border: isActive ? "1px solid var(--primary)" : "1px solid transparent",
                                            }}>
                                            <span style={{
                                                width: "6px", height: "6px", borderRadius: "50%",
                                                backgroundColor: isActive ? "var(--primary)" : "var(--border)",
                                                flexShrink: 0, transition: "background 0.13s"
                                            }} />
                                            {cat.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <style>{`
                /* Search form: hidden on mobile (no space), flex on md+ */
                .navbar-search-form {
                    display: none !important;
                }
                @media (min-width: 768px) {
                    .navbar-search-form {
                        display: flex !important;
                        flex: 1;
                        margin: 0 16px;
                        min-width: 0;
                    }
                }

                /* Desktop nav links: hidden on mobile (no space), flex on lg+ */
                .navbar-desktop-nav {
                    display: none !important;
                }
                @media (min-width: 1024px) {
                    .navbar-desktop-nav {
                        display: flex !important;
                        align-items: center;
                        gap: 4px;
                    }
                }

                /* Mobile-only: show on mobile, gone on md+ */
                .navbar-mobile-only {
                    display: flex !important;
                }
                @media (min-width: 768px) {
                    .navbar-mobile-only { display: none !important; }
                }

                /* Category strip: desktop only */
                .navbar-category-strip { display: none; }
                @media (min-width: 768px) {
                    .navbar-category-strip { display: block !important; }
                }

                /* Cart label */
                .navbar-cart-label { display: none; }
                @media (min-width: 400px) {
                    .navbar-cart-label { display: inline !important; }
                }

                /* Mobile menu link hover */
                .mobile-menu-link:hover {
                    background-color: var(--bg-secondary) !important;
                    color: var(--primary) !important;
                }
                .mobile-menu-link:hover span:first-child {
                    color: var(--primary) !important;
                }

                /* Mobile category tile hover */
                .mobile-menu-cat:hover {
                    background-color: var(--primary-bg) !important;
                    color: var(--primary) !important;
                    border-color: var(--primary) !important;
                }
            `}</style>
        </>
    );
}
