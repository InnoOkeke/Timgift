"use client";

import { useState, useEffect, useMemo } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import { Product } from "@/types";
import { useToast } from "@/components/Toast";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const { showToast } = useToast();

    const CATEGORIES = [
        { id: "ALL", label: "All Items" },
        { id: "IPHONES", label: "iPhones" },
        { id: "ANDROID", label: "Android" },
        { id: "MACBOOK", label: "MacBook" },
        { id: "TABLETS", label: "Tablets" },
        { id: "WINDOWS LAPTOPS", label: "Windows Laptops" },
        { id: "SMARTWATCHES", label: "Smartwatches" },
        { id: "AIRPODS", label: "AirPods" },
        { id: "ACCESSORIES", label: "Accessories" },
    ];

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: products.length };
        products.forEach(p => {
            let cat = p.category?.toUpperCase() || "";
            if (cat === "IPAD") cat = "TABLETS";
            if (cat === "IPHONE") cat = "IPHONES";
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [products]);

    const inventoryMetrics = useMemo(() => {
        const total = products.length;
        const inStock = products.filter(p => p.status === "IN_STOCK").length;
        const preOrder = products.filter(p => p.status === "PRE_ORDER").length;
        const lowStock = products.filter(p => p.stockQuantity < 5).length;
        return { total, inStock, preOrder, lowStock };
    }, [products]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Fetch Products Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteModalId) return;
        setDeleting(true);

        try {
            const res = await fetch(`/api/products/${deleteModalId}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== deleteModalId));
                showToast("Product deleted successfully", "success");
                setDeleteModalId(null);
            } else {
                showToast("Failed to delete product", "error");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            showToast("Failed to delete product", "error");
        } finally {
            setDeleting(false);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((p: Product) => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                !searchTerm ||
                p.name.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower);

            let pCat = p.category.toUpperCase();
            if (pCat === "IPAD") pCat = "TABLETS";
            if (pCat === "IPHONE") pCat = "IPHONES";

            const matchesCategory =
                selectedCategory === "ALL" ||
                pCat === selectedCategory.toUpperCase();

            const matchesStatus =
                selectedStatus === "ALL" ||
                p.status === selectedStatus;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, searchTerm, selectedCategory, selectedStatus]);

    const productToDelete = useMemo(() => {
        if (!deleteModalId) return null;
        return products.find(p => p.id === deleteModalId) || null;
    }, [deleteModalId, products]);

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
            <AdminNavbar />

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-16" style={{ maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>
                {/* Header Title & Actions */}
                <header className="mb-8 pb-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ borderColor: "var(--border)" }}>
                    <div>
                        {/* Eyebrow Status Pill */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#16A34A", display: "inline-block", boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.2)", flexShrink: 0 }}></span>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "#16A34A" }}>
                                Inventory & Stock
                            </span>
                            <span style={{ color: "var(--border-strong)", fontSize: "11px" }}>•</span>
                            <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "9999px", backgroundColor: "rgba(22, 163, 74, 0.1)", color: "#16A34A", border: "1px solid rgba(22, 163, 74, 0.2)" }}>
                                {products.length} Gadgets Listed
                            </span>
                        </div>
                        <h1
                            className="text-2xl sm:text-3xl font-black tracking-tight mb-1"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                        >
                            Products Catalog
                        </h1>
                        <p className="text-sm font-normal" style={{ color: "var(--text-secondary)" }}>
                            Manage listings, stock levels, price points, and remove discontinued products.
                        </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        {/* Grid / Table View Switcher */}
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                height: "42px",
                                padding: "4px",
                                borderRadius: "12px",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--bg-secondary)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                gap: "4px"
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setViewMode("grid")}
                                className="transition-all"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    height: "32px",
                                    padding: "0 12px",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    color: viewMode === "grid" ? "#FFFFFF" : "var(--text)",
                                    background: viewMode === "grid" ? "linear-gradient(180deg, #16A34A 0%, #15803D 100%)" : "transparent",
                                    boxShadow: viewMode === "grid" ? "0 2px 8px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                                    opacity: viewMode === "grid" ? 1 : 0.6,
                                    border: "none"
                                }}
                                title="Grid View"
                            >
                                <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span>Grid</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("table")}
                                className="transition-all"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    height: "32px",
                                    padding: "0 12px",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    color: viewMode === "table" ? "#FFFFFF" : "var(--text)",
                                    background: viewMode === "table" ? "linear-gradient(180deg, #16A34A 0%, #15803D 100%)" : "transparent",
                                    boxShadow: viewMode === "table" ? "0 2px 8px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                                    opacity: viewMode === "table" ? 1 : 0.6,
                                    border: "none"
                                }}
                                title="Table View"
                            >
                                <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <span>Table</span>
                            </button>
                        </div>

                        {/* Add Product Button (Executive Emerald CTA) */}
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
                    </div>
                </header>

                {/* Luxury KPI Metrics Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "16px",
                        marginBottom: "32px"
                    }}
                >
                    {/* Card 1: Total Catalog */}
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            padding: "20px 22px",
                            borderRadius: "18px",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)",
                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                    >
                        {/* Top Gradient Accent Bar */}
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
                                Total Catalog
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: "900",
                                lineHeight: "1.1",
                                marginTop: "14px",
                                marginBottom: "10px",
                                color: "var(--text)",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.03em"
                            }}
                        >
                            {inventoryMetrics.total}
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
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    backgroundColor: "#10B981",
                                    boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)",
                                    display: "inline-block",
                                    flexShrink: 0
                                }}
                            />
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#059669" }}>
                                Active listings in database
                            </span>
                        </div>
                    </div>

                    {/* Card 2: In Stock */}
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            padding: "20px 22px",
                            borderRadius: "18px",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)",
                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                    >
                        {/* Top Gradient Accent Bar */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "3.5px",
                                background: "linear-gradient(90deg, #16A34A 0%, #22C55E 100%)"
                            }}
                        />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                In Stock
                            </span>
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(22, 163, 74, 0.1)",
                                    border: "1px solid rgba(22, 163, 74, 0.25)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}
                            >
                                <svg style={{ width: "18px", height: "18px", color: "#16A34A" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: "900",
                                lineHeight: "1.1",
                                marginTop: "14px",
                                marginBottom: "10px",
                                color: "#16A34A",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.03em"
                            }}
                        >
                            {inventoryMetrics.inStock}
                        </div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "3px 9px",
                                borderRadius: "9999px",
                                backgroundColor: "rgba(22, 163, 74, 0.08)",
                                border: "1px solid rgba(22, 163, 74, 0.2)"
                            }}
                        >
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    backgroundColor: "#16A34A",
                                    boxShadow: "0 0 6px rgba(22, 163, 74, 0.6)",
                                    display: "inline-block",
                                    flexShrink: 0
                                }}
                            />
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#15803D" }}>
                                Ready for dispatch
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Pre-Orders */}
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            padding: "20px 22px",
                            borderRadius: "18px",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)",
                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                    >
                        {/* Top Gradient Accent Bar */}
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
                                Pre-Orders
                            </span>
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(245, 158, 11, 0.12)",
                                    border: "1px solid rgba(245, 158, 11, 0.28)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}
                            >
                                <svg style={{ width: "18px", height: "18px", color: "#D97706" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: "900",
                                lineHeight: "1.1",
                                marginTop: "14px",
                                marginBottom: "10px",
                                color: "#D97706",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.03em"
                            }}
                        >
                            {inventoryMetrics.preOrder}
                        </div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "3px 9px",
                                borderRadius: "9999px",
                                backgroundColor: "rgba(245, 158, 11, 0.08)",
                                border: "1px solid rgba(245, 158, 11, 0.25)"
                            }}
                        >
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    backgroundColor: "#D97706",
                                    boxShadow: "0 0 6px rgba(217, 119, 6, 0.5)",
                                    display: "inline-block",
                                    flexShrink: 0
                                }}
                            />
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#B45309" }}>
                                Booked reservations
                            </span>
                        </div>
                    </div>

                    {/* Card 4: Low Stock */}
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            padding: "20px 22px",
                            borderRadius: "18px",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px -2px rgba(0, 0, 0, 0.02)",
                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                    >
                        {/* Top Gradient Accent Bar */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "3.5px",
                                background: "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)"
                            }}
                        />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                                Low Stock
                            </span>
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    border: "1px solid rgba(239, 68, 68, 0.25)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}
                            >
                                <svg style={{ width: "18px", height: "18px", color: "#EF4444" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: "900",
                                lineHeight: "1.1",
                                marginTop: "14px",
                                marginBottom: "10px",
                                color: "#EF4444",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.03em"
                            }}
                        >
                            {inventoryMetrics.lowStock}
                        </div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "3px 9px",
                                borderRadius: "9999px",
                                backgroundColor: "rgba(239, 68, 68, 0.08)",
                                border: "1px solid rgba(239, 68, 68, 0.25)"
                            }}
                        >
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "9999px",
                                    backgroundColor: "#EF4444",
                                    boxShadow: "0 0 6px rgba(239, 68, 68, 0.6)",
                                    display: "inline-block",
                                    flexShrink: 0
                                }}
                            />
                            <span style={{ fontSize: "11px", fontWeight: "700", color: "#DC2626" }}>
                                &lt; 5 units remaining
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filters Toolbar with Generous Space & Crisp Alignment */}
                <div
                    style={{
                        marginBottom: "32px",
                        padding: "18px 20px",
                        borderRadius: "16px",
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--bg-secondary)",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                        {/* Search Input with Guaranteed Icon Alignment */}
                        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
                            <svg
                                style={{
                                    position: "absolute",
                                    left: "14px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: "18px",
                                    height: "18px",
                                    color: "var(--text-muted)",
                                    pointerEvents: "none",
                                    opacity: 0.7
                                }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search gadgets by model, storage, or category..."
                                style={{
                                    width: "100%",
                                    height: "44px",
                                    paddingLeft: "42px",
                                    paddingRight: searchTerm ? "38px" : "16px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    backgroundColor: "var(--bg)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text)",
                                    outline: "none",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                                    transition: "all 0.15s ease"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#16A34A";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(22, 163, 74, 0.15)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "var(--border)";
                                    e.target.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.02)";
                                }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    style={{
                                        position: "absolute",
                                        right: "12px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "22px",
                                        height: "22px",
                                        borderRadius: "9999px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "11px",
                                        fontWeight: "700",
                                        backgroundColor: "var(--border)",
                                        color: "var(--text)",
                                        cursor: "pointer",
                                        border: "none"
                                    }}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Status Filter Segmented Capsule */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                                Status:
                            </span>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    height: "44px",
                                    padding: "4px",
                                    borderRadius: "12px",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--bg)",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                                    gap: "4px"
                                }}
                            >
                                {[
                                    { id: "ALL", label: "All Items" },
                                    { id: "IN_STOCK", label: "In Stock" },
                                    { id: "PRE_ORDER", label: "Pre-Order" },
                                ].map((status) => {
                                    const isSelected = selectedStatus === status.id;
                                    return (
                                        <button
                                            key={status.id}
                                            onClick={() => setSelectedStatus(status.id)}
                                            style={{
                                                height: "34px",
                                                padding: "0 14px",
                                                borderRadius: "8px",
                                                fontSize: "12px",
                                                fontWeight: "700",
                                                transition: "all 0.15s ease",
                                                cursor: "pointer",
                                                color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                                                backgroundColor: isSelected ? "#16A34A" : "transparent",
                                                boxShadow: isSelected ? "0 1px 4px rgba(22, 163, 74, 0.3)" : "none",
                                                border: "none"
                                            }}
                                        >
                                            {status.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Category Filter Pills (Uniform, Elegant Scroll Strip) */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", paddingBottom: "4px" }} className="no-scrollbar">
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory.toUpperCase() === cat.id.toUpperCase();
                            const count = categoryCounts[cat.id] || 0;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        height: "36px",
                                        padding: "0 14px",
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        whiteSpace: "nowrap",
                                        flexShrink: 0,
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                        backgroundColor: isSelected ? "#16A34A" : "var(--bg)",
                                        border: `1px solid ${isSelected ? "#16A34A" : "var(--border)"}`,
                                        color: isSelected ? "#FFFFFF" : "var(--text)",
                                        boxShadow: isSelected ? "0 2px 6px rgba(22, 163, 74, 0.25)" : "none"
                                    }}
                                >
                                    <span>{cat.label}</span>
                                    <span
                                        style={{
                                            padding: "1px 6px",
                                            borderRadius: "6px",
                                            fontSize: "10px",
                                            fontWeight: "800",
                                            backgroundColor: isSelected ? "rgba(255, 255, 255, 0.25)" : "var(--bg-secondary)",
                                            color: isSelected ? "#FFFFFF" : "var(--text-muted)",
                                        }}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Catalog Content Area */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="rounded-2xl h-88 animate-pulse border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}></div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-16 text-center rounded-3xl border border-dashed" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}>
                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center border" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>No products found</h3>
                        <p className="text-sm max-w-sm mx-auto mb-6 text-muted-foreground">
                            {searchTerm || selectedCategory !== "ALL" || selectedStatus !== "ALL"
                                ? "No items match your active filters. Try resetting to view all listings."
                                : "Your product catalog is empty. Create your first gadget listing to get started."}
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            {(searchTerm || selectedCategory !== "ALL" || selectedStatus !== "ALL") && (
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedCategory("ALL");
                                        setSelectedStatus("ALL");
                                    }}
                                    className="px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                >
                                    Reset Filters
                                </button>
                            )}
                            <Link
                                href="/company/admin/products/new"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    height: "40px",
                                    padding: "0 18px",
                                    borderRadius: "12px",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    color: "#FFFFFF",
                                    background: "linear-gradient(180deg, #16A34A 0%, #15803D 100%)",
                                    border: "1px solid rgba(22, 163, 74, 0.9)",
                                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 14px -1px rgba(22, 163, 74, 0.38)",
                                    textDecoration: "none",
                                    cursor: "pointer"
                                }}
                            >
                                Add Product
                            </Link>
                        </div>
                    </div>
                ) : viewMode === "grid" ? (
                    /* ---------------- GRID VIEW (CLEAN, WORLD-CLASS CARDS) ---------------- */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group rounded-2xl border transition-all duration-200 hover:shadow-xl hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border)"
                                }}
                            >
                                <div>
                                    {/* Product Studio Image Showcase (Restrained, elegant height) */}
                                    <div
                                        className="relative w-full overflow-hidden border-b flex items-center justify-center p-4"
                                        style={{ height: "175px", borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                                    >
                                        <Link href={`/company/admin/products/${product.id}`} className="w-full h-full flex items-center justify-center">
                                            <img
                                                src={product.media?.[0]?.url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                                alt={product.name}
                                                className="max-h-32 max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                            />
                                        </Link>

                                        {/* Promotional Badges */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
                                            {product.featured && (
                                                <span className="px-2.5 py-1 rounded-md bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                    ★ Featured
                                                </span>
                                            )}
                                            {product.limitedTimeDeal && (
                                                <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                    🔥 Deal
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Details Section */}
                                    <div style={{ padding: "16px 20px" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                                            <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "#16A34A" }}>
                                                {product.category === "IPAD" ? "TABLETS" : product.category === "IPHONE" ? "IPHONES" : product.category}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                    padding: "2px 8px",
                                                    borderRadius: "6px",
                                                    color: product.stockQuantity < 5 ? '#EF4444' : 'var(--text-muted)',
                                                    backgroundColor: product.stockQuantity < 5 ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg)',
                                                    border: `1px solid ${product.stockQuantity < 5 ? 'rgba(239, 68, 68, 0.2)' : 'var(--border)'}`,
                                                    flexShrink: 0
                                                }}
                                            >
                                                {product.stockQuantity} in stock
                                            </span>
                                        </div>

                                        <Link href={`/company/admin/products/${product.id}`} style={{ display: "block", textDecoration: "none" }}>
                                            <h3
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "700",
                                                    color: "var(--text)",
                                                    fontFamily: "var(--font-display)",
                                                    marginBottom: "10px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                }}
                                                title={product.name}
                                            >
                                                {product.name}
                                            </h3>
                                        </Link>

                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                                            <p style={{ fontSize: "18px", fontWeight: "900", color: "var(--text)", fontFamily: "var(--font-display)", margin: 0, letterSpacing: "-0.02em" }}>
                                                ₦{product.price.toLocaleString()}
                                            </p>
                                            <span
                                                style={{
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                    padding: "3px 8px",
                                                    borderRadius: "6px",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.04em",
                                                    backgroundColor: product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(234, 179, 8, 0.12)',
                                                    color: product.status === 'IN_STOCK' ? '#16A34A' : '#D97706',
                                                    border: `1px solid ${product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(234, 179, 8, 0.25)'}`,
                                                    flexShrink: 0
                                                }}
                                            >
                                                {product.status === 'IN_STOCK' ? 'In Stock' : 'Pre-Order'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Card Action Buttons (Clear, Spacious & Explicit) */}
                                <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                                    {/* Edit Button */}
                                    <Link
                                        href={`/company/admin/products/${product.id}`}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "6px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            fontSize: "12px",
                                            fontWeight: "700",
                                            border: "1px solid var(--border)",
                                            backgroundColor: "var(--bg-secondary)",
                                            color: "var(--text)",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                            transition: "all 0.15s ease",
                                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                                            e.currentTarget.style.borderColor = "var(--border-strong)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                                            e.currentTarget.style.borderColor = "var(--border)";
                                        }}
                                    >
                                        <svg style={{ width: "14px", height: "14px", color: "#16A34A", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        <span>Edit</span>
                                    </Link>

                                    {/* Highly Visible Red Delete Button (Luxury Ruby Gradient) */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDeleteModalId(product.id);
                                        }}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "6px",
                                            height: "36px",
                                            borderRadius: "10px",
                                            fontSize: "12px",
                                            fontWeight: "700",
                                            color: "#FFFFFF",
                                            background: "linear-gradient(180deg, #EF4444 0%, #DC2626 100%)",
                                            border: "1px solid rgba(239, 68, 68, 0.85)",
                                            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 3px 10px -1px rgba(239, 68, 68, 0.35)",
                                            cursor: "pointer",
                                            transition: "all 0.15s ease"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-1px)";
                                            e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 5px 14px -1px rgba(239, 68, 68, 0.45)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 3px 10px -1px rgba(239, 68, 68, 0.35)";
                                        }}
                                        title={`Delete ${product.name}`}
                                    >
                                        <svg style={{ width: "14px", height: "14px", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* ---------------- TABLE VIEW (ENTERPRISE DATA TABLE) ---------------- */
                    <div
                        className="rounded-2xl border shadow-sm overflow-hidden"
                        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                                    <tr>
                                        <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs" style={{ color: "var(--text-muted)" }}>Product</th>
                                        <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs" style={{ color: "var(--text-muted)" }}>Category</th>
                                        <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs" style={{ color: "var(--text-muted)" }}>Price</th>
                                        <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs" style={{ color: "var(--text-muted)" }}>Stock</th>
                                        <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs" style={{ color: "var(--text-muted)" }}>Status</th>
                                        <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3.5">
                                                    <img
                                                        src={product.media?.[0]?.url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop"}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-xl object-contain border p-1 shrink-0"
                                                        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                                                    />
                                                    <div className="min-w-0">
                                                        <Link href={`/company/admin/products/${product.id}`} className="font-bold hover:underline truncate block max-w-sm" style={{ color: "var(--text)" }}>
                                                            {product.name}
                                                        </Link>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            {product.featured && <span className="text-[10px] font-bold text-amber-500">★ Featured</span>}
                                                            {product.limitedTimeDeal && <span className="text-[10px] font-bold text-rose-500">🔥 Deal</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">
                                                {product.category === "IPAD" ? "TABLETS" : product.category === "IPHONE" ? "IPHONES" : product.category}
                                            </td>
                                            <td className="py-4 px-6 font-black" style={{ color: "var(--text)" }}>
                                                ₦{product.price.toLocaleString()}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span
                                                    className="px-2.5 py-1 rounded-md text-xs font-bold"
                                                    style={{
                                                        color: product.stockQuantity < 5 ? '#EF4444' : 'var(--text)',
                                                        backgroundColor: product.stockQuantity < 5 ? 'rgba(239,68,68,0.1)' : 'transparent',
                                                    }}
                                                >
                                                    {product.stockQuantity} units
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span
                                                    className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
                                                    style={{
                                                        backgroundColor: product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(234, 179, 8, 0.12)',
                                                        color: product.status === 'IN_STOCK' ? '#16A34A' : '#D97706',
                                                        border: `1px solid ${product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(234, 179, 8, 0.25)'}`
                                                    }}
                                                >
                                                    {product.status === 'IN_STOCK' ? 'In Stock' : 'Pre-Order'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2.5">
                                                    <Link
                                                        href={`/company/admin/products/${product.id}`}
                                                        className="px-3.5 py-1.5 rounded-xl border text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5 shadow-xs"
                                                        style={{ borderColor: "var(--border)", color: "var(--text)", backgroundColor: "var(--bg)" }}
                                                        title="Edit"
                                                    >
                                                        <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                        <span>Edit</span>
                                                    </Link>

                                                    <button
                                                        onClick={() => setDeleteModalId(product.id)}
                                                        className="px-3.5 py-1.5 rounded-xl text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer hover:opacity-95 shrink-0"
                                                        style={{
                                                            background: "linear-gradient(180deg, #EF4444 0%, #DC2626 100%)",
                                                            border: "1px solid rgba(239, 68, 68, 0.85)"
                                                        }}
                                                        title="Delete"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal (Luxury Frosted Glass) */}
                {deleteModalId !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
                        <div
                            className="w-full max-w-md p-6 sm:p-7 rounded-3xl border shadow-2xl relative"
                            style={{
                                backgroundColor: "var(--bg)",
                                borderColor: "var(--border)"
                            }}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-center mb-1.5" style={{ color: "var(--text)" }}>
                                Delete Product Listing?
                            </h3>
                            <p className="text-xs text-center mb-6 text-muted-foreground leading-relaxed">
                                Are you sure you want to permanently delete <strong style={{ color: "var(--text)" }}>"{productToDelete?.name || "this gadget"}"</strong>? This will erase it from the public catalog.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteModalId(null)}
                                    disabled={deleting}
                                    className="flex-1 py-3 rounded-xl text-xs font-bold border hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer shadow-xs"
                                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                    className="flex-1 py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                                    style={{
                                        background: "linear-gradient(180deg, #EF4444 0%, #DC2626 100%)",
                                        border: "1px solid rgba(239, 68, 68, 0.85)"
                                    }}
                                >
                                    {deleting ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <span>Yes, Delete Listing</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
