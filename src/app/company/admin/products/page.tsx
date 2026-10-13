"use client";

import { useState, useEffect, useMemo } from "react";
import AdminSidebar from "@/components/AdminSidebar";
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
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const { showToast } = useToast();

    const CATEGORIES = [
        { id: "ALL", label: "All Items", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
        { id: "IPHONES", label: "iPhones", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
        { id: "ANDROID", label: "Android", icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
        { id: "MACBOOK", label: "MacBook", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { id: "TABLETS", label: "Tablets", icon: "M12 18h.01M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" },
        { id: "WINDOWS LAPTOPS", label: "Windows Laptops", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { id: "SMARTWATCHES", label: "Smartwatches", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { id: "AIRPODS", label: "AirPods & Audio", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
        { id: "ACCESSORIES", label: "Accessories", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
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
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 min-w-0 w-full ml-0 lg:ml-64 pt-20 lg:pt-6 pb-24 lg:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Top Header */}
                <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                                Catalog & Inventory
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-primary/10 text-primary border border-primary/20">
                                {products.length} Products
                            </span>
                        </div>
                        <h1
                            className="text-2xl sm:text-3xl font-bold tracking-tight mb-0.5"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                        >
                            Products Catalog
                        </h1>
                        <p className="text-xs sm:text-sm font-normal" style={{ color: "var(--text-secondary)" }}>
                            Manage gadgets inventory, price points, stock quantities, and product deletions.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                        {/* View Switcher: Grid vs List */}
                        <div
                            className="flex items-center p-1 rounded-xl border"
                            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                        >
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-lg transition-all ${
                                    viewMode === "grid"
                                        ? "bg-primary text-white shadow-xs"
                                        : "opacity-60 hover:opacity-100"
                                }`}
                                title="Grid View"
                                aria-label="Grid View"
                            >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded-lg transition-all ${
                                    viewMode === "list"
                                        ? "bg-primary text-white shadow-xs"
                                        : "opacity-60 hover:opacity-100"
                                }`}
                                title="List View"
                                aria-label="List View"
                            >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Add Product Button */}
                        <Link
                            href="/company/admin/products/new"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all active:scale-95 shadow-md"
                            style={{
                                background: "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)",
                                boxShadow: "0 4px 14px rgba(22, 163, 74, 0.35)"
                            }}
                        >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Product</span>
                        </Link>
                    </div>
                </header>

                {/* Filter & Search Bar */}
                <div className="space-y-3 mb-6">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search by gadget name, model, or brand..."
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm font-medium border outline-none transition-colors"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border)",
                                    color: "var(--text)"
                                }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                            />
                            <svg width="16" height="16" className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center opacity-60 hover:opacity-100"
                                    style={{ backgroundColor: "var(--border)" }}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2 self-start md:self-auto">
                            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Status:</span>
                            <div className="p-1 rounded-xl border flex items-center gap-1" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                                {[
                                    { id: "ALL", label: "All" },
                                    { id: "IN_STOCK", label: "In Stock" },
                                    { id: "PRE_ORDER", label: "Pre-Order" },
                                ].map((status) => (
                                    <button
                                        key={status.id}
                                        onClick={() => setSelectedStatus(status.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            selectedStatus === status.id
                                                ? "bg-primary text-white shadow-sm"
                                                : "opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        {status.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Category Scroll Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar touch-pan-x">
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory.toUpperCase() === cat.id.toUpperCase();
                            const count = categoryCounts[cat.id] || 0;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
                                        isSelected
                                            ? "shadow-sm"
                                            : "opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                                    }`}
                                    style={{
                                        backgroundColor: isSelected ? "var(--primary)" : "var(--bg-secondary)",
                                        borderColor: isSelected ? "var(--primary)" : "var(--border)",
                                        color: isSelected ? "#FFFFFF" : "var(--text)",
                                    }}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        className="shrink-0"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={cat.icon} />
                                    </svg>
                                    <span>{cat.label}</span>
                                    <span
                                        className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold transition-colors"
                                        style={{
                                            backgroundColor: isSelected ? "rgba(255, 255, 255, 0.25)" : "var(--bg)",
                                            color: isSelected ? "#FFFFFF" : "var(--text-muted)",
                                            border: isSelected ? "none" : "1px solid var(--border)"
                                        }}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ========================================================= */}
                {/* CATALOG CONTENT (GRID OR LIST)                            */}
                {/* ========================================================= */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="rounded-2xl h-80 animate-pulse border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}></div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-12 sm:p-16 text-center rounded-3xl border border-dashed" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}>
                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>No gadgets found</h3>
                        <p className="text-xs sm:text-sm max-w-sm mx-auto mb-5" style={{ color: "var(--text-muted)" }}>
                            {searchTerm || selectedCategory !== "ALL" || selectedStatus !== "ALL"
                                ? "No items match your active search filters. Try clearing them to see all catalog items."
                                : "Your product catalog is empty. Create your first product listing to get started."}
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
                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm"
                                style={{ backgroundColor: "var(--primary)" }}
                            >
                                Add Product
                            </Link>
                        </div>
                    </div>
                ) : viewMode === "grid" ? (
                    /* ---------------- GRID VIEW ---------------- */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative rounded-2xl border transition-all duration-200 hover:shadow-xl overflow-hidden flex flex-col justify-between"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border)"
                                }}
                            >
                                <div>
                                    {/* Media Thumbnail Container */}
                                    <div
                                        className="relative aspect-square w-full overflow-hidden border-b flex items-center justify-center p-3"
                                        style={{ borderColor: "var(--border)", backgroundColor: "rgba(0,0,0,0.02)" }}
                                    >
                                        <Link href={`/company/admin/products/${product.id}`} className="w-full h-full flex items-center justify-center">
                                            <img
                                                src={product.media?.[0]?.url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                                alt={product.name}
                                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                            />
                                        </Link>

                                        {/* Product Badges (Top Left) */}
                                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none z-10">
                                            {product.featured && (
                                                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm inline-flex items-center gap-1">
                                                    ★ Featured
                                                </span>
                                            )}
                                            {product.limitedTimeDeal && (
                                                <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm inline-flex items-center gap-1">
                                                    🔥 Deal
                                                </span>
                                            )}
                                        </div>

                                        {/* TOP RIGHT: PROMINENT DELETE BUTTON (ALWAYS VISIBLE & HIGH CONTRAST) */}
                                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setDeleteModalId(product.id);
                                                }}
                                                className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition-all active:scale-90 hover:scale-105 border border-rose-400"
                                                title={`Delete ${product.name}`}
                                                aria-label={`Delete ${product.name}`}
                                            >
                                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-[10px] font-bold uppercase tracking-wider truncate max-w-[120px]" style={{ color: "var(--primary)" }}>
                                                {product.category === "IPAD" ? "TABLETS" : product.category === "IPHONE" ? "IPHONES" : product.category}
                                            </span>
                                            <span
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                                                style={{
                                                    color: product.stockQuantity < 5 ? '#EF4444' : 'var(--text-muted)',
                                                    backgroundColor: product.stockQuantity < 5 ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg)',
                                                    border: `1px solid ${product.stockQuantity < 5 ? 'rgba(239, 68, 68, 0.2)' : 'var(--border)'}`
                                                }}
                                            >
                                                {product.stockQuantity} in stock
                                            </span>
                                        </div>

                                        <Link href={`/company/admin/products/${product.id}`} className="block">
                                            <h3
                                                className="text-sm font-bold truncate hover:underline mb-1"
                                                style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
                                                title={product.name}
                                            >
                                                {product.name}
                                            </h3>
                                        </Link>

                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-base font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
                                                ₦{product.price.toLocaleString()}
                                            </p>
                                            <span
                                                className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                                                style={{
                                                    backgroundColor: product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(234, 179, 8, 0.12)',
                                                    color: product.status === 'IN_STOCK' ? '#16A34A' : '#D97706',
                                                    border: `1px solid ${product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(234, 179, 8, 0.25)'}`
                                                }}
                                            >
                                                {product.status === 'IN_STOCK' ? 'In Stock' : 'Pre-Order'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD ACTIONS: HIGHLY VISIBLE DEDICATED ACTION BAR */}
                                <div className="p-3 border-t grid grid-cols-2 gap-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                                    {/* Edit Button */}
                                    <Link
                                        href={`/company/admin/products/${product.id}`}
                                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                                        style={{
                                            borderColor: "var(--border)",
                                            backgroundColor: "var(--bg-secondary)",
                                            color: "var(--text)"
                                        }}
                                    >
                                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        <span>Edit</span>
                                    </Link>

                                    {/* Prominent Red Delete Button */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDeleteModalId(product.id);
                                        }}
                                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-all active:scale-95 shadow-2xs hover:bg-rose-600 hover:text-white"
                                        style={{
                                            color: "#EF4444",
                                            backgroundColor: "rgba(239, 68, 68, 0.08)",
                                            borderColor: "rgba(239, 68, 68, 0.3)"
                                        }}
                                    >
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* ---------------- LIST VIEW (SUPER CLEAN ON MOBILE & DESKTOP) ---------------- */
                    <div
                        className="rounded-3xl border shadow-sm overflow-hidden divide-y"
                        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                    >
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                {/* Left: Media + Info */}
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div
                                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border flex items-center justify-center p-1.5 shrink-0"
                                        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
                                    >
                                        <img
                                            src={product.media?.[0]?.url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                                                {product.category}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">•</span>
                                            <span className="text-[11px] font-semibold" style={{ color: product.stockQuantity < 5 ? '#EF4444' : 'var(--text-muted)' }}>
                                                {product.stockQuantity} in stock
                                            </span>
                                            {product.featured && (
                                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500 text-white">
                                                    ★ Featured
                                                </span>
                                            )}
                                        </div>
                                        <Link href={`/company/admin/products/${product.id}`} className="block">
                                            <h3 className="font-bold text-sm sm:text-base truncate hover:underline" style={{ color: "var(--text)" }}>
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm font-extrabold mt-0.5" style={{ color: "var(--text)" }}>
                                            ₦{product.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Dedicated Actions Bar */}
                                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                    <Link
                                        href={`/company/admin/products/${product.id}`}
                                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95"
                                        style={{
                                            borderColor: "var(--border)",
                                            backgroundColor: "var(--bg)",
                                            color: "var(--text)"
                                        }}
                                    >
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        <span>Edit</span>
                                    </Link>

                                    {/* Prominent Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => setDeleteModalId(product.id)}
                                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all active:scale-95 shadow-sm"
                                        style={{
                                            backgroundColor: "#EF4444"
                                        }}
                                        title="Delete product"
                                    >
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ========================================================= */}
                {/* DELETE CONFIRMATION MODAL (ENHANCED & VERY EXPLICIT)      */}
                {/* ========================================================= */}
                {deleteModalId !== null && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => !deleting && setDeleteModalId(null)}
                    >
                        <div
                            className="w-full max-w-md p-6 rounded-3xl border shadow-2xl relative"
                            style={{
                                backgroundColor: "var(--bg)",
                                borderColor: "var(--border)"
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Danger Icon Badge */}
                            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-center mb-1.5" style={{ color: "var(--text)" }}>
                                Delete Product?
                            </h3>
                            <p className="text-xs text-center mb-5" style={{ color: "var(--text-muted)" }}>
                                This action is permanent and will completely remove this product from the storefront.
                            </p>

                            {/* Product preview card inside modal */}
                            {productToDelete && (
                                <div
                                    className="p-3 rounded-2xl border flex items-center gap-3 mb-6"
                                    style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                                >
                                    <div className="w-12 h-12 rounded-xl border bg-white flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                        <img
                                            src={productToDelete.media?.[0]?.url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                            alt={productToDelete.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>
                                            {productToDelete.name}
                                        </p>
                                        <p className="text-[11px] font-semibold text-rose-500">
                                            ₦{productToDelete.price.toLocaleString()} • {productToDelete.category}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setDeleteModalId(null)}
                                    disabled={deleting}
                                    className="flex-1 py-3 rounded-xl text-xs font-bold border transition-colors hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
                                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                    className="flex-1 py-3 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {deleting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span>Yes, Delete</span>
                                        </>
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
