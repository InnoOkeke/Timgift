"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(path);
    };

    const navItems = [
        {
            href: "/admin",
            label: "Dashboard",
            description: "Analytics & metrics",
            icon: (
                <svg width="18" height="18" style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            href: "/admin/products",
            label: "Products",
            description: "Inventory catalog",
            icon: (
                <svg width="18" height="18" style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            href: "/admin/orders",
            label: "Orders",
            description: "Sales & fulfillment",
            icon: (
                <svg width="18" height="18" style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
    ];

    return (
        <aside
            className="w-64 fixed left-0 top-0 bottom-0 h-screen border-r flex flex-col justify-between select-none z-50 shadow-sm"
            style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
            }}
        >
            {/* Top Brand Header */}
            <div className="shrink-0">
                <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                    <Link href="/admin" className="flex items-center gap-2.5">
                        <Logo tagline="Admin Console" variant="custom" />
                    </Link>
                </div>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                <div>
                    <div className="flex items-center justify-between px-2.5 mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
                            Navigation
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live
                        </span>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                                        active
                                            ? "shadow-sm font-semibold"
                                            : "opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                                    }`}
                                    style={{
                                        backgroundColor: active ? "var(--primary)" : "transparent",
                                        color: active ? "#FFFFFF" : "var(--text)",
                                    }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{
                                            backgroundColor: active ? "rgba(255, 255, 255, 0.2)" : "var(--bg-secondary)",
                                            color: active ? "#FFFFFF" : "var(--text-secondary)",
                                            border: active ? "none" : "1px solid var(--border)"
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold tracking-tight truncate leading-tight">
                                            {item.label}
                                        </span>
                                        <span
                                            className="text-[10px] font-normal truncate mt-0.5"
                                            style={{ color: active ? "rgba(255, 255, 255, 0.8)" : "var(--text-muted)" }}
                                        >
                                            {item.description}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Bottom Actions & User Profile */}
            <div className="p-3 border-t shrink-0 space-y-2.5" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                {/* Admin Status Pill */}
                <div
                    className="p-2.5 rounded-xl border flex items-center gap-2.5"
                    style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border)"
                    }}
                >
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-[10px] text-white shrink-0 shadow-xs"
                        style={{
                            background: "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)"
                        }}
                    >
                        TG
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold truncate leading-tight" style={{ color: "var(--text)" }}>
                            Store Manager
                        </p>
                        <p className="text-[10px] truncate text-emerald-600 dark:text-emerald-400 font-medium">
                            ● Authenticated
                        </p>
                    </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Return to Storefront Button */}
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                        style={{
                            borderColor: "var(--border)",
                            backgroundColor: "var(--bg-secondary)",
                            color: "var(--text)"
                        }}
                        title="View Public Store"
                    >
                        <svg width="14" height="14" style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Storefront</span>
                    </Link>

                    {/* Sign Out Button */}
                    <button
                        onClick={async () => {
                            await fetch('/api/admin/logout', { method: 'POST' });
                            window.location.href = '/admin/login';
                        }}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all active:scale-95"
                        title="End Admin Session"
                    >
                        <svg width="14" height="14" style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}



