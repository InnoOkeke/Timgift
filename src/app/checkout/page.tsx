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
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
    });
    const [sameAsBilling, setSameAsBilling] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const fullAddress = [formData.address, formData.city, formData.state].filter(Boolean).join(", ");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePaystackPayment = async () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || items.length === 0) {
            showToast("Please fill in all required fields.", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/payment/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: fullName,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    customerAddress: fullAddress,
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

    const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.address && formData.city && formData.state && items.length > 0 && !isSubmitting;

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
        borderRadius: '20px',
        border: '1px solid var(--border)',
        padding: '20px',
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
            <main style={{ flex: 1, paddingTop: '56px' }}>
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
                                                        alignItems: 'flex-start',
                                                        gap: '12px',
                                                        padding: '12px',
                                                        borderRadius: '14px',
                                                        backgroundColor: 'var(--bg)',
                                                        border: '1px solid var(--border)',
                                                    }}
                                                >
                                                    {/* Product Image */}
                                                    <div style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        borderRadius: '10px',
                                                        overflow: 'hidden',
                                                        flexShrink: 0,
                                                        backgroundColor: '#f8f8f8'
                                                    }}>
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.product.name}
                                                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', backgroundColor: '#f8f8f8' }}
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.src = fallbackImage;
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Product Info + Controls */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                                                            <div style={{ minWidth: 0 }}>
                                                                <h3 style={{
                                                                    color: 'var(--text)',
                                                                    fontWeight: 600,
                                                                    fontSize: '14px',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    marginBottom: '4px'
                                                                }}>
                                                                    {item.product.name}
                                                                </h3>
                                                                <p style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>
                                                                    ₦{item.product.price.toLocaleString()}
                                                                </p>
                                                                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
                                                                    Subtotal: ₦{(item.product.price * item.quantity).toLocaleString()}
                                                                </p>
                                                            </div>
                                                            {/* Remove Button */}
                                                            <button
                                                                onClick={() => removeFromCart(item.product.id)}
                                                                style={{
                                                                    width: '28px', height: '28px',
                                                                    borderRadius: '7px',
                                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                                    color: '#EF4444',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    fontSize: '16px',
                                                                    flexShrink: 0,
                                                                }}
                                                                title="Remove"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                style={{
                                                                    width: '28px', height: '28px',
                                                                    borderRadius: '7px',
                                                                    border: '1px solid var(--border)',
                                                                    background: 'var(--bg-secondary)',
                                                                    color: 'var(--text)',
                                                                    cursor: 'pointer',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    fontSize: '16px', fontWeight: 500,
                                                                }}
                                                            >
                                                                −
                                                            </button>
                                                            <span style={{
                                                                color: 'var(--text)',
                                                                minWidth: '24px', textAlign: 'center',
                                                                fontSize: '14px', fontWeight: 700
                                                            }}>
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                style={{
                                                                    width: '28px', height: '28px',
                                                                    borderRadius: '7px',
                                                                    border: '1px solid var(--border)',
                                                                    background: 'var(--bg-secondary)',
                                                                    color: 'var(--text)',
                                                                    cursor: 'pointer',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    fontSize: '16px', fontWeight: 500,
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Customer Details */}
                                <div style={cardStyle}>
                                    <h3 style={sectionTitleStyle}>Customer Details</h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {/* Email — top of form */}
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
                                                placeholder="you@example.com"
                                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                            />
                                        </div>

                                        {/* First & Last name side by side */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                            <div>
                                                <label style={labelStyle}>
                                                    First Name <span style={{ color: '#EF4444' }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    style={inputStyle}
                                                    placeholder="Jane"
                                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>
                                                    Last Name <span style={{ color: '#EF4444' }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    style={inputStyle}
                                                    placeholder="Doe"
                                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
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
                                                placeholder="+234 800 000 0000"
                                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                            />
                                        </div>

                                        {/* Street Address */}
                                        <div>
                                            <label style={labelStyle}>
                                                Street Address <span style={{ color: '#EF4444' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                placeholder="House number, street name"
                                                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                                                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                            />
                                        </div>

                                        {/* City & State side by side */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                            <div>
                                                <label style={labelStyle}>
                                                    City <span style={{ color: '#EF4444' }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    required
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    style={inputStyle}
                                                    placeholder="e.g. Lagos"
                                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>
                                                    State <span style={{ color: '#EF4444' }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    required
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    style={inputStyle}
                                                    placeholder="e.g. Lagos State"
                                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px rgba(22, 163, 74, 0.1)'; }}
                                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                                                />
                                            </div>
                                        </div>

                                        {/* Same as billing checkbox */}
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            color: 'var(--text-secondary)',
                                            userSelect: 'none',
                                        }}>
                                            <input
                                                type="checkbox"
                                                checked={sameAsBilling}
                                                onChange={(e) => setSameAsBilling(e.target.checked)}
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    accentColor: 'var(--primary)',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                            Use same address for billing
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Summary & Submit */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }} className="checkout-summary-col">
                                <Invoice
                                    customerName={fullName}
                                    customerAddress={fullAddress}
                                    items={items}
                                    totalAmount={totalAmount}
                                />

                                {/* WhatsApp Checkout */}
                                {(() => {
                                    const orderLines = items.map(i =>
                                        `• ${i.product.name} x${i.quantity} — ₦${(i.product.price * i.quantity).toLocaleString()}`
                                    ).join("\n");

                                    const message = encodeURIComponent(
                                        `Hi TimGift! 👋 I'd like to place an order:\n\n` +
                                        `${orderLines}\n\n` +
                                        `*Total: ₦${totalAmount.toLocaleString()}*\n\n` +
                                        `📦 Delivery details:\n` +
                                        `Name: ${fullName || "(not filled yet)"}\n` +
                                        `Phone: ${formData.phone || "(not filled yet)"}\n` +
                                        `Address: ${fullAddress || "(not filled yet)"}\n\n` +
                                        `Please confirm availability and payment details. Thank you!`
                                    );

                                    const whatsappUrl = `https://wa.me/2348090529117?text=${message}`;

                                    return (
                                        <a
                                            href={isFormValid ? whatsappUrl : undefined}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                if (!isFormValid) e.preventDefault();
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '18px 32px',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                backgroundColor: isFormValid ? '#25D366' : 'var(--border)',
                                                color: isFormValid ? 'white' : 'var(--text-muted)',
                                                border: 'none',
                                                borderRadius: '14px',
                                                cursor: isFormValid ? 'pointer' : 'not-allowed',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '12px',
                                                transition: 'all 0.2s ease',
                                                boxShadow: isFormValid ? '0 4px 20px rgba(37, 211, 102, 0.3)' : 'none',
                                                textDecoration: 'none',
                                                pointerEvents: isFormValid ? 'auto' : 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (isFormValid) {
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.4)';
                                                    e.currentTarget.style.backgroundColor = '#20c45a';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = isFormValid ? '0 4px 20px rgba(37, 211, 102, 0.3)' : 'none';
                                                e.currentTarget.style.backgroundColor = isFormValid ? '#25D366' : 'var(--border)';
                                            }}
                                        >
                                            {/* WhatsApp Icon */}
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                            </svg>
                                            <span>Order via WhatsApp</span>
                                        </a>
                                    );
                                })()}

                                <p style={{
                                    textAlign: 'center',
                                    fontSize: '12px',
                                    color: 'var(--text-muted)',
                                    opacity: 0.7,
                                    lineHeight: 1.5,
                                }}>
                                    💬 You'll be redirected to WhatsApp to confirm your order with us directly
                                </p>

                                {/* Paystack — disabled, re-enable when ready */}
                                {/* 
                                <button
                                    onClick={handlePaystackPayment}
                                    disabled={!isFormValid}
                                    ...
                                >
                                    Pay with Paystack
                                </button>
                                */}
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
                /* Sticky summary only on desktop */
                @media (min-width: 768px) {
                    .checkout-summary-col {
                        position: sticky;
                        top: 120px;
                    }
                }
            `}</style>
        </div>
    );
}
