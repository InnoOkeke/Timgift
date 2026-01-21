"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: "📊" },
        { href: "/admin/products", label: "Products", icon: "📱" },
        { href: "/admin/orders", label: "Orders", icon: "🛒" },
    ];

    return (
        <aside
            className="w-72 fixed left-0 top-0 h-screen border-r overflow-y-auto"
            style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                zIndex: 100
            }}
        >
            <div className="p-8">
                {/* Frontend Consistent Logo */}
                <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                    <Logo tagline="Admin Portal" />
                </Link>
            </div>

            <div className="px-6 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 px-4" style={{ color: "var(--text-muted)" }}>
                    Management
                </p>
                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${active ? 'font-bold' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'
                                    }`}
                                style={{
                                    backgroundColor: active ? "var(--bg-secondary)" : "transparent",
                                    color: active ? "var(--primary)" : "var(--text-secondary)",
                                    border: active ? "1px solid var(--border)" : "1px solid transparent",
                                    boxShadow: active ? "var(--shadow-sm)" : "none"
                                }}
                            >
                                <span className="text-xl filter drop-shadow-sm">{item.icon}</span>
                                <span className="tracking-tight">{item.label}</span>
                                {active && (
                                    <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: "var(--primary)" }}></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="absolute bottom-8 left-6 right-6 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                <button
                    onClick={async () => {
                        await fetch('/api/admin/logout', { method: 'POST' });
                        window.location.href = '/admin/login';
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold group"
                >
                    <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
                    <span>Logout Session</span>
                </button>

                <Link
                    href="/"
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl opacity-60 hover:opacity-100 transition-all text-xs font-medium"
                    style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-secondary)" }}
                >
                    <span>←</span>
                    <span>Return to Storefront</span>
                </Link>
            </div>
        </aside>
    );
}
