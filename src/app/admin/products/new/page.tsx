"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import MediaUploader from "@/components/MediaUploader";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import Link from "next/link";

export default function NewProduct() {
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [mediaItems, setMediaItems] = useState<{ url: string; type: "image" | "video" }[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "SMARTPHONES",
        price: "",
        description: "",
        status: "IN_STOCK",
        stockQuantity: "10",
        featured: false,
    });

    const CATEGORIES = ["SMARTPHONES", "SMARTWATCHES", "COMPUTERS", "SMART GADGETS", "FASHION"];

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
            showToast("Please upload at least one product image.", "error");
            return;
        }
        setLoading(true);

        try {
            const productData = {
                ...formData,
                media: mediaItems
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                showToast("Product created successfully", "success");
                router.push('/admin/products');
                router.refresh();
            } else {
                showToast("Failed to create product", "error");
            }
        } catch (error) {
            console.error("Create Product Error:", error);
            showToast("Error creating product", "error");
        } finally {
            setLoading(false);
        }
    };

    // Apple-inspired input styles
    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '14px 18px',
        fontSize: '15px',
        fontWeight: 400,
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        color: 'var(--text)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        outline: 'none',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: '8px',
        letterSpacing: '-0.01em',
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: '24px',
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
            <AdminSidebar />

            <main style={{ flex: 1, marginLeft: '288px', padding: '40px 56px' }}>
                <div style={{ maxWidth: '1100px' }}>
                    {/* Header */}
                    <header style={{ marginBottom: '48px' }}>
                        {/* Breadcrumb */}
                        <nav style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '20px',
                            fontSize: '13px',
                            fontWeight: 500,
                        }}>
                            <Link
                                href="/admin/products"
                                style={{
                                    color: 'var(--text-muted)',
                                    textDecoration: 'none',
                                    transition: 'color 0.15s ease',
                                }}
                            >
                                Products
                            </Link>
                            <svg style={{ width: '14px', height: '14px', color: 'var(--text-muted)', opacity: 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span style={{ color: 'var(--text)' }}>New Product</span>
                        </nav>

                        <h1 style={{
                            fontSize: '32px',
                            fontWeight: 700,
                            color: 'var(--text)',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.025em',
                            marginBottom: '8px',
                        }}>
                            Add New Product
                        </h1>
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--text-secondary)',
                            fontWeight: 400,
                        }}>
                            Create a new product listing for your store.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 380px',
                            gap: '32px',
                            alignItems: 'start',
                        }}>
                            {/* Left Column - Main Details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Product Information Card */}
                                <div style={cardStyle}>
                                    <h3 style={sectionTitleStyle}>Product Information</h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div>
                                            <label style={labelStyle}>Product Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                placeholder="Enter product name"
                                                style={inputStyle}
                                                value={formData.name}
                                                onChange={handleChange}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = 'var(--primary)';
                                                    e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'var(--border)';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label style={labelStyle}>Description</label>
                                            <textarea
                                                required
                                                name="description"
                                                rows={5}
                                                placeholder="Describe your product..."
                                                style={{
                                                    ...inputStyle,
                                                    resize: 'none',
                                                    lineHeight: 1.6,
                                                }}
                                                value={formData.description}
                                                onChange={handleChange}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = 'var(--primary)';
                                                    e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'var(--border)';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Media Card */}
                                <div style={cardStyle}>
                                    <h3 style={sectionTitleStyle}>Product Media</h3>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                        gap: '12px',
                                        marginBottom: mediaItems.length > 0 ? '20px' : '0',
                                    }}>
                                        {mediaItems.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    position: 'relative',
                                                    aspectRatio: '1',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    border: '1px solid var(--border)',
                                                    backgroundColor: 'var(--bg)',
                                                }}
                                            >
                                                {item.type === 'image' ? (
                                                    <img src={item.url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeMedia(index)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '6px',
                                                        right: '6px',
                                                        width: '24px',
                                                        height: '24px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                                        color: 'white',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '12px',
                                                        transition: 'background-color 0.15s ease',
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <MediaUploader onUploadComplete={handleUploadComplete} />

                                    <p style={{
                                        fontSize: '12px',
                                        color: 'var(--text-muted)',
                                        marginTop: '16px',
                                        opacity: 0.7,
                                    }}>
                                        Recommended: High-quality images (max 2MB), Videos (max 5MB)
                                    </p>
                                </div>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div style={{
                                position: 'sticky',
                                top: '40px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px'
                            }}>
                                {/* Inventory & Pricing Card */}
                                <div style={cardStyle}>
                                    <h3 style={sectionTitleStyle}>Inventory & Pricing</h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {/* Status */}
                                        <div>
                                            <label style={labelStyle}>Status</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    name="status"
                                                    style={{
                                                        ...inputStyle,
                                                        appearance: 'none',
                                                        cursor: 'pointer',
                                                        paddingRight: '44px',
                                                    }}
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                >
                                                    <option value="IN_STOCK">In Stock</option>
                                                    <option value="PRE_ORDER">Pre-Order</option>
                                                </select>
                                                <div style={{
                                                    position: 'absolute',
                                                    right: '16px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    pointerEvents: 'none',
                                                    color: 'var(--text-muted)',
                                                }}>
                                                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label style={labelStyle}>Category</label>
                                            <div style={{ position: 'relative' }}>
                                                <select
                                                    name="category"
                                                    style={{
                                                        ...inputStyle,
                                                        appearance: 'none',
                                                        cursor: 'pointer',
                                                        paddingRight: '44px',
                                                    }}
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                >
                                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                                <div style={{
                                                    position: 'absolute',
                                                    right: '16px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    pointerEvents: 'none',
                                                    color: 'var(--text-muted)',
                                                }}>
                                                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '4px 0' }} />

                                        {/* Stock */}
                                        <div>
                                            <label style={labelStyle}>Stock Quantity</label>
                                            <input
                                                required
                                                type="number"
                                                name="stockQuantity"
                                                placeholder="0"
                                                style={inputStyle}
                                                value={formData.stockQuantity}
                                                onChange={handleChange}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = 'var(--primary)';
                                                    e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'var(--border)';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label style={labelStyle}>Price (₦)</label>
                                            <input
                                                required
                                                type="number"
                                                name="price"
                                                placeholder="0.00"
                                                style={{
                                                    ...inputStyle,
                                                    fontSize: '20px',
                                                    fontWeight: 600,
                                                    textAlign: 'center',
                                                    padding: '18px',
                                                }}
                                                value={formData.price}
                                                onChange={handleChange}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = 'var(--primary)';
                                                    e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'var(--border)';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                        </div>

                                        <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '4px 0' }} />

                                        {/* Featured Toggle */}
                                        <div
                                            onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                padding: '8px 0',
                                            }}
                                        >
                                            <div>
                                                <p style={{
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    color: 'var(--text)',
                                                    marginBottom: '2px',
                                                }}>
                                                    Featured Product
                                                </p>
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: 'var(--text-muted)',
                                                }}>
                                                    Show on homepage
                                                </p>
                                            </div>
                                            <div style={{
                                                width: '44px',
                                                height: '26px',
                                                borderRadius: '13px',
                                                backgroundColor: formData.featured ? 'var(--primary)' : 'var(--border)',
                                                position: 'relative',
                                                transition: 'background-color 0.2s ease',
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '3px',
                                                    left: formData.featured ? '21px' : '3px',
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'white',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                    transition: 'left 0.2s ease',
                                                }} />
                                                <input
                                                    type="checkbox"
                                                    name="featured"
                                                    checked={formData.featured}
                                                    onChange={handleChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            padding: '16px 24px',
                                            fontSize: '15px',
                                            fontWeight: 600,
                                            backgroundColor: 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            opacity: loading ? 0.7 : 1,
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!loading) {
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(22, 163, 74, 0.4)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
                                        }}
                                    >
                                        {loading ? "Creating..." : "Create Product"}
                                    </button>

                                    <Link
                                        href="/admin/products"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '14px 24px',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: 'var(--text-secondary)',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border)',
                                            transition: 'all 0.15s ease',
                                            backgroundColor: 'transparent',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                                            e.currentTarget.style.borderColor = 'var(--text-muted)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                        }}
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
