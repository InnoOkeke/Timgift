"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useCart } from "./CartProvider";
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
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { totalItems } = useCart();
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setActiveCategory(params.get("category"));
    }, []);

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setSearchOpen(false);
            setMobileMenuOpen(false);
        }
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    backgroundColor: "var(--bg)",
                    borderBottom: "1px solid var(--border)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
            >
                {/* Top bar */}
                <div className="container">
                    <div style={{ display: "flex", alignItems: "center", height: "56px", gap: "12px" }}>

                        {/* Logo — compact on mobile */}
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", flexShrink: 0 }}>
                            <svg width="28" height="28" viewBox="125 405 210 210" xmlns="http://www.w3.org/2000/svg">
                                {theme === "dark" ? (
                                    <>
                                        <path d="M 132.245 506.750 L 132.500 603.500 229.250 603.755 L 326 604.010 326 554.005 L 326 504 293 504 L 260 504 260 518 L 260 532 276 532 L 292 532 292 550 L 292 568 245.500 568 L 199 568 199 536 L 199 504 182.500 504 L 166 504 166 474.500 L 166 445 229 445 L 292 445 292 466.500 L 292 488 309 488 L 326 488 326 449 L 326 410 228.995 410 L 131.990 410 132.245 506.750" fill="#205027" />
                                        <path d="M 182 474.500 L 182 488 198.500 488 L 215 488 215 520 L 215 552 229.500 552 L 244 552 244 520 L 244 488 260 488 L 276 488 276 474.500 L 276 461 L 229 461 L 182 461 182 474.500" fill="#FFFFFF" />
                                    </>
                                ) : (
                                    <path d="M 132.245 506.750 L 132.500 603.500 229.250 603.755 L 326 604.010 326 554.005 L 326 504 293 504 L 260 504 260 518 L 260 532 276 532 L 292 532 292 550 L 292 568 245.500 568 L 199 568 199 536 L 199 504 182.500 504 L 166 504 166 474.500 L 166 445 229 445 L 292 445 292 466.500 L 292 488 309 488 L 326 488 326 449 L 326 410 228.995 410 L 131.990 410 132.245 506.750 M 182 474.500 L 182 488 198.500 488 L 215 488 215 520 L 215 552 229.500 552 L 244 552 244 520 L 244 488 260 488 L 276 488 276 474.500 L 276 461 L 229 461 L 182 461 182 474.500" fill="#205027" fillRule="evenodd" />
                                )}
                            </svg>
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.01em", color: "var(--text)" }}>
                                TIMGIFT
                            </span>
                        </Link>

                        {/* Desktop search bar */}
                        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: "480px", margin: "0 8px", display: "none" }} className="md-search-form">
                            <div style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    placeholder="Search gadgets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: "100%",
                                        height: "38px",
                                        padding: "0 40px 0 14px",
                                        fontSize: "14px",
                                        border: "1.5px solid var(--border)",
                                        borderRadius: "8px",
                                        backgroundColor: "var(--bg-secondary)",
                                        color: "var(--text)",
                                        outline: "none",
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                                />
                                <button type="submit" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                        <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Spacer */}
                        <div style={{ flex: 1 }} className="md-spacer-hide" />

                        {/* Right actions */}
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>

                            {/* Desktop nav links */}
                            <nav style={{ display: "none", alignItems: "center", gap: "2px", marginRight: "4px" }} className="lg-nav">
                                {[{ href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(({ href, label }) => (
                                    <Link key={href} href={href} style={{ padding: "6px 10px", fontSize: "13.5px", fontWeight: 500, color: "var(--text-secondary)", borderRadius: "6px", transition: "all 0.15s" }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary-bg)"; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                                        {label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile search icon */}
                            <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"
                                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                                className="mobile-search-btn">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                    <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>

                            {/* Theme toggle */}
                            <button onClick={toggleTheme} aria-label="Toggle theme"
                                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                                {theme === "dark" ? (
                                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            {/* Cart button */}
                            <div style={{ position: "relative" }}>
                                <button onClick={() => setCartOpen(!cartOpen)}
                                    style={{ display: "flex", alignItems: "center", gap: "5px", height: "36px", padding: "0 12px", backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", fontWeight: 600, fontSize: "13px", border: "none", cursor: "pointer", position: "relative", flexShrink: 0, transition: "background 0.15s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="cart-label">Cart</span>
                                    {totalItems > 0 && (
                                        <span style={{ position: "absolute", top: "-6px", right: "-6px", backgroundColor: "#EF4444", color: "white", fontSize: "10px", fontWeight: 700, width: "17px", height: "17px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--bg)" }}>
                                            {totalItems > 9 ? "9+" : totalItems}
                                        </span>
                                    )}
                                </button>
                                <MiniCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                            </div>

                            {/* Hamburger */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu"
                                style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                                className="hamburger-btn">
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

                {/* Mobile search bar — slide down */}
                {searchOpen && (
                    <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)", padding: "10px 16px" }}>
                        <form onSubmit={handleSearch}>
                            <div style={{ position: "relative" }}>
                                <input
                                    ref={searchRef}
                                    type="text"
                                    placeholder="Search gadgets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: "100%", height: "40px", padding: "0 40px 0 14px", fontSize: "14px", border: "1.5px solid var(--primary)", borderRadius: "8px", backgroundColor: "var(--bg-secondary)", color: "var(--text)", outline: "none" }}
                                />
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

                {/* Category strip — desktop only */}
                <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }} className="category-strip">
                    <div className="container">
                        <div style={{ display: "flex", alignItems: "center", height: "40px", overflowX: "auto", scrollbarWidth: "none", gap: "0" }}>
                            <Link href="/products" style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 14px", fontSize: "13px", fontWeight: 600, color: !activeCategory ? "var(--primary)" : "var(--text-secondary)", borderBottom: !activeCategory ? "2px solid var(--primary)" : "2px solid transparent", whiteSpace: "nowrap", textDecoration: "none" }}>
                                All
                            </Link>
                            {CATEGORIES.map((cat) => {
                                const isActive = activeCategory?.toLowerCase() === cat.name.toLowerCase();
                                return (
                                    <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`}
                                        style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 14px", fontSize: "13px", fontWeight: isActive ? 600 : 500, color: isActive ? "var(--primary)" : "var(--text-secondary)", borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent", whiteSpace: "nowrap", textDecoration: "none" }}
                                        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                                        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
                                        {cat.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)", padding: "8px 0 16px" }}>
                        <div className="container">
                            <nav style={{ display: "flex", flexDirection: "column" }}>
                                {[{ href: "/products", label: "All Products" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(({ href, label }) => (
                                    <Link key={href} href={href} onClick={closeMobileMenu}
                                        style={{ padding: "11px 4px", fontSize: "15px", fontWeight: 500, color: "var(--text)", borderBottom: "1px solid var(--border-light)", textDecoration: "none" }}>
                                        {label}
                                    </Link>
                                ))}

                                <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: "14px", marginBottom: "8px" }}>
                                    Categories
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                                    {CATEGORIES.map((cat) => (
                                        <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`} onClick={closeMobileMenu}
                                            style={{ padding: "9px 10px", fontSize: "14px", color: "var(--text-secondary)", borderRadius: "8px", backgroundColor: "var(--bg-secondary)", textDecoration: "none", fontWeight: 500 }}>
                                            {cat.label}
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <style>{`
                /* Desktop: show search bar, hide mobile search btn and hamburger */
                @media (min-width: 768px) {
                    .md-search-form { display: flex !important; }
                    .md-spacer-hide { display: none !important; }
                    .mobile-search-btn { display: none !important; }
                }
                @media (min-width: 1024px) {
                    .lg-nav { display: flex !important; }
                    .hamburger-btn { display: none !important; }
                }
                /* Category strip: desktop only */
                .category-strip { display: none; }
                @media (min-width: 768px) {
                    .category-strip { display: block; }
                }
                /* Cart label: hide on very small screens */
                .cart-label { display: none; }
                @media (min-width: 380px) {
                    .cart-label { display: inline; }
                }
            `}</style>
        </>
    );
}
