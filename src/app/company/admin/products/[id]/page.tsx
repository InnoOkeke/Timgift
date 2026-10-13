"use client";

import { useState, useEffect, useRef, use } from "react";
import AdminNavbar from "@/components/AdminNavbar";
import MediaUploader from "@/components/MediaUploader";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import Link from "next/link";

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { showToast } = useToast();
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [mediaItems, setMediaItems] = useState<{ url: string; type: "image" | "video" }[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "IPHONES",
        price: "",
        description: "",
        status: "IN_STOCK",
        stockQuantity: "10",
        featured: false,
        limitedTimeDeal: false,
    });

    const CATEGORIES = [
        {
            id: "IPHONES",
            label: "iPhones",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: "ANDROID",
            label: "Android Smartphones",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: "MACBOOK",
            label: "Apple MacBook",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: "TABLETS",
            label: "iPads & Tablets",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
            )
        },
        {
            id: "WINDOWS LAPTOPS",
            label: "Windows Laptops",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: "SMARTWATCHES",
            label: "Smartwatches & Bands",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: "AIRPODS",
            label: "AirPods & Audio Gear",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            )
        },
        {
            id: "ACCESSORIES",
            label: "Chargers & Accessories",
            icon: (
                <svg className="w-4.5 h-4.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setCategoryOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/products/${id}`);
            if (res.ok) {
                const data = await res.json();
                let productCategory = data.category;
                if (productCategory === "IPAD") productCategory = "TABLETS";
                if (productCategory === "IPHONE") productCategory = "IPHONES";

                setFormData({
                    name: data.name,
                    category: productCategory,
                    price: data.price.toString(),
                    description: data.description,
                    status: data.status,
                    stockQuantity: data.stockQuantity.toString(),
                    featured: data.featured || false,
                    limitedTimeDeal: data.limitedTimeDeal || false,
                });
                setMediaItems(data.media || []);
            }
        } catch (error) {
            console.error("Fetch Product Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const selectedCategoryObj = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadComplete = (url: string, type: "image" | "video") => {
        setMediaItems(prev => [...prev, { url, type }]);
    };

    const removeMedia = (index: number) => {
        setMediaItems(prev => prev.filter((_, i) => i !== index));
    };

    const adjustStock = (delta: number) => {
        const current = parseInt(formData.stockQuantity) || 0;
        const next = Math.max(0, current + delta);
        setFormData(prev => ({ ...prev, stockQuantity: next.toString() }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mediaItems.length === 0) {
            showToast("Please upload at least one gadget image or video.", "error");
            return;
        }
        setSaving(true);

        try {
            const productData = {
                ...formData,
                media: mediaItems
            };

            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                showToast("Product updated successfully!", "success");
                router.push('/company/admin/products');
                router.refresh();
            } else {
                showToast("Failed to update product.", "error");
            }
        } catch (error) {
            console.error("Update Product Error:", error);
            showToast("Error updating product.", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast("Product permanently deleted.", "success");
                router.push('/company/admin/products');
                router.refresh();
            } else {
                showToast("Failed to delete product.", "error");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            showToast("Failed to delete product.", "error");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
                <AdminNavbar />
                <main className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Loading gadget configuration...
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
            <AdminNavbar />

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-16" style={{ maxWidth: "1280px", marginLeft: "auto", marginRight: "auto" }}>
                {/* Header Breadcrumbs & Action Bar */}
                <header
                    style={{
                        marginBottom: "32px",
                        paddingBottom: "24px",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "16px"
                    }}
                >
                    <div>
                        <nav style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "12px", fontWeight: "700" }}>
                            <Link href="/company/admin/products" style={{ color: "#16A34A", textDecoration: "none" }}>
                                Products Catalog
                            </Link>
                            <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>/</span>
                            <span style={{ color: "var(--text)" }}>Edit Gadget #{id}</span>
                        </nav>
                        <h1
                            style={{
                                fontSize: "26px",
                                fontWeight: "900",
                                letterSpacing: "-0.02em",
                                color: "var(--text)",
                                fontFamily: "var(--font-display)",
                                margin: 0
                            }}
                        >
                            {formData.name || `Edit Gadget #${id}`}
                        </h1>
                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px", margin: 0 }}>
                            Update stock quantity, adjust price points, refresh photos, or remove this listing.
                        </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        {/* Prominent Ruby Danger Button */}
                        <button
                            type="button"
                            onClick={() => setDeleteModalOpen(true)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                height: "42px",
                                padding: "0 16px",
                                borderRadius: "12px",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "-0.01em",
                                border: "1px solid rgba(239, 68, 68, 0.25)",
                                backgroundColor: "rgba(239, 68, 68, 0.08)",
                                color: "#EF4444",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#EF4444";
                                e.currentTarget.style.color = "#FFFFFF";
                                e.currentTarget.style.borderColor = "#EF4444";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.08)";
                                e.currentTarget.style.color = "#EF4444";
                                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.25)";
                            }}
                            title="Delete this product"
                        >
                            <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                        </button>

                        <Link
                            href="/company/admin/products"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "42px",
                                padding: "0 18px",
                                borderRadius: "12px",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "-0.01em",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--bg-secondary)",
                                color: "var(--text)",
                                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                                textDecoration: "none",
                                cursor: "pointer",
                                transition: "all 0.15s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.borderColor = "var(--border-strong)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "var(--border)";
                            }}
                        >
                            Cancel
                        </Link>

                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                height: "42px",
                                padding: "0 20px",
                                borderRadius: "12px",
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "-0.01em",
                                color: "#FFFFFF",
                                background: "linear-gradient(180deg, #16A34A 0%, #15803D 100%)",
                                border: "1px solid rgba(22, 163, 74, 0.9)",
                                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 14px -1px rgba(22, 163, 74, 0.42), 0 1px 2px rgba(0, 0, 0, 0.06)",
                                cursor: saving ? "not-allowed" : "pointer",
                                opacity: saving ? 0.6 : 1,
                                transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                                userSelect: "none"
                            }}
                            onMouseEnter={(e) => {
                                if (!saving) {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.36), 0 6px 20px -1px rgba(22, 163, 74, 0.52)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!saving) {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 14px -1px rgba(22, 163, 74, 0.42), 0 1px 2px rgba(0, 0, 0, 0.06)";
                                }
                            }}
                        >
                            {saving ? (
                                <>
                                    <div style={{ width: "14px", height: "14px", border: "2px solid #FFFFFF", borderTopColor: "transparent", borderRadius: "9999px", animation: "spin 1s linear infinite" }} />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <span
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "6px",
                                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg style={{ width: "12px", height: "12px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="admin-form-layout" style={{ display: "grid", gap: "24px", alignItems: "start" }}>
                        {/* Main Column: Details & Media */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                            {/* Card 1: Product Information */}
                            <div
                                className="admin-form-card"
                                style={{
                                    padding: "24px 28px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03), 0 6px 20px -3px rgba(0, 0, 0, 0.02)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px"
                                }}
                            >
                                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                    <div>
                                        <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#16A34A", display: "inline-block", flexShrink: 0 }} />
                                            Product Information
                                        </h2>
                                        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px", margin: 0 }}>
                                            Model specifications, title, and categorization
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "800",
                                            letterSpacing: "0.04em",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            backgroundColor: "rgba(22, 163, 74, 0.12)",
                                            color: "#16A34A",
                                            border: "1px solid rgba(22, 163, 74, 0.25)"
                                        }}
                                    >
                                        ID #{id}
                                    </span>
                                </div>

                                {/* Title Field */}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "8px" }}>
                                        Product Title & Model <span style={{ color: "#EF4444" }}>*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="e.g. iPhone 15 Pro Max 256GB Natural Titanium"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            height: "46px",
                                            padding: "0 16px",
                                            borderRadius: "12px",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            border: "1px solid var(--border)",
                                            backgroundColor: "var(--bg)",
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
                                </div>

                                {/* Category Dropdown Menu */}
                                <div style={{ position: "relative" }} ref={dropdownRef}>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "8px" }}>
                                        Device Category <span style={{ color: "#EF4444" }}>*</span>
                                    </label>

                                    {/* Dropdown Trigger */}
                                    <button
                                        type="button"
                                        onClick={() => setCategoryOpen(!categoryOpen)}
                                        style={{
                                            width: "100%",
                                            height: "46px",
                                            padding: "0 16px",
                                            borderRadius: "12px",
                                            border: categoryOpen ? "1px solid #16A34A" : "1px solid var(--border)",
                                            backgroundColor: "var(--bg)",
                                            boxShadow: categoryOpen ? "0 0 0 3px rgba(22, 163, 74, 0.15)" : "0 1px 2px rgba(0, 0, 0, 0.02)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            transition: "all 0.15s ease"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                                            <div
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    borderRadius: "8px",
                                                    backgroundColor: "rgba(22, 163, 74, 0.1)",
                                                    color: "#16A34A",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0
                                                }}
                                            >
                                                {selectedCategoryObj.icon}
                                            </div>
                                            <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {selectedCategoryObj.label}
                                            </span>
                                        </div>

                                        <svg
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                flexShrink: 0,
                                                color: categoryOpen ? "#16A34A" : "var(--text-muted)",
                                                transform: categoryOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.2s ease"
                                            }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Floating Dropdown List Panel */}
                                    {categoryOpen && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "calc(100% + 8px)",
                                                left: 0,
                                                right: 0,
                                                zIndex: 50,
                                                borderRadius: "16px",
                                                border: "1px solid var(--border)",
                                                boxShadow: "0 16px 40px -8px rgba(0, 0, 0, 0.18)",
                                                backgroundColor: "var(--bg)",
                                                padding: "8px"
                                            }}
                                        >
                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "6px", maxHeight: "280px", overflowY: "auto" }}>
                                                {CATEGORIES.map((cat) => {
                                                    const isSelected = formData.category.toUpperCase() === cat.id;
                                                    return (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, category: cat.id }));
                                                                setCategoryOpen(false);
                                                            }}
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                                padding: "10px 12px",
                                                                borderRadius: "10px",
                                                                border: isSelected ? "1px solid rgba(22, 163, 74, 0.4)" : "1px solid transparent",
                                                                backgroundColor: isSelected ? "#16A34A" : "transparent",
                                                                color: isSelected ? "#FFFFFF" : "var(--text)",
                                                                cursor: "pointer",
                                                                textAlign: "left",
                                                                transition: "all 0.15s ease"
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                if (!isSelected) {
                                                                    e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (!isSelected) {
                                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                                }
                                                            }}
                                                        >
                                                            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                                                                <span style={{ color: isSelected ? "#FFFFFF" : "#16A34A", flexShrink: 0 }}>
                                                                    {cat.icon}
                                                                </span>
                                                                <span style={{ fontSize: "13px", fontWeight: isSelected ? "800" : "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                    {cat.label}
                                                                </span>
                                                            </div>

                                                            {isSelected && (
                                                                <svg style={{ width: "16px", height: "16px", color: "#FFFFFF", flexShrink: 0, marginLeft: "8px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "8px" }}>
                                        Detailed Description & Specs <span style={{ color: "#EF4444" }}>*</span>
                                    </label>
                                    <textarea
                                        required
                                        name="description"
                                        rows={6}
                                        placeholder="Highlight device condition, battery health percentage, storage size, carrier lock status, accessories in box, and warranty details..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            minHeight: "150px",
                                            padding: "14px 16px",
                                            borderRadius: "12px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            lineHeight: "1.6",
                                            border: "1px solid var(--border)",
                                            backgroundColor: "var(--bg)",
                                            color: "var(--text)",
                                            outline: "none",
                                            resize: "vertical",
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
                                </div>
                            </div>

                            {/* Card 2: Media Assets & Studio Thumbnails */}
                            <div
                                className="admin-form-card"
                                style={{
                                    padding: "24px 28px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03), 0 6px 20px -3px rgba(0, 0, 0, 0.02)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "18px"
                                }}
                            >
                                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                    <div>
                                        <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#16A34A", display: "inline-block", flexShrink: 0 }} />
                                            Media Gallery
                                        </h2>
                                        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px", margin: 0 }}>
                                            High-resolution device photos & video footage
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "800",
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            backgroundColor: "rgba(22, 163, 74, 0.1)",
                                            color: "#16A34A",
                                            border: "1px solid rgba(22, 163, 74, 0.2)"
                                        }}
                                    >
                                        {mediaItems.length} Uploaded
                                    </span>
                                </div>

                                {/* Compact Studio Thumbnails */}
                                {mediaItems.length > 0 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "12px",
                                            padding: "12px",
                                            borderRadius: "14px",
                                            border: "1px solid var(--border)",
                                            backgroundColor: "var(--bg)"
                                        }}
                                    >
                                        {mediaItems.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: "relative",
                                                    width: "88px",
                                                    height: "88px",
                                                    borderRadius: "12px",
                                                    overflow: "hidden",
                                                    border: index === 0 ? "2px solid #16A34A" : "1px solid var(--border)",
                                                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                                                    backgroundColor: "var(--bg-secondary)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0
                                                }}
                                            >
                                                {item.type === "image" ? (
                                                    <img src={item.url} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                                                ) : (
                                                    <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                )}

                                                {/* Micro Cover Badge */}
                                                {index === 0 && (
                                                    <span
                                                        style={{
                                                            position: "absolute",
                                                            bottom: "4px",
                                                            left: "4px",
                                                            padding: "2px 5px",
                                                            borderRadius: "4px",
                                                            fontSize: "8px",
                                                            fontWeight: "900",
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.06em",
                                                            backgroundColor: "#16A34A",
                                                            color: "#FFFFFF",
                                                            pointerEvents: "none"
                                                        }}
                                                    >
                                                        Cover
                                                    </span>
                                                )}

                                                {/* Micro Delete Action Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeMedia(index)}
                                                    style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        width: "22px",
                                                        height: "22px",
                                                        borderRadius: "9999px",
                                                        backgroundColor: "#DC2626",
                                                        color: "#FFFFFF",
                                                        border: "none",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "10px",
                                                        fontWeight: "900",
                                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                                        cursor: "pointer",
                                                        transition: "transform 0.15s ease"
                                                    }}
                                                    title="Remove asset"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <MediaUploader onUploadComplete={handleUploadComplete} />
                            </div>
                        </div>

                        {/* Sidebar Column: Pricing, Inventory & Merchandising */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                            {/* Card 3: Pricing & Inventory */}
                            <div
                                className="admin-form-card"
                                style={{
                                    padding: "24px 28px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03), 0 6px 20px -3px rgba(0, 0, 0, 0.02)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "18px"
                                }}
                            >
                                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                                    <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#16A34A", display: "inline-block", flexShrink: 0 }} />
                                        Pricing & Stock
                                    </h2>
                                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px", margin: 0 }}>
                                        Commercial valuation & available quantity
                                    </p>
                                </div>

                                {/* Price Input with Integrated Currency Badge */}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "8px" }}>
                                        Selling Price <span style={{ color: "#EF4444" }}>*</span>
                                    </label>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: "12px",
                                            border: "1px solid var(--border)",
                                            backgroundColor: "var(--bg)",
                                            overflow: "hidden",
                                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                                            height: "46px"
                                        }}
                                    >
                                        <div
                                            style={{
                                                padding: "0 16px",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "16px",
                                                fontWeight: "800",
                                                backgroundColor: "var(--bg-secondary)",
                                                borderRight: "1px solid var(--border)",
                                                color: "var(--text)",
                                                userSelect: "none",
                                                flexShrink: 0
                                            }}
                                        >
                                            ₦
                                        </div>
                                        <input
                                            required
                                            type="number"
                                            name="price"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={handleChange}
                                            style={{
                                                flex: 1,
                                                minWidth: 0,
                                                width: "100%",
                                                height: "100%",
                                                padding: "0 14px",
                                                fontSize: "18px",
                                                fontWeight: "800",
                                                border: "none",
                                                outline: "none",
                                                backgroundColor: "transparent",
                                                color: "var(--text)",
                                                fontFamily: "var(--font-display)"
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Stock Quantity Stepper - Unified non-overflowing capsule */}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "8px" }}>
                                        Stock Level (Units) <span style={{ color: "#EF4444" }}>*</span>
                                    </label>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: "12px",
                                            border: "1px solid var(--border)",
                                            backgroundColor: "var(--bg)",
                                            overflow: "hidden",
                                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.02)",
                                            height: "44px",
                                            width: "100%"
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => adjustStock(-1)}
                                            style={{
                                                width: "44px",
                                                height: "100%",
                                                border: "none",
                                                borderRight: "1px solid var(--border)",
                                                backgroundColor: "var(--bg-secondary)",
                                                color: "var(--text)",
                                                fontSize: "18px",
                                                fontWeight: "800",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                transition: "background-color 0.15s ease",
                                                userSelect: "none"
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
                                        >
                                            −
                                        </button>
                                        <input
                                            required
                                            type="number"
                                            name="stockQuantity"
                                            value={formData.stockQuantity}
                                            onChange={handleChange}
                                            style={{
                                                flex: 1,
                                                minWidth: 0,
                                                width: "100%",
                                                height: "100%",
                                                textAlign: "center",
                                                fontSize: "16px",
                                                fontWeight: "800",
                                                border: "none",
                                                outline: "none",
                                                backgroundColor: "transparent",
                                                color: "var(--text)",
                                                fontFamily: "var(--font-display)"
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => adjustStock(1)}
                                            style={{
                                                width: "44px",
                                                height: "100%",
                                                border: "none",
                                                borderLeft: "1px solid var(--border)",
                                                backgroundColor: "var(--bg-secondary)",
                                                color: "var(--text)",
                                                fontSize: "18px",
                                                fontWeight: "800",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                transition: "background-color 0.15s ease",
                                                userSelect: "none"
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Fulfillment Mode Segment */}
                                <div>
                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "8px" }}>
                                        Fulfillment Mode
                                    </label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                                        {[
                                            { id: "IN_STOCK", label: "In Stock" },
                                            { id: "PRE_ORDER", label: "Pre-Order" }
                                        ].map((status) => {
                                            const isSelected = formData.status === status.id;
                                            return (
                                                <button
                                                    key={status.id}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, status: status.id }))}
                                                    style={{
                                                        height: "40px",
                                                        padding: "0 12px",
                                                        borderRadius: "10px",
                                                        fontSize: "12px",
                                                        fontWeight: "700",
                                                        letterSpacing: "-0.01em",
                                                        border: isSelected ? "1px solid rgba(22, 163, 74, 0.9)" : "1px solid var(--border)",
                                                        backgroundColor: isSelected ? "#16A34A" : "var(--bg)",
                                                        color: isSelected ? "#FFFFFF" : "var(--text)",
                                                        boxShadow: isSelected ? "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 8px rgba(22, 163, 74, 0.3)" : "none",
                                                        cursor: "pointer",
                                                        transition: "all 0.15s ease"
                                                    }}
                                                >
                                                    {status.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Store Merchandising Toggles */}
                            <div
                                className="admin-form-card"
                                style={{
                                    padding: "24px 28px",
                                    borderRadius: "18px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03), 0 6px 20px -3px rgba(0, 0, 0, 0.02)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "14px"
                                }}
                            >
                                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                                    <h2 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#16A34A", display: "inline-block", flexShrink: 0 }} />
                                        Store Merchandising
                                    </h2>
                                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px", margin: 0 }}>
                                        Promotional tagging & spotlight placement
                                    </p>
                                </div>

                                {/* Featured Toggle */}
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 14px",
                                        borderRadius: "12px",
                                        border: formData.featured ? "1px solid rgba(22, 163, 74, 0.45)" : "1px solid var(--border)",
                                        backgroundColor: formData.featured ? "rgba(22, 163, 74, 0.06)" : "var(--bg)",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease"
                                    }}
                                >
                                    <div>
                                        <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--text)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{ color: "#EAB308" }}>★</span>
                                            <span>Featured Gadget</span>
                                        </p>
                                        <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                                            Elevate to premier homepage shelf
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "22px",
                                            borderRadius: "9999px",
                                            backgroundColor: formData.featured ? "#16A34A" : "var(--border)",
                                            position: "relative",
                                            transition: "background-color 0.2s ease",
                                            flexShrink: 0
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "18px",
                                                height: "18px",
                                                borderRadius: "9999px",
                                                backgroundColor: "#FFFFFF",
                                                position: "absolute",
                                                top: "2px",
                                                left: formData.featured ? "20px" : "2px",
                                                transition: "left 0.2s ease",
                                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)"
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Limited Time Deal Toggle */}
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, limitedTimeDeal: !prev.limitedTimeDeal }))}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 14px",
                                        borderRadius: "12px",
                                        border: formData.limitedTimeDeal ? "1px solid rgba(220, 38, 38, 0.45)" : "1px solid var(--border)",
                                        backgroundColor: formData.limitedTimeDeal ? "rgba(220, 38, 38, 0.06)" : "var(--bg)",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease"
                                    }}
                                >
                                    <div>
                                        <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--text)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{ color: "#EF4444" }}>🔥</span>
                                            <span>Flash Deal Tag</span>
                                        </p>
                                        <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                                            Tag with urgent discount badge
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "22px",
                                            borderRadius: "9999px",
                                            backgroundColor: formData.limitedTimeDeal ? "#DC2626" : "var(--border)",
                                            position: "relative",
                                            transition: "background-color 0.2s ease",
                                            flexShrink: 0
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "18px",
                                                height: "18px",
                                                borderRadius: "9999px",
                                                backgroundColor: "#FFFFFF",
                                                position: "absolute",
                                                top: "2px",
                                                left: formData.limitedTimeDeal ? "20px" : "2px",
                                                transition: "left 0.2s ease",
                                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card 5: Danger Zone Card */}
                            <div
                                className="admin-form-card"
                                style={{
                                    padding: "20px 24px",
                                    borderRadius: "18px",
                                    border: "1px solid rgba(239, 68, 68, 0.25)",
                                    backgroundColor: "rgba(239, 68, 68, 0.03)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px"
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#EF4444" }} />
                                    <h2 style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", color: "#EF4444", margin: 0 }}>
                                        Danger Zone
                                    </h2>
                                </div>
                                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5", margin: 0 }}>
                                    Permanently remove this listing and all associated media from TimGift store.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setDeleteModalOpen(true)}
                                    style={{
                                        width: "100%",
                                        height: "42px",
                                        borderRadius: "12px",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        backgroundColor: "rgba(239, 68, 68, 0.12)",
                                        color: "#DC2626",
                                        border: "1px solid rgba(239, 68, 68, 0.3)",
                                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                        transition: "all 0.15s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#DC2626";
                                        e.currentTarget.style.color = "#FFFFFF";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.12)";
                                        e.currentTarget.style.color = "#DC2626";
                                    }}
                                >
                                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span>Delete Product Listing</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Delete Confirmation Modal */}
                {deleteModalOpen && (
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 60,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px",
                            backgroundColor: "rgba(0, 0, 0, 0.72)",
                            backdropFilter: "blur(8px)"
                        }}
                        onClick={() => !deleting && setDeleteModalOpen(false)}
                    >
                        <div
                            style={{
                                width: "100%",
                                maxWidth: "440px",
                                padding: "28px",
                                borderRadius: "24px",
                                border: "1px solid var(--border)",
                                boxShadow: "0 24px 50px -12px rgba(0, 0, 0, 0.4)",
                                backgroundColor: "var(--bg)",
                                position: "relative"
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "16px",
                                    backgroundColor: "rgba(239, 68, 68, 0.12)",
                                    color: "#DC2626",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 16px auto",
                                    border: "1px solid rgba(239, 68, 68, 0.2)"
                                }}
                            >
                                <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>

                            <h3 style={{ fontSize: "18px", fontWeight: "800", textAlign: "center", margin: "0 0 8px 0", color: "var(--text)" }}>
                                Delete Product #{id}?
                            </h3>
                            <p style={{ fontSize: "13px", textAlign: "center", margin: "0 0 24px 0", color: "var(--text-muted)", lineHeight: "1.5" }}>
                                Are you sure you want to permanently delete <strong style={{ color: "var(--text)" }}>"{formData.name || 'this gadget'}"</strong>? This action cannot be reversed and erases it from the public marketplace.
                            </p>

                            <div style={{ display: "flex", gap: "12px" }}>
                                <button
                                    type="button"
                                    onClick={() => setDeleteModalOpen(false)}
                                    disabled={deleting}
                                    style={{
                                        flex: 1,
                                        height: "44px",
                                        borderRadius: "12px",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        border: "1px solid var(--border)",
                                        backgroundColor: "var(--bg-secondary)",
                                        color: "var(--text)",
                                        cursor: "pointer",
                                        transition: "background-color 0.15s ease"
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    style={{
                                        flex: 1,
                                        height: "44px",
                                        borderRadius: "12px",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        backgroundColor: "#DC2626",
                                        color: "#FFFFFF",
                                        border: "none",
                                        boxShadow: "0 4px 14px rgba(220, 38, 38, 0.35)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                        opacity: deleting ? 0.6 : 1,
                                        transition: "transform 0.15s ease"
                                    }}
                                >
                                    {deleting ? (
                                        <>
                                            <div style={{ width: "14px", height: "14px", border: "2px solid #FFFFFF", borderTopColor: "transparent", borderRadius: "9999px", animation: "spin 1s linear infinite" }} />
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
