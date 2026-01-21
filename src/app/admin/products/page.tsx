"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { Product } from "@/types";
import { useToast } from "@/components/Toast";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { showToast } = useToast();

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

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
                showToast("Product deleted successfully", "success");
            }
        } catch (error) {
            showToast("Failed to delete product", "error");
        }
    };

    const filteredProducts = products.filter((p: Product) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-72 p-12 pt-20">
                <header className="flex justify-between items-center mb-16">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                            <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--primary)" }}></span>
                            <span>Inventory Management</span>
                        </div>
                        <h1
                            className="text-3xl font-bold mb-2"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                        >
                            Products Catalog
                        </h1>
                        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
                            Manage your gadgets inventory and live listings.
                        </p>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="btn btn-primary px-8 py-4 flex items-center gap-3 shadow-lg hover:shadow-primary/30"
                    >
                        <span className="text-xl">+</span>
                        <span>Add New Product</span>
                    </Link>
                </header>

                <div className="mb-12">
                    <div className="max-w-[300px]">
                        <input
                            type="text"
                            placeholder="Search gadgets..."
                            className="w-full px-4 py-2 rounded-xl border focus:outline-none transition-all text-sm font-medium shadow-sm"
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
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(i => (
                            <div key={i} className="aspect-square rounded-xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }}></div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-20 text-center rounded-2xl border border-dashed" style={{ borderColor: "var(--border)" }}>
                        <div className="text-5xl mb-4 opacity-20">📱</div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>No gadgets found</h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try adjusting your search or add a new product.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1"
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    borderColor: "var(--border)"
                                }}
                            >
                                {/* Delete Button - Top Right */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDelete(product.id);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        zIndex: 100,
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: '#EF4444',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#DC2626';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#EF4444';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    title="Delete Product"
                                >
                                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>

                                {/* Uniform Image Container */}
                                <div className="relative aspect-square w-full overflow-hidden bg-white/5 border-b" style={{ borderColor: "var(--border)" }}>
                                    <Link href={`/admin/products/${product.id}`} className="block w-full h-full">
                                        <img
                                            src={product.media?.[0]?.url || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"}
                                        />
                                    </Link>

                                    {/* Featured Badge */}
                                    {product.featured && (
                                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-wider shadow-lg pointer-events-none">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-1.5">
                                        <p className="text-[8px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--primary)" }}>
                                            {product.category}
                                        </p>
                                        <p className="text-[9px] font-semibold" style={{ color: product.stockQuantity < 5 ? '#EF4444' : 'var(--text-muted)' }}>
                                            {product.stockQuantity} stock
                                        </p>
                                    </div>
                                    <h3
                                        className="text-sm font-bold mb-1.5 truncate"
                                        style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
                                    >
                                        {product.name}
                                    </h3>
                                    <div className="flex justify-between items-center pt-2.5 border-t" style={{ borderColor: "var(--border)" }}>
                                        <p className="text-base font-bold" style={{ color: "var(--text)" }}>
                                            ₦{product.price.toLocaleString()}
                                        </p>
                                        <span
                                            className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                                            style={{
                                                backgroundColor: product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                                color: product.status === 'IN_STOCK' ? '#22C55E' : '#EAB308',
                                                border: `1px solid ${product.status === 'IN_STOCK' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`
                                            }}
                                        >
                                            {product.status === 'IN_STOCK' ? 'In Stock' : 'Pre-Order'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
