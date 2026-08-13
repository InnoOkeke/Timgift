import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import Link from "next/link";
import { getProducts } from "@/lib/data";

const CATEGORIES = [
    { name: "IPHONE",               label: "iPhone" },
    { name: "ANDROID",              label: "Android" },
    { name: "MACBOOK",              label: "MacBook" },
    { name: "IPAD",                 label: "iPad" },
    { name: "VIDEO GAMES CONSOLES", label: "Consoles" },
    { name: "SMARTWATCHES",         label: "Smartwatches" },
    { name: "WINDOWS LAPTOPS",      label: "Laptops" },
    { name: "AIRPODS",              label: "AirPods" },
];

export default async function ProductsPage(props: {
    searchParams: Promise<{ status?: string; category?: string; search?: string }>;
}) {
    const searchParams = await props.searchParams;
    const { category, search, status } = searchParams;
    const allProducts = await getProducts();

    const baseFilter = (products: Product[]) =>
        products.filter((p) => {
            const matchCat = category ? p.category.toLowerCase() === category.toLowerCase() : true;
            const matchSearch = search
                ? p.name.toLowerCase().includes(search.toLowerCase()) ||
                  p.description.toLowerCase().includes(search.toLowerCase()) ||
                  p.category.toLowerCase().includes(search.toLowerCase())
                : true;
            const matchStatus = status ? p.status === status : true;
            return matchCat && matchSearch && matchStatus;
        });

    const inStockProducts = baseFilter(allProducts).filter((p) => p.status === "IN_STOCK");
    const preOrderProducts = baseFilter(allProducts).filter((p) => p.status === "PRE_ORDER");

    const showOnlyInStock = status === "IN_STOCK";
    const showOnlyPreOrder = status === "PRE_ORDER";

    const pageTitle = search
        ? `Results for "${search}"`
        : category
        ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        : status
        ? status === "PRE_ORDER"
            ? "Pre-Order Products"
            : "In Stock Products"
        : "All Products";

    const totalResults = (showOnlyInStock ? 0 : preOrderProducts.length) +
                         (showOnlyPreOrder ? 0 : inStockProducts.length);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg)" }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: "104px" }}>

                {/* Page header */}
                <div style={{
                    backgroundColor: "var(--bg)",
                    borderBottom: "1px solid var(--border)",
                    padding: "20px 0",
                }}>
                    <div className="container">
                        {/* Breadcrumb */}
                        <nav style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                            marginBottom: "10px",
                        }}>
                            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
                            <span>›</span>
                            <span style={{ color: "var(--text)" }}>
                                {category ? `${category.charAt(0)}${category.slice(1).toLowerCase()}` : "Products"}
                            </span>
                        </nav>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                            <div>
                                <h1 style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "22px",
                                    fontWeight: 700,
                                    color: "var(--text)",
                                    margin: 0,
                                }}>
                                    {pageTitle}
                                </h1>
                                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                                    {totalResults} listing{totalResults !== 1 ? "s" : ""} found
                                </p>
                            </div>

                            {/* Status filter pills */}
                            <div style={{ display: "flex", gap: "8px" }}>
                                <Link
                                    href={category ? `/products?category=${encodeURIComponent(category)}` : "/products"}
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "20px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        border: "1.5px solid",
                                        borderColor: !status ? "var(--primary)" : "var(--border)",
                                        backgroundColor: !status ? "var(--primary-bg)" : "transparent",
                                        color: !status ? "var(--primary)" : "var(--text-secondary)",
                                    }}
                                >
                                    All
                                </Link>
                                <Link
                                    href={`/products${category ? `?category=${encodeURIComponent(category)}&status=IN_STOCK` : "?status=IN_STOCK"}`}
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "20px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        border: "1.5px solid",
                                        borderColor: status === "IN_STOCK" ? "var(--primary)" : "var(--border)",
                                        backgroundColor: status === "IN_STOCK" ? "var(--primary-bg)" : "transparent",
                                        color: status === "IN_STOCK" ? "var(--primary)" : "var(--text-secondary)",
                                    }}
                                >
                                    In Stock
                                </Link>
                                <Link
                                    href={`/products${category ? `?category=${encodeURIComponent(category)}&status=PRE_ORDER` : "?status=PRE_ORDER"}`}
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "20px",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        border: "1.5px solid",
                                        borderColor: status === "PRE_ORDER" ? "#D97706" : "var(--border)",
                                        backgroundColor: status === "PRE_ORDER" ? "#FFFBEB" : "transparent",
                                        color: status === "PRE_ORDER" ? "#D97706" : "var(--text-secondary)",
                                    }}
                                >
                                    Pre-Order
                                </Link>
                            </div>
                        </div>

                {/* Category horizontal scroll */}
                        <div style={{
                            display: "flex",
                            gap: "8px",
                            marginTop: "16px",
                            overflowX: "auto",
                            overflowY: "visible",
                            scrollbarWidth: "none",
                            paddingBottom: "2px",
                        }}>
                            <Link
                                href={status ? `/products?status=${status}` : "/products"}
                                style={{
                                    padding: "5px 14px",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    border: "1px solid",
                                    borderColor: !category ? "var(--primary)" : "var(--border)",
                                    backgroundColor: !category ? "var(--primary)" : "transparent",
                                    color: !category ? "white" : "var(--text-secondary)",
                                    flexShrink: 0,
                                }}
                            >
                                All
                            </Link>
                            {CATEGORIES.map((cat) => {
                                const isActive = category?.toLowerCase() === cat.name.toLowerCase();
                                return (
                                    <Link
                                        key={cat.name}
                                        href={`/products?category=${encodeURIComponent(cat.name)}${status ? `&status=${status}` : ""}`}
                                        style={{
                                            padding: "5px 14px",
                                            borderRadius: "6px",
                                            fontSize: "13px",
                                            fontWeight: isActive ? 600 : 500,
                                            textDecoration: "none",
                                            whiteSpace: "nowrap",
                                            border: "1px solid",
                                            borderColor: isActive ? "var(--primary)" : "var(--border)",
                                            backgroundColor: isActive ? "var(--primary)" : "transparent",
                                            color: isActive ? "white" : "var(--text-secondary)",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {cat.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Listings */}
                <div className="container" style={{ padding: "28px 0 60px" }}>

                    {/* In Stock */}
                    {!showOnlyPreOrder && (
                        <section style={{ marginBottom: showOnlyInStock ? 0 : "40px" }}>
                            {!showOnlyInStock && (
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "16px",
                                }}>
                                    <span style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "var(--in-stock)",
                                        flexShrink: 0,
                                    }} />
                                    <h2 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        margin: 0,
                                    }}>
                                        In Stock
                                    </h2>
                                    <span style={{
                                        padding: "2px 10px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        backgroundColor: "var(--primary-bg)",
                                        color: "var(--primary)",
                                        border: "1px solid rgba(22,163,74,0.2)",
                                    }}>
                                        {inStockProducts.length} available
                                    </span>
                                </div>
                            )}

                            {inStockProducts.length > 0 ? (
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                    gap: "14px",
                                }}>
                                    {inStockProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    padding: "48px 24px",
                                    borderRadius: "10px",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--bg-secondary)",
                                    textAlign: "center",
                                }}>
                                    <div style={{ fontSize: "36px", marginBottom: "12px", opacity: 0.3 }}>📦</div>
                                    <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                                        No in-stock items match your filter.
                                    </p>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Pre-Order */}
                    {!showOnlyInStock && (
                        <section>
                            {!showOnlyPreOrder && (
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "16px",
                                    paddingTop: showOnlyPreOrder ? 0 : "8px",
                                    borderTop: showOnlyPreOrder ? "none" : "1px solid var(--border)",
                                    marginTop: showOnlyPreOrder ? 0 : "8px",
                                }}>
                                    <span style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#D97706",
                                        flexShrink: 0,
                                    }} />
                                    <h2 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        margin: 0,
                                    }}>
                                        Pre-Order
                                    </h2>
                                    <span style={{
                                        padding: "2px 10px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        backgroundColor: "#FFFBEB",
                                        color: "#D97706",
                                        border: "1px solid rgba(217,119,6,0.2)",
                                    }}>
                                        {preOrderProducts.length} coming soon
                                    </span>
                                </div>
                            )}
                            {showOnlyPreOrder && (
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "16px",
                                }}>
                                    <span style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#D97706",
                                        flexShrink: 0,
                                    }} />
                                    <h2 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        margin: 0,
                                    }}>
                                        Pre-Order
                                    </h2>
                                    <span style={{
                                        padding: "2px 10px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        backgroundColor: "#FFFBEB",
                                        color: "#D97706",
                                        border: "1px solid rgba(217,119,6,0.2)",
                                    }}>
                                        {preOrderProducts.length} coming soon
                                    </span>
                                </div>
                            )}

                            {preOrderProducts.length > 0 ? (
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                    gap: "14px",
                                }}>
                                    {preOrderProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    padding: "48px 24px",
                                    borderRadius: "10px",
                                    border: "1px solid var(--border)",
                                    backgroundColor: "var(--bg-secondary)",
                                    textAlign: "center",
                                }}>
                                    <div style={{ fontSize: "36px", marginBottom: "12px", opacity: 0.3 }}>⏳</div>
                                    <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                                        No pre-order items match your filter.
                                    </p>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
