"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "./CartProvider";
import { useToast } from "./Toast";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, items, updateQuantity, removeFromCart } = useCart();
    const { showToast } = useToast();
    const router = useRouter();
    
    const isOutOfStock = product.status === "IN_STOCK" && product.stockQuantity <= 0;
    const isPreOrder = product.status === "PRE_ORDER";
    const isInStock = product.status === "IN_STOCK" && !isOutOfStock;
    const canAddToCart = !isOutOfStock;

    // Check if product is in cart
    const cartItem = items.find(item => item.product.id === product.id);
    const isInCart = !!cartItem;
    const quantity = cartItem?.quantity || 0;

    const imageUrl = product.media?.[0]?.url ||
        `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!canAddToCart) return;
        addToCart(product, 1);
        showToast(`${product.name} added to cart!`, "success");
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartItem) {
            updateQuantity(product.id, quantity + 1);
        }
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartItem) {
            if (quantity > 1) {
                updateQuantity(product.id, quantity - 1);
            } else {
                removeFromCart(product.id);
                showToast(`${product.name} removed from cart`, "success");
            }
        }
    };

    const handleCheckout = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push("/checkout");
    };

    return (
        <div style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.15s, border-color 0.15s",
            opacity: isOutOfStock ? 0.75 : 1,
        }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
                el.style.borderColor = isOutOfStock ? "var(--border)" : "var(--primary)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.borderColor = "var(--border)";
            }}
        >
            {/* Product Image */}
            <Link href={`/product/${product.id}`} style={{ display: "block", position: "relative" }}>
                <div style={{
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    backgroundColor: "var(--bg-secondary)",
                    position: "relative",
                }}>
                    <img
                        src={imageUrl}
                        alt={product.name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                            filter: isOutOfStock ? "grayscale(0.4)" : "none",
                        }}
                        onMouseEnter={(e) => {
                            if (!isOutOfStock) (e.target as HTMLImageElement).style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLImageElement).style.transform = "scale(1)";
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop";
                        }}
                    />

                    {/* Status pill */}
                    <div style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                    }}>
                        {isInStock && (
                            <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "3px 8px",
                                borderRadius: "20px",
                                fontSize: "10px",
                                fontWeight: 700,
                                backgroundColor: "rgba(22,163,74,0.9)",
                                color: "white",
                                letterSpacing: "0.02em",
                            }}>
                                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#86efac" }} />
                                In Stock
                            </span>
                        )}
                        {isPreOrder && (
                            <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "3px 8px",
                                borderRadius: "20px",
                                fontSize: "10px",
                                fontWeight: 700,
                                backgroundColor: "rgba(217,119,6,0.9)",
                                color: "white",
                                letterSpacing: "0.02em",
                            }}>
                                ⏳ Pre-Order
                            </span>
                        )}
                        {isOutOfStock && (
                            <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "3px 8px",
                                borderRadius: "20px",
                                fontSize: "10px",
                                fontWeight: 700,
                                backgroundColor: "rgba(107,114,128,0.9)",
                                color: "white",
                            }}>
                                Unavailable
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Info */}
            <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Category */}
                <span style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--text-muted)",
                }}>
                    {product.category}
                </span>

                {/* Name */}
                <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <h3 style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--text)",
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        margin: 0,
                    }}>
                        {product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div style={{ marginTop: "auto", paddingTop: "6px" }}>
                    <span style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "var(--primary)",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.01em",
                    }}>
                        ₦{product.price.toLocaleString()}
                    </span>
                </div>

                {/* Action row */}
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    {!isInCart ? (
                        <>
                            <Link
                                href={`/product/${product.id}`}
                                style={{
                                    flex: 1,
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12.5px",
                                    fontWeight: 600,
                                    borderRadius: "7px",
                                    backgroundColor: "var(--bg-secondary)",
                                    color: "var(--text-secondary)",
                                    border: "1px solid var(--border)",
                                    textDecoration: "none",
                                    transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.backgroundColor = "var(--bg-hover)";
                                    el.style.color = "var(--text)";
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.backgroundColor = "var(--bg-secondary)";
                                    el.style.color = "var(--text-secondary)";
                                }}
                            >
                                View
                            </Link>

                            <button
                                onClick={handleAddToCart}
                                disabled={!canAddToCart}
                                title={canAddToCart ? "Add to Cart" : "Out of Stock"}
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "7px",
                                    backgroundColor: canAddToCart ? "var(--primary)" : "var(--bg-hover)",
                                    color: canAddToCart ? "white" : "var(--text-muted)",
                                    border: "none",
                                    cursor: canAddToCart ? "pointer" : "not-allowed",
                                    flexShrink: 0,
                                    transition: "background 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                    if (canAddToCart) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary-hover)";
                                }}
                                onMouseLeave={(e) => {
                                    if (canAddToCart) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)";
                                }}
                            >
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Quantity + Checkout row */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                width: "100%",
                            }}>
                                {/* Quantity Controls */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    height: "36px",
                                    padding: "0 6px",
                                    borderRadius: "7px",
                                    backgroundColor: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    flex: 1,
                                    justifyContent: "space-between",
                                    minWidth: 0,
                                }}>
                                    <button
                                        onClick={handleDecrement}
                                        style={{
                                            width: "22px",
                                            height: "22px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "4px",
                                            backgroundColor: "var(--bg)",
                                            border: "1px solid var(--border)",
                                            color: "var(--text)",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            flexShrink: 0,
                                        }}
                                    >
                                        −
                                    </button>
                                    <span style={{
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        minWidth: "16px",
                                        textAlign: "center",
                                    }}>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={handleIncrement}
                                        style={{
                                            width: "22px",
                                            height: "22px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "4px",
                                            backgroundColor: "var(--bg)",
                                            border: "1px solid var(--border)",
                                            color: "var(--text)",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            flexShrink: 0,
                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    title="Go to Checkout"
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "7px",
                                        backgroundColor: "var(--primary)",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background 0.15s",
                                        flexShrink: 0,
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary-hover)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)";
                                    }}
                                >
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
