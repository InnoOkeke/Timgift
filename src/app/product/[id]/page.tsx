"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import QuantitySelector from "@/components/QuantitySelector";
import MediaCarousel from "@/components/MediaCarousel";
import { useParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/types";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}>
                <Navbar />
                <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        border: '3px solid var(--border)',
                        borderTopColor: 'var(--primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}>
                <Navbar />
                <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', padding: '48px' }}>
                        <div style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.3 }}>📱</div>
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            color: 'var(--text)',
                            fontFamily: 'var(--font-display)',
                            marginBottom: '12px'
                        }}>
                            Product Not Found
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                            The product you are looking for does not exist.
                        </p>
                        <Link href="/products" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                            Browse Products
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const totalPrice = product.price * quantity;
    const isInStock = product.status === 'IN_STOCK';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: '100px' }}>
                {/* Breadcrumb */}
                <div className="container" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
                    <nav style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
                        <span style={{ color: 'var(--text)' }}>{product.name}</span>
                    </nav>
                </div>

                <div className="container" style={{ paddingBottom: '80px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '48px',
                    }}>
                        {/* Desktop: Two Column Layout */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '64px',
                            alignItems: 'start'
                        }}>
                            {/* Product Image/Media */}
                            <div style={{
                                position: isMobile ? 'relative' : 'sticky',
                                top: isMobile ? 'auto' : '120px',
                            }}>
                                <div style={{
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border)',
                                }}>
                                    <MediaCarousel media={product.media} productName={product.name} />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div>
                                {/* Header Section */}
                                <div style={{ marginBottom: '32px' }}>
                                    {/* Category & Status */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginBottom: '16px'
                                    }}>
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            color: 'var(--primary)',
                                        }}>
                                            {product.category}
                                        </span>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            backgroundColor: isInStock ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                            color: isInStock ? '#22C55E' : '#EAB308',
                                            border: `1px solid ${isInStock ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`,
                                        }}>
                                            <span style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                backgroundColor: isInStock ? '#22C55E' : '#EAB308',
                                            }} />
                                            {isInStock ? 'In Stock' : 'Pre-Order'}
                                        </span>
                                    </div>

                                    {/* Product Name */}
                                    <h1 style={{
                                        fontSize: 'clamp(28px, 4vw, 40px)',
                                        fontWeight: 700,
                                        color: 'var(--text)',
                                        fontFamily: 'var(--font-display)',
                                        lineHeight: 1.2,
                                        letterSpacing: '-0.02em',
                                        marginBottom: '20px'
                                    }}>
                                        {product.name}
                                    </h1>

                                    {/* Price */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '12px',
                                        marginBottom: '24px'
                                    }}>
                                        <span style={{
                                            fontSize: '36px',
                                            fontWeight: 700,
                                            color: 'var(--text)',
                                            fontFamily: 'var(--font-display)',
                                            letterSpacing: '-0.02em'
                                        }}>
                                            ₦{product.price.toLocaleString()}
                                        </span>
                                        <span style={{
                                            fontSize: '14px',
                                            color: 'var(--text-muted)',
                                            fontWeight: 500
                                        }}>
                                            per unit
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p style={{
                                        fontSize: '16px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.7,
                                        maxWidth: '540px'
                                    }}>
                                        {product.description}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '32px 0' }} />

                                {/* Purchase Section */}
                                <div style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    border: '1px solid var(--border)',
                                }}>
                                    {/* Quantity Row */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '24px'
                                    }}>
                                        <div>
                                            <span style={{
                                                display: 'block',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                color: 'var(--text-secondary)',
                                                marginBottom: '12px'
                                            }}>
                                                Quantity
                                            </span>
                                            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                                        </div>

                                        {/* Total */}
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{
                                                display: 'block',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                color: 'var(--text-secondary)',
                                                marginBottom: '8px'
                                            }}>
                                                Total
                                            </span>
                                            <span style={{
                                                fontSize: '28px',
                                                fontWeight: 700,
                                                color: 'var(--primary)',
                                                fontFamily: 'var(--font-display)',
                                            }}>
                                                ₦{totalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        style={{
                                            width: '100%',
                                            padding: '18px 32px',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            backgroundColor: addedToCart ? '#22C55E' : 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '14px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            transition: 'all 0.2s ease',
                                            boxShadow: addedToCart
                                                ? '0 4px 20px rgba(34, 197, 94, 0.4)'
                                                : '0 4px 20px rgba(22, 163, 74, 0.3)',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!addedToCart) {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(22, 163, 74, 0.4)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = addedToCart
                                                ? '0 4px 20px rgba(34, 197, 94, 0.4)'
                                                : '0 4px 20px rgba(22, 163, 74, 0.3)';
                                        }}
                                    >
                                        {addedToCart ? (
                                            <>
                                                <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Added to Cart!</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                <span>Add to Cart</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Trust Badges */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '16px',
                                    marginTop: '32px'
                                }}>
                                    {[
                                        { icon: '✓', text: 'Authentic' },
                                        { icon: '🚚', text: 'Fast Delivery' },
                                        { icon: '🔒', text: 'Secure' },
                                    ].map((badge, idx) => (
                                        <div key={idx} style={{
                                            textAlign: 'center',
                                            padding: '16px 8px',
                                            backgroundColor: 'var(--bg-secondary)',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border)',
                                        }}>
                                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>{badge.icon}</div>
                                            <div style={{
                                                fontSize: '11px',
                                                fontWeight: 600,
                                                color: 'var(--text-secondary)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>
                                                {badge.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
