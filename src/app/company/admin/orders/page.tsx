"use client";

import { useState, useEffect, useMemo } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import { Order } from "@/types";

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setRefreshing(true);
        try {
            const res = await fetch('/api/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Fetch Orders Error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                !searchTerm ||
                order.customerName?.toLowerCase().includes(searchLower) ||
                order.customerPhone?.toLowerCase().includes(searchLower) ||
                order.customerAddress?.toLowerCase().includes(searchLower) ||
                order.items?.some(i => i.name.toLowerCase().includes(searchLower));

            return matchesStatus && matchesSearch;
        });
    }, [orders, statusFilter, searchTerm]);

    const counts = useMemo(() => {
        const pending = orders.filter(o => o.status === 'PENDING').length;
        const completed = orders.filter(o => o.status === 'COMPLETED').length;
        const cancelled = orders.filter(o => o.status === 'CANCELLED').length;
        const totalSales = orders
            .filter(o => o.status === 'COMPLETED')
            .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        return {
            all: orders.length,
            pending,
            completed,
            cancelled,
            totalSales,
        };
    }, [orders]);

    const getStatusTheme = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return {
                    color: '#16A34A',
                    bg: 'rgba(22, 163, 74, 0.1)',
                    border: 'rgba(22, 163, 74, 0.25)',
                    label: 'Completed'
                };
            case 'CANCELLED':
                return {
                    color: '#DC2626',
                    bg: 'rgba(220, 38, 38, 0.1)',
                    border: 'rgba(220, 38, 38, 0.25)',
                    label: 'Cancelled'
                };
            default:
                return {
                    color: '#D97706',
                    bg: 'rgba(217, 119, 6, 0.12)',
                    border: 'rgba(217, 119, 6, 0.25)',
                    label: 'Pending'
                };
        }
    };

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
                className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-16"
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
                            {/* Eyebrow Live Status Pill */}
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
                                    Fulfillment & Dispatch
                                </span>
                                <span style={{ color: "var(--border-strong)", fontSize: "11px" }}>•</span>
                                <span
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: "700",
                                        padding: "2px 8px",
                                        borderRadius: "9999px",
                                        backgroundColor: "rgba(22, 163, 74, 0.1)",
                                        color: "#16A34A",
                                        border: "1px solid rgba(22, 163, 74, 0.2)"
                                    }}
                                >
                                    {orders.length} Total Orders
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
                                Order Management
                            </h1>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, maxWidth: "620px" }}>
                                Review customer orders, inspect buyer contact details, verify payments, and update dispatch fulfillment status.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <button
                                type="button"
                                onClick={fetchOrders}
                                disabled={refreshing}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    height: "42px",
                                    padding: "0 18px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--bg-secondary)",
                                    color: "var(--text)",
                                    cursor: refreshing ? "not-allowed" : "pointer",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                                    transition: "all 0.15s ease",
                                    userSelect: "none"
                                }}
                                onMouseEnter={(e) => {
                                    if (!refreshing) e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                                }}
                                onMouseLeave={(e) => {
                                    if (!refreshing) e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                                }}
                            >
                                <svg
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        animation: refreshing ? "spin 1s linear infinite" : "none"
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>{refreshing ? "Refreshing..." : "Refresh Queue"}</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Luxury KPI Metrics Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "16px",
                        marginBottom: "32px"
                    }}
                >
                    {/* Card 1: Total Orders */}
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
                                Total Orders
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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
                            {counts.all}
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
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#10B981" }}>Lifetime recorded</span>
                        </div>
                    </div>

                    {/* Card 2: Pending Action */}
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
                                background: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)"
                            }}
                        />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                Pending Action
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                            {counts.pending}
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
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#D97706" }}>Awaiting fulfillment</span>
                        </div>
                    </div>

                    {/* Card 3: Completed */}
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
                                background: "linear-gradient(90deg, #10B981 0%, #047857 100%)"
                            }}
                        />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                Completed
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
                                color: "#16A34A",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.03em"
                            }}
                        >
                            {counts.completed}
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
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#16A34A" }}>Dispatched & delivered</span>
                        </div>
                    </div>

                    {/* Card 4: Settled Revenue Volume */}
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
                                background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 60%, #EC4899 100%)"
                            }}
                        />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                Settled Revenue
                            </span>
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                                    border: "1px solid rgba(99, 102, 241, 0.25)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}
                            >
                                <svg style={{ width: "18px", height: "18px", color: "#6366F1" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            ₦{counts.totalSales.toLocaleString()}
                        </div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "3px 9px",
                                borderRadius: "9999px",
                                backgroundColor: "rgba(99, 102, 241, 0.08)",
                                border: "1px solid rgba(99, 102, 241, 0.2)"
                            }}
                        >
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#6366F1" }}>From completed orders</span>
                        </div>
                    </div>
                </div>

                {/* Filter Controls & Search Bar */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "16px",
                        marginBottom: "24px"
                    }}
                >
                    {/* Status Tabs Capsule */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            height: "44px",
                            padding: "4px",
                            borderRadius: "14px",
                            border: "1px solid var(--border)",
                            backgroundColor: "var(--bg-secondary)",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
                            gap: "4px",
                            overflowX: "auto",
                            maxWidth: "100%"
                        }}
                    >
                        {[
                            { id: "ALL", label: "All Orders", count: counts.all },
                            { id: "PENDING", label: "Pending", count: counts.pending },
                            { id: "COMPLETED", label: "Completed", count: counts.completed },
                            { id: "CANCELLED", label: "Cancelled", count: counts.cancelled },
                        ].map((tab) => {
                            const isSelected = statusFilter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setStatusFilter(tab.id)}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        height: "36px",
                                        padding: "0 14px",
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                        whiteSpace: "nowrap",
                                        color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                                        background: isSelected ? "linear-gradient(180deg, #16A34A 0%, #15803D 100%)" : "transparent",
                                        boxShadow: isSelected ? "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 8px rgba(22, 163, 74, 0.3)" : "none"
                                    }}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        style={{
                                            padding: "2px 7px",
                                            borderRadius: "9999px",
                                            fontSize: "10px",
                                            fontWeight: "800",
                                            backgroundColor: isSelected ? "rgba(255, 255, 255, 0.24)" : "var(--bg)",
                                            color: isSelected ? "#FFFFFF" : "var(--text)",
                                            border: isSelected ? "none" : "1px solid var(--border)"
                                        }}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Input */}
                    <div style={{ position: "relative", minWidth: "280px", flex: "1 1 auto", maxWidth: "400px" }}>
                        <div
                            style={{
                                position: "absolute",
                                left: "14px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                alignItems: "center",
                                pointerEvents: "none",
                                color: "var(--text-muted)"
                            }}
                        >
                            <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by customer, phone, address, or item..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: "100%",
                                height: "44px",
                                paddingLeft: "42px",
                                paddingRight: searchTerm ? "38px" : "14px",
                                borderRadius: "12px",
                                fontSize: "13px",
                                fontWeight: "600",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--bg-secondary)",
                                color: "var(--text)",
                                outline: "none",
                                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                                transition: "border-color 0.15s ease, box-shadow 0.15s ease"
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#16A34A";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(22, 163, 74, 0.15)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "9999px",
                                    backgroundColor: "var(--border)",
                                    color: "var(--text)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Orders Table Container */}
                <div
                    style={{
                        borderRadius: "18px",
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--bg-secondary)",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03), 0 8px 24px -4px rgba(0, 0, 0, 0.02)",
                        overflow: "hidden"
                    }}
                >
                    {loading ? (
                        <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--text-muted)" }}>
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    margin: "0 auto 16px auto",
                                    border: "3px solid #16A34A",
                                    borderTopColor: "transparent",
                                    borderRadius: "9999px",
                                    animation: "spin 1s linear infinite"
                                }}
                            />
                            <p style={{ fontSize: "14px", fontWeight: "600", margin: 0 }}>Loading order queue...</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div style={{ padding: "72px 24px", textAlign: "center" }}>
                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    margin: "0 auto 16px auto",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg)",
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--text-muted)"
                                }}
                            >
                                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", margin: "0 0 6px 0" }}>
                                No matching orders found
                            </h3>
                            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }}>
                                {searchTerm
                                    ? `No orders matching "${searchTerm}". Try a different name, phone number, or item.`
                                    : "Incoming orders from customers on the storefront will appear here instantly."}
                            </p>
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "960px" }}>
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: "var(--bg)",
                                            borderBottom: "1px solid var(--border)"
                                        }}
                                    >
                                        <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                            Customer & Contact
                                        </th>
                                        <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                            Ordered Items
                                        </th>
                                        <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                            Total Amount
                                        </th>
                                        <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                            Fulfillment Status
                                        </th>
                                        <th style={{ padding: "14px 20px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", textAlign: "right" }}>
                                            Timestamp
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order: Order) => {
                                        const theme = getStatusTheme(order.status);
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
                                                {/* Customer Details */}
                                                <td style={{ padding: "18px 20px", minWidth: "260px", maxWidth: "300px" }}>
                                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                                        {/* Luxury Monogram Avatar */}
                                                        <div
                                                            style={{
                                                                width: "42px",
                                                                height: "42px",
                                                                borderRadius: "12px",
                                                                background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                                                                color: "#FFFFFF",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "13px",
                                                                fontWeight: "900",
                                                                boxShadow: "0 2px 8px rgba(22, 163, 74, 0.3)",
                                                                flexShrink: 0
                                                            }}
                                                        >
                                                            {getInitials(order.customerName)}
                                                        </div>

                                                        <div style={{ minWidth: 0, flex: 1 }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                                <p style={{ fontSize: "14px", fontWeight: "800", color: "var(--text)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                                    {order.customerName}
                                                                </p>
                                                                <span
                                                                    style={{
                                                                        fontSize: "10px",
                                                                        fontWeight: "800",
                                                                        padding: "1px 6px",
                                                                        borderRadius: "6px",
                                                                        backgroundColor: "var(--bg)",
                                                                        border: "1px solid var(--border)",
                                                                        color: "var(--text-muted)"
                                                                    }}
                                                                >
                                                                    #{order.id}
                                                                </span>
                                                            </div>

                                                            {/* Phone & WhatsApp Quick Chat */}
                                                            <div style={{ marginTop: "4px" }}>
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
                                                                    title="Open WhatsApp conversation"
                                                                >
                                                                    <svg style={{ width: "13px", height: "13px", flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766 0-3.187-2.58-5.771-5.768-5.771zm3.374 8.204c-.147.414-.732.762-1.026.81-.297.049-.685.074-2.228-.564-1.974-.816-3.213-2.825-3.311-2.956-.098-.131-.796-1.059-.796-2.021s.505-1.436.685-1.632c.18-.196.392-.245.523-.245s.262.003.376.009c.12.006.28-.046.438.334.164.393.557 1.359.605 1.458.049.098.082.213.016.344-.065.131-.098.213-.196.327-.098.115-.207.257-.295.344-.098.098-.201.205-.087.401.115.196.509.84 1.091 1.359.749.667 1.38.874 1.576.972.196.098.311.082.426-.049.115-.131.491-.573.622-.769.131-.196.262-.164.442-.098.18.065 1.146.54 1.342.638.196.098.327.147.376.23.049.082.049.475-.098.889z" />
                                                                    </svg>
                                                                    <span>{order.customerPhone}</span>
                                                                </a>
                                                            </div>

                                                            {/* Shipping Address */}
                                                            {order.customerAddress && (
                                                                <p
                                                                    style={{
                                                                        fontSize: "11px",
                                                                        color: "var(--text-muted)",
                                                                        margin: "4px 0 0 0",
                                                                        lineHeight: "1.4",
                                                                        display: "flex",
                                                                        alignItems: "flex-start",
                                                                        gap: "4px"
                                                                    }}
                                                                >
                                                                    <span>📍</span>
                                                                    <span>{order.customerAddress}</span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Ordered Items Preview */}
                                                <td style={{ padding: "18px 20px", minWidth: "260px", maxWidth: "340px" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                                                        {order.items?.slice(0, 3).map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                title={`${item.name} ×${item.quantity}`}
                                                                style={{
                                                                    width: "44px",
                                                                    height: "44px",
                                                                    borderRadius: "10px",
                                                                    border: "1px solid var(--border)",
                                                                    backgroundColor: "var(--bg)",
                                                                    overflow: "hidden",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    padding: "2px",
                                                                    flexShrink: 0,
                                                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)"
                                                                }}
                                                            >
                                                                {item.media?.[0]?.url ? (
                                                                    <img
                                                                        src={item.media[0].url}
                                                                        alt={item.name}
                                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                                    />
                                                                ) : (
                                                                    <svg style={{ width: "18px", height: "18px", color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        ))}

                                                        {order.items && order.items.length > 3 && (
                                                            <div
                                                                style={{
                                                                    width: "44px",
                                                                    height: "44px",
                                                                    borderRadius: "10px",
                                                                    backgroundColor: "#16A34A",
                                                                    color: "#FFFFFF",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: "11px",
                                                                    fontWeight: "800",
                                                                    flexShrink: 0
                                                                }}
                                                            >
                                                                +{order.items.length - 3}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                            fontWeight: "600",
                                                            color: "var(--text-secondary)",
                                                            margin: 0,
                                                            lineHeight: "1.4"
                                                        }}
                                                    >
                                                        {order.items?.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                                                    </p>
                                                </td>

                                                {/* Total Amount */}
                                                <td style={{ padding: "18px 20px", whiteSpace: "nowrap" }}>
                                                    <span
                                                        style={{
                                                            fontSize: "17px",
                                                            fontWeight: "900",
                                                            letterSpacing: "-0.02em",
                                                            color: "var(--text)",
                                                            fontFamily: "var(--font-display)"
                                                        }}
                                                    >
                                                        ₦{order.totalAmount.toLocaleString()}
                                                    </span>
                                                </td>

                                                {/* Status Dropdown Selector */}
                                                <td style={{ padding: "18px 20px", whiteSpace: "nowrap" }}>
                                                    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                                                        <select
                                                            disabled={updatingId === order.id}
                                                            value={order.status}
                                                            onChange={async (e) => {
                                                                const newStatus = e.target.value as Order['status'];
                                                                setUpdatingId(order.id);
                                                                try {
                                                                    const res = await fetch('/api/orders', {
                                                                        method: 'PATCH',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ id: order.id, status: newStatus })
                                                                    });
                                                                    if (res.ok) {
                                                                        setOrders(prev =>
                                                                            prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o)
                                                                        );
                                                                    } else {
                                                                        alert("Failed to update status");
                                                                    }
                                                                } catch (error) {
                                                                    console.error("Update Status Error:", error);
                                                                    alert("An error occurred while updating status");
                                                                } finally {
                                                                    setUpdatingId(null);
                                                                }
                                                            }}
                                                            style={{
                                                                appearance: "none",
                                                                WebkitAppearance: "none",
                                                                fontSize: "12px",
                                                                fontWeight: "800",
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.05em",
                                                                padding: "7px 30px 7px 12px",
                                                                borderRadius: "10px",
                                                                border: `1px solid ${theme.border}`,
                                                                backgroundColor: theme.bg,
                                                                color: theme.color,
                                                                cursor: "pointer",
                                                                outline: "none",
                                                                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                                                                transition: "all 0.15s ease"
                                                            }}
                                                        >
                                                            <option value="PENDING">Pending</option>
                                                            <option value="COMPLETED">Completed</option>
                                                            <option value="CANCELLED">Cancelled</option>
                                                        </select>

                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                right: "10px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                pointerEvents: "none",
                                                                color: theme.color
                                                            }}
                                                        >
                                                            {updatingId === order.id ? (
                                                                <div
                                                                    style={{
                                                                        width: "12px",
                                                                        height: "12px",
                                                                        border: "2px solid currentColor",
                                                                        borderTopColor: "transparent",
                                                                        borderRadius: "9999px",
                                                                        animation: "spin 1s linear infinite"
                                                                    }}
                                                                />
                                                            ) : (
                                                                <svg style={{ width: "12px", height: "12px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Date & Timestamp */}
                                                <td style={{ padding: "18px 20px", textAlign: "right", whiteSpace: "nowrap" }}>
                                                    <p style={{ fontSize: "12px", fontWeight: "700", color: "var(--text)", margin: 0 }}>
                                                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
