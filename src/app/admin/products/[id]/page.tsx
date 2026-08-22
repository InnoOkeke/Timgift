"use client";

import { useState, useEffect, use } from "react";
import AdminSidebar from "@/components/AdminSidebar";
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
    const [mediaItems, setMediaItems] = useState<{ url: string; type: "image" | "video" }[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "IPHONE",
        price: "",
        description: "",
        status: "IN_STOCK",
        stockQuantity: "10",
        featured: false,
        limitedTimeDeal: false,
    });

    const CATEGORIES = ["IPHONE", "ANDROID", "MACBOOK", "IPAD", "VIDEO GAMES CONSOLES", "SMARTWATCHES", "WINDOWS LAPTOPS", "AIRPODS"];

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/products/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    name: data.name,
                    category: data.category,
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (mediaItems.length === 0) {
            showToast("Please upload at least one product image or video.", "error");
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
                showToast("Product updated successfully", "success");
                router.push('/admin/products');
                router.refresh();
            } else {
                showToast("Failed to update product", "error");
            }
        } catch (error) {
            console.error("Update Product Error:", error);
            showToast("Error updating product", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
                <AdminSidebar />
                <main className="flex-1 ml-64 flex flex-col items-center justify-center p-12">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                        Loading gadget configuration...
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-64 p-6 lg:p-8 max-w-6xl">
                {/* Top Breadcrumbs & Title */}
                <header className="mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                    <nav className="flex items-center gap-2 mb-2 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                        <Link href="/admin/products" className="hover:underline" style={{ color: "var(--primary)" }}>
                            Catalog
                        </Link>
                        <span className="opacity-40">/</span>
                        <span style={{ color: "var(--text)" }}>Edit Gadget #{id}</span>
                    </nav>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1
                                className="text-2xl font-bold tracking-tight mb-0.5"
                                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                            >
                                Edit Product Listing
                            </h1>
                            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                Modify specifications, pricing, inventory stock, and media gallery.
                            </p>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: General Info & Media (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Product Information Card */}
                            <div
                                className="p-7 rounded-3xl border shadow-sm"
                                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                            >
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                                        General Information
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                                            Product Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Apple iPhone 15 Pro Max 256GB"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all"
                                            style={{
                                                backgroundColor: "var(--bg)",
                                                borderColor: "var(--border)",
                                                color: "var(--text)"
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = "var(--primary)";
                                                e.target.style.boxShadow = "0 0 0 3px rgba(22, 163, 74, 0.15)";
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = "var(--border)";
                                                e.target.style.boxShadow = "none";
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                                            Description & Specs <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            name="description"
                                            rows={6}
                                            placeholder="Highlight device condition, battery health, accessories included, storage capacity, and warranty..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all resize-none leading-relaxed"
                                            style={{
                                                backgroundColor: "var(--bg)",
                                                borderColor: "var(--border)",
                                                color: "var(--text)"
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = "var(--primary)";
                                                e.target.style.boxShadow = "0 0 0 3px rgba(22, 163, 74, 0.15)";
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = "var(--border)";
                                                e.target.style.boxShadow = "none";
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media Assets Card */}
                            <div
                                className="p-7 rounded-3xl border shadow-sm"
                                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                                            Media Gallery ({mediaItems.length})
                                        </h2>
                                    </div>
                                    <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
                                        First image is primary
                                    </span>
                                </div>

                                {mediaItems.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-5">
                                        {mediaItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className="group relative aspect-square rounded-2xl overflow-hidden border shadow-sm"
                                                style={{
                                                    borderColor: index === 0 ? "var(--primary)" : "var(--border)",
                                                    backgroundColor: "var(--bg)"
                                                }}
                                            >
                                                {item.type === "image" ? (
                                                    <img src={item.url} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <video src={item.url} className="w-full h-full object-cover" />
                                                )}

                                                {index === 0 && (
                                                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-primary text-white shadow-sm pointer-events-none">
                                                        Cover
                                                    </span>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => removeMedia(index)}
                                                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md opacity-90 hover:opacity-100 hover:scale-110 transition-all text-xs"
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

                        {/* Right Column: Pricing, Inventory & Settings (5 cols) */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Pricing & Stock Card */}
                            <div
                                className="p-7 rounded-3xl border shadow-sm"
                                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                            >
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                                        Inventory & Pricing
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    {/* Price Input */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                                            Price (₦ Naira) <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm" style={{ color: "var(--text-muted)" }}>
                                                ₦
                                            </span>
                                            <input
                                                required
                                                type="number"
                                                name="price"
                                                placeholder="0.00"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="w-full pl-9 pr-4 py-3 rounded-xl font-bold text-lg border outline-none transition-all"
                                                style={{
                                                    backgroundColor: "var(--bg)",
                                                    borderColor: "var(--border)",
                                                    color: "var(--text)"
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = "var(--primary)";
                                                    e.target.style.boxShadow = "0 0 0 3px rgba(22, 163, 74, 0.15)";
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = "var(--border)";
                                                    e.target.style.boxShadow = "none";
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Stock Quantity */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                                            Stock Quantity Available <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            required
                                            type="number"
                                            name="stockQuantity"
                                            placeholder="10"
                                            value={formData.stockQuantity}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl text-sm font-semibold border outline-none transition-all"
                                            style={{
                                                backgroundColor: "var(--bg)",
                                                borderColor: "var(--border)",
                                                color: "var(--text)"
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = "var(--primary)";
                                                e.target.style.boxShadow = "0 0 0 3px rgba(22, 163, 74, 0.15)";
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = "var(--border)";
                                                e.target.style.boxShadow = "none";
                                            }}
                                        />
                                    </div>

                                    {/* Category Select */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 pr-10 rounded-xl text-sm font-semibold border outline-none transition-all appearance-none cursor-pointer"
                                                style={{
                                                    backgroundColor: "var(--bg)",
                                                    borderColor: "var(--border)",
                                                    color: "var(--text)"
                                                }}
                                            >
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <svg className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Status Select */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>
                                            Listing Status
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 pr-10 rounded-xl text-sm font-semibold border outline-none transition-all appearance-none cursor-pointer"
                                                style={{
                                                    backgroundColor: "var(--bg)",
                                                    borderColor: "var(--border)",
                                                    color: "var(--text)"
                                                }}
                                            >
                                                <option value="IN_STOCK">In Stock (Immediate Dispatch)</option>
                                                <option value="PRE_ORDER">Pre-Order (Book in Advance)</option>
                                            </select>
                                            <svg className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visibility & Badges Card */}
                            <div
                                className="p-7 rounded-3xl border shadow-sm space-y-4"
                                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                                        Promotional Badges
                                    </h2>
                                </div>

                                {/* Featured Toggle */}
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                                    className="flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5"
                                    style={{
                                        borderColor: formData.featured ? "rgba(22, 163, 74, 0.4)" : "var(--border)",
                                        backgroundColor: formData.featured ? "rgba(22, 163, 74, 0.05)" : "var(--bg)"
                                    }}
                                >
                                    <div>
                                        <p className="text-xs font-bold flex items-center gap-1.5" style={{ color: "var(--text)" }}>
                                            <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                            <span>Featured Product</span>
                                        </p>
                                        <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Highlight in Trending & Homepage</p>
                                    </div>
                                    <div
                                        className="w-11 h-6 rounded-full transition-colors relative flex-shrink-0"
                                        style={{ backgroundColor: formData.featured ? "var(--primary)" : "var(--border)" }}
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all"
                                            style={{ left: formData.featured ? "22px" : "2px" }}
                                        />
                                    </div>
                                </div>

                                {/* Limited Time Deal Toggle */}
                                <div
                                    onClick={() => setFormData(prev => ({ ...prev, limitedTimeDeal: !prev.limitedTimeDeal }))}
                                    className="flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5"
                                    style={{
                                        borderColor: formData.limitedTimeDeal ? "rgba(220, 38, 38, 0.4)" : "var(--border)",
                                        backgroundColor: formData.limitedTimeDeal ? "rgba(220, 38, 38, 0.05)" : "var(--bg)"
                                    }}
                                >
                                    <div>
                                        <p className="text-xs font-bold flex items-center gap-1.5" style={{ color: "var(--text)" }}>
                                            <svg className="w-3.5 h-3.5 text-rose-500 fill-current" viewBox="0 0 24 24">
                                                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                                            </svg>
                                            <span>Limited Time Deal</span>
                                        </p>
                                        <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>Showcase in Flash Sale Deals</p>
                                    </div>
                                    <div
                                        className="w-11 h-6 rounded-full transition-colors relative flex-shrink-0"
                                        style={{ backgroundColor: formData.limitedTimeDeal ? "#DC2626" : "var(--border)" }}
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all"
                                            style={{ left: formData.limitedTimeDeal ? "22px" : "2px" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
                                    style={{
                                        background: "linear-gradient(135deg, var(--primary) 0%, #15803D 100%)",
                                        boxShadow: "0 8px 24px -4px rgba(22, 163, 74, 0.45)"
                                    }}
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Saving Updates...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/admin/products"
                                    className="w-full py-3.5 px-6 rounded-2xl font-semibold text-xs border text-center block transition-all hover:bg-black/5 dark:hover:bg-white/5"
                                    style={{
                                        borderColor: "var(--border)",
                                        backgroundColor: "transparent",
                                        color: "var(--text-secondary)"
                                    }}
                                >
                                    Cancel & Return
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

