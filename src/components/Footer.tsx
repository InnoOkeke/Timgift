"use client";

import Link from "next/link";
import Logo from "./Logo";

const CATEGORIES = ["SMARTPHONES", "SMARTWATCHES", "COMPUTERS", "SMART GADGETS"];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-y-12 lg:gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-start text-left">
                        <Link href="/" className="mb-6">
                            <Logo variant="footer" />
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                            Your trusted source for quality new and gently used electronics at wholesale prices.
                            Amazing deals delivered nationwide.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://web.facebook.com/profile.php?id=61587370073592"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center transition-colors hover:scale-105"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "8px",
                                    backgroundColor: "var(--bg)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text)"
                                }}
                                title="Facebook"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/timgift01/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center transition-colors hover:scale-105"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "8px",
                                    backgroundColor: "var(--bg)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text)"
                                }}
                                title="Instagram"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col items-start text-left">
                        <h3 className="font-semibold mb-5 text-base" style={{ color: "var(--text)" }}>Categories</h3>
                        <ul className="space-y-3 w-full" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {CATEGORIES.map((cat) => (
                                <li key={cat}>
                                    <Link
                                        href={`/products?category=${encodeURIComponent(cat)}`}
                                        className="text-sm transition-colors hover:text-primary hover:pl-1 block"
                                        style={{ color: "var(--text-secondary)", transition: "all 0.2s" }}
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-start text-left">
                        <h3 className="font-semibold mb-5 text-base" style={{ color: "var(--text)" }}>Quick Links</h3>
                        <ul className="space-y-3 w-full" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {[
                                { label: "All Products", href: "/products" },
                                { label: "Pre-Order", href: "/products?status=PRE_ORDER" },
                                { label: "About Us", href: "/about" },
                                { label: "Contact Us", href: "/contact" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors hover:text-primary hover:pl-1 block"
                                        style={{ color: "var(--text-secondary)", transition: "all 0.2s" }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-start text-left">
                        <h3 className="font-semibold mb-5 text-base" style={{ color: "var(--text)" }}>Contact Us</h3>
                        <ul className="space-y-4 w-full" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            <li className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <span className="mt-0.5">📍</span>
                                <span className="flex-1">5, Oshitelu St, GTBank Plaza, Ikeja Lagos</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <span>📞</span>
                                <a href="tel:08090529117" className="transition-colors hover:text-primary">
                                    08090529117
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                                <span>💬</span>
                                <a href="https://wa.me/2348090529117" className="transition-colors hover:text-primary">
                                    WhatsApp Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ borderTop: "1px solid var(--border)" }}>
                <div className="container py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            © {currentYear} TIMGIFT01 TECHNOLOGIES. All rights reserved.
                        </p>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            Premium Gadgets Store
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
