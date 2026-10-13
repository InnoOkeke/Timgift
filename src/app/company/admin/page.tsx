"use client";

import { useState, useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";

interface Product {
    id: number;
    stockQuantity: number;
}

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    media?: { url: string }[];
}

interface Order {
    id: number;
    customerName: string;
    customerPhone: string;
    customerAddress?: string;
    status: string;
    totalAmount: number;
    items?: OrderItem[];
    createdAt: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        completedOrders: 0,
        totalProducts: 0,
        totalOrdersCount: 0,
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsRes, ordersRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/orders')
                ]);

                if (productsRes.ok && ordersRes.ok) {
                    const products: Product[] = await productsRes.json();
                    const orders: Order[] = await ordersRes.json();

                    const activeOrders = orders.filter((o) => o.status === 'PENDING').length;
                    const completedOrders = orders.filter((o) => o.status === 'COMPLETED').length;
                    const totalSales = orders
                        .filter((o) => o.status === 'COMPLETED')
                        .reduce((acc, o) => acc + o.totalAmount, 0);

                    const totalInventory = products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);

                    setStats({
                        totalSales,
                        activeOrders,
                        completedOrders,
                        totalProducts: totalInventory,
                        totalOrdersCount: orders.length,
                    });
                    setRecentOrders(orders.slice(0, 8));
                }
            } catch (error) {
                console.error("Dashboard Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getInitials = (name: string) => {
        if (!name) return "TG";
        return name
            .split(" ")
            .map((n) => n[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
            <AdminNavbar />

            <main
                className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8"
                style={{ maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}
            >
                {/* Executive Header */}
                <header
                    style={{
                        marginBottom: "32px",
                        paddingBottom: "24px",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                        <div>
                            {/* Eyebrow Status Pill */}
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                                <span
                                    style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "9999px",
                                        backgroundColor: "#16A34A",
                                        display: "inline-block",
                                        boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.2)",
                                        flexShrink: 0
                                    }}
                                />
                                <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#16A34A" }}>
                                    Operations Headquarters
                                </span>
                                <span style={{ color: "var(--border-strong)", fontSize: "11px" }}>•</span>
                                <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>
                                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>

                            <h1
                                style={{
                                    fontSize: "26px",
                                    fontWeight: "900",
                                    letterSpacing: "-0.03em",
                                    color: "var(--text)",
                                    fontFamily: "var(--font-display)",
                                    margin: "0 0 6px 0"
                                }}
                            >
                                Executive Dashboard
                            </h1>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, maxWidth: "620px" }}>
                                Store overview, revenue analytics, inventory levels, and active fulfillment requests.
                            </p>
                        </div>

                        {/* Top Header Actions (Executive-Tier Buttons) */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                            {/* Add Product Button (Primary Luxury Emerald) */}
                            <Link
                                href="/company/admin/products/new"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    height: "42px",
                                    padding: "0 18px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    letterSpacing: "-0.01em",
                                    color: "#FFFFFF",
                                    background: "linear-gradient(180deg, #16A34A 0%, #15803D 100%)",
                                    border: "1px solid rgba(22, 163, 74, 0.9)",
                                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px -1px rgba(22, 163, 74, 0.38), 0 1px 2px rgba(0, 0, 0, 0.06)",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                                    userSelect: "none"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 18px -1px rgba(22, 163, 74, 0.45)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px -1px rgba(22, 163, 74, 0.38), 0 1px 2px rgba(0, 0, 0, 0.06)";
                                }}
                            >
                                <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Product</span>
                            </Link>

                            {/* Orders Queue Button (Secondary Luxury Frosted Glass with Live Badge) */}
                            <Link
                                href="/company/admin/orders"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    height: "42px",
                                    padding: "0 18px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    letterSpacing: "-0.01em",
                                    color: "var(--text)",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                                    userSelect: "none"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                                }}
                            >
                                <svg style={{ width: "16px", height: "16px", flexShrink: 0, color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span>Orders Queue</span>
                                {stats.activeOrders > 0 && (
                                    <span
                                        style={{
                                            marginLeft: "2px",
                                            padding: "2px 7px",
                                            borderRadius: "9999px",
                                            fontSize: "10px",
                                            fontWeight: "800",
                                            backgroundColor: "rgba(234, 179, 8, 0.15)",
                                            color: "#D97706",
                                            border: "1px solid rgba(234, 179, 8, 0.3)"
                                        }}
                                    >
                                        {stats.activeOrders}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ height: "140px", borderRadius: "18px", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }} />
                            ))}
                        </div>
                        <div style={{ height: "320px", borderRadius: "18px", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }} />
                    </div>
                ) : (
                    <>
                        {/* Luxury KPI Metrics Cards */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: "16px",
                                marginBottom: "32px"
                            }}
                        >
                            {/* Card 1: Total Revenue */}
                            <div
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    padding: "20px 22px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)"
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "3.5px",
                                        background: "linear-gradient(90deg, #10B981 0%, #059669 60%, #14B8A6 100%)"
                                    }}
                                />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                        Realized Revenue
                                    </span>
                                    <div
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                                            border: "1px solid rgba(16, 185, 129, 0.25)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg style={{ width: "18px", height: "18px", color: "#10B981" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        fontSize: "26px",
                                        fontWeight: "900",
                                        lineHeight: "1.1",
                                        marginTop: "14px",
                                        marginBottom: "10px",
                                        color: "var(--text)",
                                        fontFamily: "var(--font-display)",
                                        letterSpacing: "-0.03em"
                                    }}
                                >
                                    ₦{stats.totalSales.toLocaleString()}
                                </div>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "3px 9px",
                                        borderRadius: "9999px",
                                        backgroundColor: "rgba(16, 185, 129, 0.08)",
                                        border: "1px solid rgba(16, 185, 129, 0.2)"
                                    }}
                                >
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#10B981" }}>
                                        {stats.completedOrders} completed orders
                                    </span>
                                </div>
                            </div>

                            {/* Card 2: Pending Orders (Interactive Tile) */}
                            <Link
                                href="/company/admin/orders"
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    padding: "20px 22px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)",
                                    textDecoration: "none",
                                    display: "block",
                                    transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px -2px rgba(245, 158, 11, 0.25)";
                                    e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)";
                                    e.currentTarget.style.borderColor = "var(--border)";
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "3.5px",
                                        background: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)"
                                    }}
                                />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                        Pending Orders
                                    </span>
                                    <div
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            backgroundColor: "rgba(245, 158, 11, 0.1)",
                                            border: "1px solid rgba(245, 158, 11, 0.25)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg style={{ width: "18px", height: "18px", color: "#F59E0B" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        fontSize: "30px",
                                        fontWeight: "900",
                                        lineHeight: "1.1",
                                        marginTop: "14px",
                                        marginBottom: "10px",
                                        color: "#D97706",
                                        fontFamily: "var(--font-display)",
                                        letterSpacing: "-0.03em"
                                    }}
                                >
                                    {stats.activeOrders}
                                </div>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "3px 9px",
                                        borderRadius: "9999px",
                                        backgroundColor: "rgba(245, 158, 11, 0.08)",
                                        border: "1px solid rgba(245, 158, 11, 0.2)"
                                    }}
                                >
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#D97706" }}>
                                        {stats.activeOrders > 0 ? "Awaiting customer dispatch" : "All orders fulfilled"}
                                    </span>
                                </div>
                            </Link>

                            {/* Card 3: Completed Orders */}
                            <div
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    padding: "20px 22px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)"
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "3.5px",
                                        background: "linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)"
                                    }}
                                />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                        Completed Deliveries
                                    </span>
                                    <div
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                                            border: "1px solid rgba(59, 130, 246, 0.25)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg style={{ width: "18px", height: "18px", color: "#3B82F6" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        fontSize: "30px",
                                        fontWeight: "900",
                                        lineHeight: "1.1",
                                        marginTop: "14px",
                                        marginBottom: "10px",
                                        color: "var(--text)",
                                        fontFamily: "var(--font-display)",
                                        letterSpacing: "-0.03em"
                                    }}
                                >
                                    {stats.completedOrders}
                                </div>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "3px 9px",
                                        borderRadius: "9999px",
                                        backgroundColor: "rgba(59, 130, 246, 0.08)",
                                        border: "1px solid rgba(59, 130, 246, 0.2)"
                                    }}
                                >
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#3B82F6" }}>
                                        Out of {stats.totalOrdersCount} total orders
                                    </span>
                                </div>
                            </div>

                            {/* Card 4: Total Gadgets in Stock (Interactive Tile) */}
                            <Link
                                href="/company/admin/products"
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    padding: "20px 22px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)",
                                    textDecoration: "none",
                                    display: "block",
                                    transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px -2px rgba(139, 92, 246, 0.25)";
                                    e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)";
                                    e.currentTarget.style.borderColor = "var(--border)";
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "3.5px",
                                        background: "linear-gradient(90deg, #8B5CF6 0%, #A855F7 100%)"
                                    }}
                                />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                        Catalog Inventory
                                    </span>
                                    <div
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            backgroundColor: "rgba(139, 92, 246, 0.1)",
                                            border: "1px solid rgba(139, 92, 246, 0.25)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg style={{ width: "18px", height: "18px", color: "#8B5CF6" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        fontSize: "30px",
                                        fontWeight: "900",
                                        lineHeight: "1.1",
                                        marginTop: "14px",
                                        marginBottom: "10px",
                                        color: "var(--text)",
                                        fontFamily: "var(--font-display)",
                                        letterSpacing: "-0.03em"
                                    }}
                                >
                                    {stats.totalProducts}
                                </div>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "3px 9px",
                                        borderRadius: "9999px",
                                        backgroundColor: "rgba(139, 92, 246, 0.08)",
                                        border: "1px solid rgba(139, 92, 246, 0.2)"
                                    }}
                                >
                                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#8B5CF6" }}>
                                        Units in stock • Manage
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Recent Orders Queue Section */}
                        <div
                            style={{
                                borderRadius: "18px",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--bg-secondary)",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03), 0 8px 24px -4px rgba(0, 0, 0, 0.02)",
                                overflow: "hidden"
                            }}
                        >
                            <div
                                style={{
                                    padding: "18px 24px",
                                    borderBottom: "1px solid var(--border)",
                                    backgroundColor: "var(--bg)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    gap: "12px"
                                }}
                            >
                                <div>
                                    <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#16A34A", display: "inline-block", flexShrink: 0 }} />
                                        Recent Orders Queue
                                    </h2>
                                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "3px 0 0 0" }}>
                                        Live transactions and customer shipment requests
                                    </p>
                                </div>
                                <Link
                                    href="/company/admin/orders"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        height: "34px",
                                        padding: "0 14px",
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        backgroundColor: "rgba(22, 163, 74, 0.1)",
                                        color: "#16A34A",
                                        border: "1px solid rgba(22, 163, 74, 0.25)",
                                        textDecoration: "none",
                                        transition: "all 0.15s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#16A34A";
                                        e.currentTarget.style.color = "#FFFFFF";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(22, 163, 74, 0.1)";
                                        e.currentTarget.style.color = "#16A34A";
                                    }}
                                >
                                    <span>View full queue</span>
                                    <span>→</span>
                                </Link>
                            </div>

                            {recentOrders.length === 0 ? (
                                <div style={{ padding: "64px 20px", textAlign: "center" }}>
                                    <div
                                        style={{
                                            width: "56px",
                                            height: "56px",
                                            margin: "0 auto 14px auto",
                                            borderRadius: "16px",
                                            backgroundColor: "var(--bg)",
                                            border: "1px solid var(--border)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "var(--text-muted)"
                                        }}
                                    >
                                        <svg style={{ width: "24px", height: "24px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-muted)", margin: 0 }}>
                                        No customer orders recorded yet.
                                    </p>
                                </div>
                            ) : (
                                <div style={{ overflowX: "auto" }}>
                                    <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "860px" }}>
                                        <thead>
                                            <tr
                                                style={{
                                                    backgroundColor: "var(--bg)",
                                                    borderBottom: "1px solid var(--border)"
                                                }}
                                            >
                                                <th style={{ padding: "12px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>Customer</th>
                                                <th style={{ padding: "12px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>Phone & WhatsApp</th>
                                                <th style={{ padding: "12px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>Total Paid</th>
                                                <th style={{ padding: "12px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>Status</th>
                                                <th style={{ padding: "12px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>Date</th>
                                                <th style={{ padding: "12px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", textAlign: "right" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map((order) => {
                                                const isCompleted = order.status === 'COMPLETED';
                                                return (
                                                    <tr
                                                        key={order.id}
                                                        style={{
                                                            borderBottom: "1px solid var(--border)",
                                                            transition: "background-color 0.15s ease"
                                                        }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                    >
                                                        <td style={{ padding: "16px 20px" }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                                <div
                                                                    style={{
                                                                        width: "38px",
                                                                        height: "38px",
                                                                        borderRadius: "11px",
                                                                        background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                                                                        color: "#FFFFFF",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        fontSize: "12px",
                                                                        fontWeight: "900",
                                                                        flexShrink: 0,
                                                                        boxShadow: "0 2px 6px rgba(22, 163, 74, 0.25)"
                                                                    }}
                                                                >
                                                                    {getInitials(order.customerName)}
                                                                </div>
                                                                <div style={{ minWidth: 0 }}>
                                                                    <span style={{ fontSize: "13px", fontWeight: "800", color: "var(--text)", display: "block" }}>
                                                                        {order.customerName}
                                                                    </span>
                                                                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                                                                        Order #{order.id}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: "16px 20px" }}>
                                                            <a
                                                                href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                style={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: "5px",
                                                                    fontSize: "12px",
                                                                    fontWeight: "700",
                                                                    color: "#16A34A",
                                                                    textDecoration: "none"
                                                                }}
                                                            >
                                                                <span>{order.customerPhone}</span>
                                                            </a>
                                                        </td>
                                                        <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                                                            <span style={{ fontSize: "15px", fontWeight: "900", color: "var(--text)", fontFamily: "var(--font-display)" }}>
                                                                ₦{order.totalAmount.toLocaleString()}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                                                            <span
                                                                style={{
                                                                    fontSize: "11px",
                                                                    fontWeight: "800",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.06em",
                                                                    padding: "4px 10px",
                                                                    borderRadius: "8px",
                                                                    backgroundColor: isCompleted ? "rgba(22, 163, 74, 0.12)" : "rgba(217, 119, 6, 0.12)",
                                                                    color: isCompleted ? "#16A34A" : "#D97706",
                                                                    border: `1px solid ${isCompleted ? "rgba(22, 163, 74, 0.25)" : "rgba(217, 119, 6, 0.25)"}`
                                                                }}
                                                            >
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                                                            <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)" }}>
                                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: "16px 20px", textAlign: "right", whiteSpace: "nowrap" }}>
                                                            <Link
                                                                href="/company/admin/orders"
                                                                style={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    height: "32px",
                                                                    padding: "0 12px",
                                                                    borderRadius: "9px",
                                                                    fontSize: "12px",
                                                                    fontWeight: "700",
                                                                    border: "1px solid var(--border)",
                                                                    backgroundColor: "var(--bg)",
                                                                    color: "var(--text)",
                                                                    textDecoration: "none",
                                                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
                                                                    transition: "all 0.15s ease"
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                                                                    e.currentTarget.style.borderColor = "var(--border-strong)";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = "var(--bg)";
                                                                    e.currentTarget.style.borderColor = "var(--border)";
                                                                }}
                                                            >
                                                                Manage
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
