"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // Close mobile drawer on route change
    useEffect(() => {
        setMobileDrawerOpen(false);
    }, [pathname]);

    // Prevent background scrolling when mobile drawer is open
    useEffect(() => {
        if (mobileDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileDrawerOpen]);

    const isActive = (path: string) => {
        if (path === "/company/admin") return pathname === "/company/admin";
        return pathname.startsWith(path);
    };

    const navItems = [
        {
            href: "/company/admin",
            label: "Dashboard",
            description: "Analytics & metrics",
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
        },
        {
            href: "/company/admin/products",
            label: "Products",
            description: "Inventory catalog",
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            href: "/company/admin/orders",
            label: "Orders",
            description: "Sales & fulfillment",
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
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
            {/* ========================================================= */}
            {/* 1. MOBILE TOP HEADER (VISIBLE ON MOBILE ONLY)            */}
            {/* ========================================================= */}
            <header
                className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b z-40 px-4 flex items-center justify-between backdrop-blur-xl"
                style={{
                    backgroundColor: "rgba(var(--bg-rgb, 255, 255, 255), 0.88)",
                    borderColor: "var(--border)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
                }}
            >
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setMobileDrawerOpen(true)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all active:scale-95"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border)",
                            color: "var(--text)"
                        }}
                        aria-label="Open Navigation Menu"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Link href="/company/admin" className="flex items-center">
                        <Logo tagline="Admin Console" variant="custom" />
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/company/admin/products/new"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all active:scale-95"
                        style={{ backgroundColor: "var(--primary)" }}
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden xs:inline">Add</span>
                    </Link>
                    <Link
                        href="/"
                        className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all active:scale-95"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border)",
                            color: "var(--text-secondary)"
                        }}
                        title="View Storefront"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                </div>
            </header>

            {/* ========================================================= */}
            {/* 2. MOBILE OFF-CANVAS DRAWER                               */}
            {/* ========================================================= */}
            {mobileDrawerOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileDrawerOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Drawer Content */}
                    <div
                        className="relative w-[85%] max-w-xs h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-200"
                        style={{
                            backgroundColor: "var(--bg)",
                            borderColor: "var(--border)",
                            borderRightWidth: "1px"
                        }}
                    >
                        {/* Drawer Header */}
                        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                            <Logo tagline="Admin Console" variant="custom" />
                            <button
                                onClick={() => setMobileDrawerOpen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center border opacity-70 hover:opacity-100"
                                style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                aria-label="Close menu"
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation items */}
                        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
                            <div className="flex items-center justify-between px-2 mb-3">
                                <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
                                    Management Menu
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                    Live
                                </span>
                            </div>

                            {navItems.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileDrawerOpen(false)}
                                        className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all ${
                                            active ? "shadow-sm font-bold" : "hover:bg-black/5 dark:hover:bg-white/5"
                                        }`}
                                        style={{
                                            backgroundColor: active ? "var(--primary)" : "transparent",
                                            color: active ? "#fff" : "var(--text)",
                                        }}
                                    >
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                            style={{
                                                backgroundColor: active ? "rgba(255,255,255,0.2)" : "var(--bg-secondary)",
                                                color: active ? "#fff" : "var(--text-secondary)",
                                                border: active ? "none" : "1px solid var(--border)",
                                            }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-bold truncate leading-tight">
                                                {item.label}
                                            </span>
                                            <span
                                                className="text-[11px] truncate mt-0.5"
                                                style={{ color: active ? "rgba(255,255,255,0.75)" : "var(--text-muted)" }}
                                            >
                                                {item.description}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}

                            {/* Quick Add Product in drawer */}
                            <div className="pt-2">
                                <Link
                                    href="/company/admin/products/new"
                                    onClick={() => setMobileDrawerOpen(false)}
                                    className="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl border transition-all active:scale-95"
                                    style={{
                                        borderColor: "var(--border)",
                                        backgroundColor: "var(--bg-secondary)",
                                        color: "var(--text)"
                                    }}
                                >
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
                                        style={{ backgroundColor: "var(--primary)" }}
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-bold truncate leading-tight">
                                            Add New Product
                                        </span>
                                        <span className="text-[11px] truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                                            Publish gadget to storefront
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Drawer Bottom Actions */}
                        <div className="p-4 border-t space-y-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                            <div
                                className="flex items-center gap-3 p-3 rounded-2xl border"
                                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                            >
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                                    style={{ background: "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)" }}
                                >
                                    TG
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>Store Administrator</p>
                                    <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">● Session Active</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    href="/"
                                    onClick={() => setMobileDrawerOpen(false)}
                                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all"
                                    style={{
                                        borderColor: "var(--border)",
                                        backgroundColor: "var(--bg-secondary)",
                                        color: "var(--text)",
                                    }}
                                >
                                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Storefront</span>
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border"
                                    style={{
                                        color: "#EF4444",
                                        backgroundColor: "rgba(239,68,68,0.08)",
                                        borderColor: "rgba(239,68,68,0.2)",
                                    }}
                                >
                                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* 3. MOBILE BOTTOM QUICK NAVIGATION BAR                     */}
            {/* ========================================================= */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t z-40 px-3 flex items-center justify-around backdrop-blur-xl"
                style={{
                    backgroundColor: "rgba(var(--bg-rgb, 255, 255, 255), 0.94)",
                    borderColor: "var(--border)",
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.04)"
                }}
            >
                {/* Dashboard Tab */}
                <Link
                    href="/company/admin"
                    className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                        isActive("/company/admin") && pathname === "/company/admin" ? "font-bold" : "opacity-60"
                    }`}
                    style={{ color: isActive("/company/admin") && pathname === "/company/admin" ? "var(--primary)" : "var(--text)" }}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/company/admin") && pathname === "/company/admin" ? 2.2 : 1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Overview</span>
                </Link>

                {/* Products Tab */}
                <Link
                    href="/company/admin/products"
                    className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                        isActive("/company/admin/products") && pathname !== "/company/admin/products/new" ? "font-bold" : "opacity-60"
                    }`}
                    style={{
                        color: isActive("/company/admin/products") && pathname !== "/company/admin/products/new" ? "var(--primary)" : "var(--text)"
                    }}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/company/admin/products") && pathname !== "/company/admin/products/new" ? 2.2 : 1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Products</span>
                </Link>

                {/* Center "+ Add Product" Quick Action Button */}
                <div className="flex-1 flex justify-center -mt-5">
                    <Link
                        href="/company/admin/products/new"
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                        style={{
                            background: "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)",
                            boxShadow: "0 4px 14px rgba(22, 163, 74, 0.45)"
                        }}
                        title="Add New Product"
                    >
                        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.75} d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>

                {/* Orders Tab */}
                <Link
                    href="/company/admin/orders"
                    className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                        isActive("/company/admin/orders") ? "font-bold" : "opacity-60"
                    }`}
                    style={{ color: isActive("/company/admin/orders") ? "var(--primary)" : "var(--text)" }}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/company/admin/orders") ? 2.2 : 1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Orders</span>
                </Link>

                {/* Storefront Tab */}
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center flex-1 py-1 transition-all opacity-60 hover:opacity-100"
                    style={{ color: "var(--text)" }}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-[10px] mt-0.5">Store</span>
                </Link>
            </nav>

            {/* ========================================================= */}
            {/* 4. DESKTOP PERMANENT SIDEBAR (VISIBLE ON LG AND UP)       */}
            {/* ========================================================= */}
            <aside
                className="hidden lg:flex w-64 fixed left-0 top-0 bottom-0 h-screen border-r flex-col select-none z-30"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
            >
                {/* Brand header */}
                <div className="shrink-0 px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
                    <Link href="/company/admin" className="flex items-center gap-2.5">
                        <Logo tagline="Admin Console" variant="custom" />
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-3.5 py-5">
                    {/* Section label */}
                    <div className="flex items-center justify-between px-2 mb-3">
                        <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
                            Navigation
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            Live
                        </span>
                    </div>

                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                                        active
                                            ? "shadow-sm font-semibold"
                                            : "hover:bg-black/5 dark:hover:bg-white/5"
                                    }`}
                                    style={{
                                        backgroundColor: active ? "var(--primary)" : "transparent",
                                        color: active ? "#fff" : "var(--text)",
                                    }}
                                >
                                    {/* Icon box */}
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{
                                            backgroundColor: active ? "rgba(255,255,255,0.2)" : "var(--bg-secondary)",
                                            color: active ? "#fff" : "var(--text-secondary)",
                                            border: active ? "none" : "1px solid var(--border)",
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Label + description */}
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold truncate leading-tight">
                                            {item.label}
                                        </span>
                                        <span
                                            className="text-[10px] truncate mt-0.5"
                                            style={{ color: active ? "rgba(255,255,255,0.75)" : "var(--text-muted)" }}
                                        >
                                            {item.description}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Quick Add Product Button in desktop sidebar */}
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                        <Link
                            href="/company/admin/products/new"
                            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white shadow-sm transition-all active:scale-95"
                            style={{
                                background: "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)",
                                boxShadow: "0 4px 12px -2px rgba(22, 163, 74, 0.35)"
                            }}
                        >
                            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add New Product</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom panel */}
                <div
                    className="shrink-0 p-3.5 border-t space-y-2.5"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                >
                    {/* Admin identity pill */}
                    <div
                        className="flex items-center gap-2.5 p-2.5 rounded-xl border"
                        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-extrabold text-white shrink-0"
                            style={{ background: "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)" }}
                        >
                            TG
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold truncate leading-tight" style={{ color: "var(--text)" }}>
                                Store Manager
                            </p>
                            <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 truncate">
                                ● Authenticated
                            </p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                            style={{
                                borderColor: "var(--border)",
                                backgroundColor: "var(--bg-secondary)",
                                color: "var(--text)",
                            }}
                            title="View Public Store"
                        >
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Store</span>
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 border"
                            style={{
                                color: "#EF4444",
                                backgroundColor: "rgba(239,68,68,0.08)",
                                borderColor: "rgba(239,68,68,0.2)",
                            }}
                            title="End Admin Session"
                        >
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
