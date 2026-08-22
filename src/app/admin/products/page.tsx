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
    const { showToast } = useToast();

    const CATEGORIES = [
        { id: "ALL", label: "All Items", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
        { id: "IPHONE", label: "iPhone", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
        { id: "ANDROID", label: "Android", icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
        { id: "MACBOOK", label: "MacBook", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { id: "IPAD", label: "iPad", icon: "M12 18h.01M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" },
        { id: "WINDOWS LAPTOPS", label: "Windows Laptops", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { id: "SMARTWATCHES", label: "Smartwatches", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { id: "AIRPODS", label: "AirPods & Audio", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
        { id: "VIDEO GAMES CONSOLES", label: "Gaming Consoles", icon: "M15 5v2m0 4v2m0-6h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m-6 0H7a2 2 0 01-2-2V7a2 2 0 012-2h2m0 0V3m0 2h6M6 10H4m16 0h-2" },
    ];

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: products.length };
        products.forEach(p => {
            const cat = p.category?.toUpperCase() || "";
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

            const matchesCategory =
                selectedCategory === "ALL" ||
                p.category.toUpperCase() === selectedCategory.toUpperCase();

            const matchesStatus =
                selectedStatus === "ALL" ||
                p.status === selectedStatus;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, searchTerm, selectedCategory, selectedStatus]);

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-64 p-6 lg:p-8 max-w-7xl">
                {/* Top Header */}
                <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                                Catalog & Inventory
                            </span>
                        </div>
                        <h1
                            className="text-2xl font-bold tracking-tight mb-0.5"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                        >
                            Products Catalog
                        </h1>
                        <p className="text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
                            Manage live gadgets inventory, prices, stock, and promotional listings.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs text-white transition-all active:scale-95 shadow-xs"
                            style={{
                                backgroundColor: "var(--primary)",
                            }}
                        >
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search by gadget name, model, or brand..."
                                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border outline-none transition-colors"
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
                            <svg width="14" height="14" className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Status:</span>
                            <div className="p-1 rounded-xl border flex items-center gap-1" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                                {["ALL", "IN_STOCK", "PRE_ORDER"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                            selectedStatus === status
                                                ? "bg-primary text-white shadow-sm"
                                                : "opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        {status === "ALL" ? "All" : status === "IN_STOCK" ? "In Stock" : "Pre-Order"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Category Scroll Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory.toUpperCase() === cat.id.toUpperCase();
                            const count = categoryCounts[cat.id] || 0;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
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
                                        style={{ width: "14px", height: "14px" }}
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

                {/* Catalog Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                            <div key={i} className="rounded-2xl h-72 animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }}></div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-16 text-center rounded-2xl border border-dashed" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}>
                        <div className="w-12 h-12 mx-auto mb-3.5 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                            <svg width="22" height="22" style={{ width: "22px", height: "22px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>No gadgets found</h3>
                        <p className="text-xs max-w-sm mx-auto mb-5" style={{ color: "var(--text-muted)" }}>
                            {searchTerm || selectedCategory !== "ALL"
                                ? "No items match your active search filters. Try clearing them."
                                : "Your product catalog is empty. Create your first product listing."}
                        </p>
                        {(searchTerm || selectedCategory !== "ALL" || selectedStatus !== "ALL") && (
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("ALL");
                                    setSelectedStatus("ALL");
                                }}
                                className="px-4 py-2 rounded-xl text-xs font-bold border hover:bg-black/5 dark:hover:bg-white/5"
                                style={{ borderColor: "var(--border)", color: "var(--text)" }}
                            >
                                Reset All Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border)"
                                }}
                            >
                                {/* Media Container */}
                                <div>
                                    <div className="relative aspect-square w-full overflow-hidden bg-white/5 border-b" style={{ borderColor: "var(--border)" }}>
                                        <Link href={`/admin/products/${product.id}`} className="block w-full h-full">
                                            <img
                                                src={product.media?.[0]?.url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                            />
                                        </Link>

                                        {/* Badges Overlay */}
                                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
                                            {product.featured && (
                                                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm inline-flex items-center gap-1">
                                                    <svg width="10" height="10" style={{ width: "10px", height: "10px" }} className="fill-current shrink-0" viewBox="0 0 24 24">
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                    </svg>
                                                    Featured
                                                </span>
                                            )}
                                            {product.limitedTimeDeal && (
                                                <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm inline-flex items-center gap-1">
                                                    <svg width="10" height="10" style={{ width: "10px", height: "10px" }} className="fill-current shrink-0" viewBox="0 0 24 24">
                                                        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                                                    </svg>
                                                    Deal
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Hover Overlay */}
                                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/products/${product.id}`}
                                                className="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex items-center justify-center shadow-lg border hover:scale-105 transition-transform"
                                                style={{ borderColor: "var(--border)" }}
                                                title="Edit Listing"
                                            >
                                                <svg width="14" height="14" style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </Link>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setDeleteModalId(product.id);
                                                }}
                                                className="w-8 h-8 rounded-xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                                                title="Delete Listing"
                                            >
                                                <svg width="14" height="14" style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[9px] font-bold uppercase tracking-wider truncate max-w-[100px]" style={{ color: "var(--primary)" }}>
                                                {product.category}
                                            </span>
                                            <span
                                                className="text-[10px] font-bold"
                                                style={{ color: product.stockQuantity < 5 ? '#EF4444' : 'var(--text-muted)' }}
                                            >
                                                {product.stockQuantity} in stock
                                            </span>
                                        </div>

                                        <Link href={`/admin/products/${product.id}`}>
                                            <h3
                                                className="text-sm font-bold truncate hover:underline mb-2"
                                                style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
                                                title={product.name}
                                            >
                                                {product.name}
                                            </h3>
                                        </Link>
                                    </div>
                                </div>

                                {/* Price and Stock Footer */}
                                <div className="px-4 pb-4 pt-2 border-t flex justify-between items-center" style={{ borderColor: "var(--border)" }}>
                                    <p className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
                                        ₦{product.price.toLocaleString()}
                                    </p>
                                    <span
                                        className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
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
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteModalId !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                        <div
                            className="w-full max-w-sm p-6 rounded-3xl border shadow-2xl animate-scaleUp"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                borderColor: "var(--border)"
                            }}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                                <svg width="24" height="24" style={{ width: "24px", height: "24px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-center mb-1" style={{ color: "var(--text)" }}>
                                Delete Product?
                            </h3>
                            <p className="text-xs text-center mb-6" style={{ color: "var(--text-muted)" }}>
                                Are you sure you want to delete this gadget from the active catalog? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteModalId(null)}
                                    disabled={deleting}
                                    className="flex-1 py-2.5 rounded-xl text-xs font-bold border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {deleting ? "Deleting..." : "Yes, Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

