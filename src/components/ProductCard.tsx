"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "./CartProvider";

import { useToast } from "./Toast";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const isOutOfStock = product.status === "IN_STOCK" && product.stockQuantity <= 0;
    const canAddToCart = !isOutOfStock;

    // Get a fallback image if the product image fails to load
    const imageUrl = product.media?.[0]?.url ||
        `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!canAddToCart) return;
        addToCart(product, 1);
        showToast(`${product.name} added to cart!`, "success");
    };

    return (
        <div className={`card overflow-hidden ${isOutOfStock ? 'opacity-80' : ''}`}>
            {/* Image - Clickable to product details */}
            <Link href={`/product/${product.id}`} className="block group relative">
                <div
                    className="relative aspect-square overflow-hidden"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${!isOutOfStock ? 'group-hover:scale-110' : 'grayscale-[0.5]'}`}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop";
                        }}
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className={`badge ${product.status === 'IN_STOCK' ? (isOutOfStock ? 'badge-error' : 'badge-success') : 'badge-warning'}`}>
                            {product.status === 'IN_STOCK' ? (isOutOfStock ? 'Out of Stock' : 'In Stock') : 'Pre-Order'}
                        </span>
                        {product.status === 'IN_STOCK' && !isOutOfStock && product.stockQuantity <= 5 && (
                            <span className="badge bg-red-500/10 text-red-500 text-[10px] animate-pulse">
                                Only {product.stockQuantity} left
                            </span>
                        )}
                    </div>

                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                                Currently Unavailable
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                {/* Category & Stock Count */}
                <div className="flex justify-between items-center mb-1">
                    <p
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                    >
                        {product.category}
                    </p>
                    {product.status === 'IN_STOCK' && (
                        <p className={`text-[10px] font-bold ${product.stockQuantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Restocking soon'}
                        </p>
                    )}
                </div>

                {/* Name */}
                <Link href={`/product/${product.id}`}>
                    <h3
                        className="font-semibold mb-2 truncate hover:text-primary transition-colors h-5"
                        style={{ color: "var(--text)" }}
                    >
                        {product.name}
                    </h3>
                </Link>

                {/* Price */}
                <p className="text-lg font-bold mb-4" style={{ color: "var(--primary)" }}>
                    ₦{product.price.toLocaleString()}
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                    {/* View Details */}
                    <Link
                        href={`/product/${product.id}`}
                        style={{
                            flex: 1,
                            padding: "10px 16px",
                            textAlign: "center",
                            fontSize: "13px",
                            fontWeight: 500,
                            borderRadius: "8px",
                            backgroundColor: "var(--bg-secondary)",
                            color: "var(--text)",
                            textDecoration: "none",
                            border: "1px solid var(--border)"
                        }}
                    >
                        View Details
                    </Link>

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}
                        style={{
                            width: "44px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                            backgroundColor: canAddToCart ? "var(--primary)" : "#D1D5DB",
                            color: "white",
                            border: "none",
                            cursor: canAddToCart ? "pointer" : "not-allowed",
                            opacity: canAddToCart ? 1 : 0.6
                        }}
                        title={canAddToCart ? "Add to Cart" : "Out of Stock"}
                    >
                        <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
