"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
            <div className="container" style={{ paddingTop: "48px", paddingBottom: "32px" }}>

                {/* Top section: Brand full-width on mobile, then columns on desktop */}
                <div className="footer-grid">

                    {/* Brand — spans full width on mobile */}
                    <div className="footer-brand">
                        <Link href="/" style={{ display: "inline-block", marginBottom: "14px" }}>
                            <Logo variant="footer" />
                        </Link>
                        <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--text-muted)", maxWidth: "260px", marginBottom: "20px" }}>
                            Premium gadgets. Verified authentic. Delivered nationwide. No stress, just great tech.
                        </p>
                        <div style={{ display: "flex", gap: "8px" }}>
                            {[
                                {
                                    href: "https://web.facebook.com/profile.php?id=61587370073592",
                                    label: "Facebook",
                                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                },
                                {
                                    href: "https://www.instagram.com/timgift01/",
                                    label: "Instagram",
                                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                },
                                {
                                    href: "https://wa.me/2348090529117",
                                    label: "WhatsApp",
                                    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" /></svg>
                                },
                            ].map(({ href, label, icon }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                    style={{ width: "34px", height: "34px", borderRadius: "7px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "all 0.15s", textDecoration: "none" }}
                                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--primary)"; el.style.color = "var(--primary)"; el.style.backgroundColor = "var(--primary-bg)"; }}
                                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-muted)"; el.style.backgroundColor = "transparent"; }}>
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Shop</h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                            {[
                                { label: "All Products", href: "/products" },
                                { label: "In Stock", href: "/products?status=IN_STOCK" },
                                { label: "Pre-Order", href: "/products?status=PRE_ORDER" },
                                { label: "iPhone", href: "/products?category=IPHONE" },
                                { label: "MacBook", href: "/products?category=MACBOOK" },
                                { label: "Laptops", href: "/products?category=WINDOWS%20LAPTOPS" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company + Legal combined on mobile */}
                    <div>
                        <h3 style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Company</h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                            {[{ label: "About Us", href: "/about" }, { label: "Contact Us", href: "/contact" }].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h3 style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Legal</h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                            {[
                                { label: "Privacy Policy", href: "/privacy-policy" },
                                { label: "Refund Policy", href: "/refund-policy" },
                                { label: "Delivery Policy", href: "/delivery-policy" },
                                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Contact</h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                            <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
                                <span style={{ flexShrink: 0 }}>📍</span>
                                <span>Platinum Plaza<br /> Shop B09<br />7 Adepele Street<br />Ikeja Lagos</span>
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                                <span>📞</span>
                                <a href="tel:08090529117" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                                    08090529117
                                </a>
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                                <span>📞</span>
                                <a href="tel:08025510110" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                                    08025510110
                                </a>
                            </li>
                            <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                                <span>💬</span>
                                <a href="https://wa.me/2348090529117" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}>
                                    WhatsApp Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid var(--border)" }}>
                <div className="container" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
                    <div className="footer-bottom-bar">
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                            &copy; {currentYear} TIMGIFT01 TECHNOLOGIES. All rights reserved.
                        </p>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                            A product of Mofets Computers
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                /* Mobile: single column, brand full width */
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 28px;
                }
                .footer-brand {
                    grid-column: 1 / -1;
                }
                /* Tablet 768px+: 2 columns */
                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 32px;
                    }
                    .footer-brand {
                        grid-column: 1 / -1;
                    }
                }
                /* Desktop 1024px+: brand wide + 3 cols */
                @media (min-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: 2fr 1fr 1fr 1fr;
                    }
                    .footer-brand {
                        grid-column: auto;
                    }
                }

                /* Bottom bar: stack on mobile, row on md+ */
                .footer-bottom-bar {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 4px;
                }
                @media (min-width: 640px) {
                    .footer-bottom-bar {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
            `}</style>
        </footer>
    );
}
