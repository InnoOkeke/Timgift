"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

interface MiniCartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
    const { items, removeFromCart, updateQuantity, totalAmount } = useCart();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "transparent",
                    zIndex: 99,
                }}
            />

            {/* Mini Cart Dropdown */}
            <div
                style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: "380px",
                    maxWidth: "calc(100vw - 32px)",
                    maxHeight: "520px",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column",
                    animation: "slideDown 0.2s ease",
                }}
            >
                {/* Header */}
                <div style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "var(--text)",
                        margin: 0,
                    }}>
                        Shopping Cart ({items.length})
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                        }}
                        aria-label="Close cart"
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                {items.length === 0 ? (
                    <div style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px 20px",
                        textAlign: "center",
                    }}>
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
                        <p style={{
                            fontSize: "14px",
                            color: "var(--text-muted)",
                            margin: 0,
                        }}>
                            Your cart is empty
                        </p>
                    </div>
                ) : (
                    <>
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "12px",
                        }}>
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    style={{
                                        display: "flex",
                                        gap: "12px",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        backgroundColor: "var(--bg-secondary)",
                                        marginBottom: "8px",
                                    }}
                                >
                                    {/* Product Image */}
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                        flexShrink: 0,
                                        backgroundColor: "var(--bg)",
                                    }}>
                                        {item.product.media && item.product.media.length > 0 ? (
                                            <img
                                                src={typeof item.product.media[0] === 'string' ? item.product.media[0] : item.product.media[0]?.url || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'}
                                                alt={item.product.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop";
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "var(--text-muted)",
                                                fontSize: "24px",
                                            }}>
                                                📦
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            color: "var(--text)",
                                            margin: "0 0 4px 0",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}>
                                            {item.product.name}
                                        </h4>
                                        <div style={{
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: "var(--primary)",
                                            marginBottom: "8px",
                                        }}>
                                            ₦{item.product.price.toLocaleString()}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}>
                                            <button
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        updateQuantity(item.product.id, item.quantity - 1);
                                                    } else {
                                                        removeFromCart(item.product.id);
                                                    }
                                                }}
                                                style={{
                                                    width: "24px",
                                                    height: "24px",
                                                    borderRadius: "4px",
                                                    border: "1px solid var(--border)",
                                                    backgroundColor: "var(--bg)",
                                                    color: "var(--text)",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                −
                                            </button>
                                            <span style={{
                                                fontSize: "13px",
                                                fontWeight: 600,
                                                color: "var(--text)",
                                                minWidth: "20px",
                                                textAlign: "center",
                                            }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                style={{
                                                    width: "24px",
                                                    height: "24px",
                                                    borderRadius: "4px",
                                                    border: "1px solid var(--border)",
                                                    backgroundColor: "var(--bg)",
                                                    color: "var(--text)",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                style={{
                                                    marginLeft: "auto",
                                                    background: "none",
                                                    border: "none",
                                                    color: "var(--text-muted)",
                                                    cursor: "pointer",
                                                    padding: "4px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                                aria-label="Remove item"
                                            >
                                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: "16px 20px",
                            borderTop: "1px solid var(--border)",
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "var(--text-secondary)",
                                }}>
                                    Subtotal:
                                </span>
                                <span style={{
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    color: "var(--text)",
                                }}>
                                    ₦{totalAmount.toLocaleString()}
                                </span>
                            </div>
                            <Link
                                href="/checkout"
                                onClick={onClose}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    backgroundColor: "var(--primary)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    transition: "background 0.15s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                            >
                                Proceed to Checkout
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </>
                )}

                <style>{`
                    @keyframes slideDown {
                        from {
                            opacity: 0;
                            transform: translateY(-10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
        </>
    );
}
