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
    const isInStock = product.status === "IN_STOCK";

    // Get a fallback image if the product image fails to load
    const imageUrl = product.media?.[0]?.url ||
        `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        showToast(`${product.name} added to cart!`, "success");
    };

    return (
        <div className="card overflow-hidden">
            {/* Image - Clickable to product details */}
            <Link href={`/product/${product.id}`} className="block group">
                <div
                    className="relative aspect-square overflow-hidden"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop";
                        }}
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`badge ${isInStock ? 'badge-success' : 'badge-warning'}`}>
                            {isInStock ? 'In Stock' : 'Pre-Order'}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                {/* Category */}
                <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-muted)" }}
                >
                    {product.category}
                </p>

                {/* Name */}
                <Link href={`/product/${product.id}`}>
                    <h3
                        className="font-semibold mb-2 truncate hover:text-primary transition-colors"
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
                        style={{
                            width: "44px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                            backgroundColor: "var(--primary)",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}
                        title="Add to Cart"
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
