"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Invoice from "@/components/Invoice";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/Toast";

export default function CheckoutPage() {
    const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePaystackPayment = async () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.address || items.length === 0) {
            showToast("Please fill in all required fields.", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/payment/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    customerAddress: formData.address,
                    items: items.map(i => ({
                        id: i.product.id,
                        name: i.product.name,
                        price: i.product.price,
                        quantity: i.quantity,
                        media: i.product.media,
                    })),
                    totalAmount: totalAmount,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                showToast(data.error || "Failed to initialize payment.", "error");
                return;
            }

            // Redirect to Paystack's hosted payment page
            window.location.href = data.authorization_url;
        } catch (error) {
            console.error("Payment init error:", error);
            showToast("Something went wrong. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name && formData.email && formData.phone && formData.address && items.length > 0 && !isSubmitting;

    // Apple-inspired input styles
    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '16px 18px',
        fontSize: '15px',
        fontWeight: 400,
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        color: 'var(--text)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        outline: 'none',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: '10px',
        letterSpacing: '-0.01em',
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '24px',
        border: '1px solid var(--border)',
        padding: '28px',
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: '20px',
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}>
            <Navbar />
            <main style={{ flex: 1, paddingTop: '110px' }}>
                {/* Header */}
                <div className="container" style={{ paddingTop: '32px', paddingBottom: '24px' }}>
                    <nav style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '24px',
                        fontSize: '13px',
                        fontWeight: 500
                    }}>
                        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                        <svg style={{ width: '14px', height: '14px', color: 'var(--text-muted)', opacity: 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link href="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Products</Link>
                        <svg style={{ width: '14px', height: '14px', color: 'var(--text-muted)', opacity: 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span style={{ color: 'var(--text)' }}>Checkout</span>
                    </nav>

                    <h1 style={{
                        fontSize: 'clamp(28px, 4vw, 36px)',
                        fontWeight: 700,
                        color: 'var(--text)',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-0.02em',
                        marginBottom: '8px'
                    }}>
                        Checkout
                    </h1>
                    <p style={{
                        fontSize: '15px',
                        color: 'var(--text-secondary)',
                    }}>
                        Review your cart and complete your order
                    </p>
                </div>

                <div className="container" style={{ paddingBottom: '80px' }}>
                    {items.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 40px',
                            ...cardStyle,
                        }}>
                            <div style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.3 }}>🛒</div>
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: 700,
                                color: 'var(--text)',
                                marginBottom: '12px'
                            }}>
                                Your cart is empty
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                marginBottom: '32px'
                            }}>
                                Add some products to your cart to continue
                            </p>
                            <Link href="/products" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="two-col-layout" style={{ alignItems: 'start' }}>
                            {/* Left Column - Cart Items & Form */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Cart Items */}
                                <div style={cardStyle}>
                                    <h3 style={sectionTitleStyle}>
                                        Cart Items ({items.length})
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {items.map((item) => {
                                            const fallbackImage = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop";
                                            const imageUrl = item.product.media?.[0]?.url || fallbackImage;

                                            return (
                                                <div
                                                    key={item.product.id}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px',
                                                        padding: '16px',
                                                        borderRadius: '16px',
                                                        backgroundColor: 'var(--bg)',
                                                        border: '1px solid var(--border)',
                                                    }}
                                                >
                                                    {/* Product Image */}
                                                    <div style={{
                                                        width: '72px',
                                                        height: '72px',
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        flexShrink: 0,
                                                        backgroundColor: 'var(--bg-secondary)'
                                                    }}>
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.product.name}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.src = fallbackImage;
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Product Info */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <h3 style={{
                                                            color: 'var(--text)',
                                                            fontWeight: 600,
                                                            fontSize: '15px',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            marginBottom: '6px'
                                                        }}>
                                                            {item.product.name}
                                                        </h3>
                                                        <p style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>
                                                            ₦{item.product.price.toLocaleString()}
                                                        </p>
                                                        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
                                                            Subtotal: ₦{(item.product.price * item.quantity).toLocaleString()}
                                                        </p>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '8px',
                                                                border: '1px solid var(--border)',
                                                                background: 'var(--bg-secondary)',
                                                                color: 'var(--text)',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '18px',
                                                                fontWeight: 500,
                                                                transition: 'all 0.15s ease',
                                                            }}
                                                        >
                                                            −
                                                        </button>
                                                        <span style={{
                                                            color: 'var(--text)',
                                                            minWidth: '28px',
                                                            textAlign: 'center',
                                                            fontSize: '15px',
                                                            fontWeight: 700
                                                        }}>
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '8px',
                                                                border: '1px solid var(--border)',
                                                                background: 'var(--bg-secondary)',
                                                                color: 'var(--text)',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '18px',
                                                                fontWeight: 500,
                                                                transition: 'all 0.15s ease',
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '8px',
                                                            background: 'rgba(239, 68, 68, 0.1)',
                                                            color: '#EF4444',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '18px',
                                                            flexShrink: 0,
                                                            transition: 'all 0.15s ease',
                                                        }}
                                                        title="Remove"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div style={cardStyle}>
                                    <h3 style={sectionTitleStyle}>Customer Details</h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div>
                                            <label style={labelStyle}>
                                                Full Name <span style={{ color: '#EF4444' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                placeholder="Enter your full name"
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
                                            <label style={labelStyle}>
                                                Email Address <span style={{ color: '#EF4444' }}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                placeholder="Enter your email address"
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
                                            <label style={labelStyle}>
                                                Phone Number <span style={{ color: '#EF4444' }}>*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                placeholder="Enter your phone number"
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
                                            <label style={labelStyle}>Delivery Address <span style={{ color: '#EF4444' }}>*</span></label>
                                            <textarea
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                style={{
                                                    ...inputStyle,
                                                    resize: 'none',
                                                    lineHeight: 1.6,
                                                }}
                                                rows={3}
                                                placeholder="Enter your full delivery address"
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
                            </div>

                            {/* Right Column - Summary & Submit */}
                            <div style={{
                                position: 'sticky',
                                top: '120px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                <Invoice
                                    customerName={formData.name}
                                    customerAddress={formData.address}
                                    items={items}
                                    totalAmount={totalAmount}
                                />

                                <button
                                    onClick={handlePaystackPayment}
                                    disabled={!isFormValid}
                                    style={{
                                        width: '100%',
                                        padding: '18px 32px',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        backgroundColor: isFormValid ? 'var(--primary)' : 'var(--border)',
                                        color: isFormValid ? 'white' : 'var(--text-muted)',
                                        border: 'none',
                                        borderRadius: '14px',
                                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        transition: 'all 0.2s ease',
                                        boxShadow: isFormValid ? '0 4px 20px rgba(22, 163, 74, 0.3)' : 'none',
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (isFormValid && !isSubmitting) {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(22, 163, 74, 0.4)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isFormValid ? '0 4px 20px rgba(22, 163, 74, 0.3)' : 'none';
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                border: '2px solid white',
                                                borderTopColor: 'transparent',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite',
                                            }} />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            <span>Pay with Paystack</span>
                                        </>
                                    )}
                                </button>

                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    color: 'var(--text-muted)',
                                    opacity: 0.7
                                }}>
                                    🔒 Secure payment powered by Paystack
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <style>{`
                @keyframes spin { 
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
