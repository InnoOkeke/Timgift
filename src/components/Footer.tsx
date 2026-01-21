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
                            <Logo variant="dark" />
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                            Your trusted source for quality new and gently used electronics at wholesale prices.
                            Amazing deals delivered nationwide.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="#"
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
                                href="#"
                                className="flex items-center justify-center transition-colors hover:scale-105"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "8px",
                                    backgroundColor: "var(--bg)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text)"
                                }}
                                title="X (Twitter)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                </svg>
                            </a>
                            <a
                                href="#"
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
                            <a
                                href="https://wa.me/2348090529117"
                                className="flex items-center justify-center transition-colors hover:scale-105"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "8px",
                                    backgroundColor: "var(--bg)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text)"
                                }}
                                title="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
