import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import Link from "next/link";
import { getProducts } from "@/lib/data";

const CATEGORIES = ["SMARTPHONES", "SMARTWATCHES", "COMPUTERS", "SMART GADGETS"];

export default async function ProductsPage(props: {
    searchParams: Promise<{ status?: string; category?: string; search?: string }>;
}) {
    const searchParams = await props.searchParams;
    const { category, search, status } = searchParams;
    const allProducts = await getProducts();

    // Filter Logic
    const baseFilter = (products: Product[]) => {
        return products.filter((product) => {
            const matchesCategory = category
                ? product.category.toLowerCase() === category.toLowerCase()
                : true;

            const matchesSearch = search
                ? product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())
                : true;

            const matchesStatus = status
                ? product.status === status
                : true;

            return matchesCategory && matchesSearch && matchesStatus;
        });
    };

    const inStockProducts = baseFilter(allProducts).filter(p => p.status === 'IN_STOCK');
    const preOrderProducts = baseFilter(allProducts).filter(p => p.status === 'PRE_ORDER');

    const showOnlyInStock = status === 'IN_STOCK';
    const showOnlyPreOrder = status === 'PRE_ORDER';

    const pageTitle = search
        ? `Results for "${search}"`
        : category
            ? category
            : status
                ? status === 'PRE_ORDER' ? 'Pre-Order Products' : 'In Stock Products'
                : 'All Products';

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
            <Navbar />

            <main className="flex-1" style={{ paddingTop: "100px" }}>
                {/* Header */}
                <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <div className="container">
                        <span
                            className="text-sm font-semibold uppercase tracking-wider"
                            style={{ color: "var(--primary)" }}
                        >
                            Browse Collection
                        </span>
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                        >
                            {pageTitle}
                        </h1>
                        <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
                            Discover premium gadgets available for immediate delivery or pre-order.
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section
                    className="sticky top-[72px] z-40 py-4 border-b"
                    style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--border)"
                    }}
                >
                    <div className="container">
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/products"
                                className={`btn text-sm ${!category && !status ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                All
                            </Link>
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/products?category=${encodeURIComponent(cat)}`}
                                    className={`btn text-sm ${category?.toLowerCase() === cat.toLowerCase() ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="container py-12">
                    {/* In Stock Section */}
                    {!showOnlyPreOrder && (
                        <section className="mb-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-3 h-3 rounded-full animate-pulse"
                                        style={{ backgroundColor: "var(--in-stock)" }}
                                    ></span>
                                    <h2
                                        className="text-2xl font-bold"
                                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                                    >
                                        In Stock
                                    </h2>
                                </div>
                                <span className="badge badge-success">
                                    {inStockProducts.length} Available
                                </span>
                            </div>

                            {inStockProducts.length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {inStockProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="text-center py-16 rounded-2xl"
                                    style={{ backgroundColor: "var(--bg-secondary)" }}
                                >
                                    <p style={{ color: "var(--text-muted)" }}>
                                        No in-stock items found matching your criteria.
                                    </p>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Pre-Order Section */}
                    {!showOnlyInStock && (
                        <section className={!showOnlyPreOrder ? "pt-16 mt-8 border-t border-border" : ""}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-3 h-3 rounded-full animate-pulse"
                                        style={{ backgroundColor: "var(--pre-order)" }}
                                    ></span>
                                    <h2
                                        className="text-2xl font-bold"
                                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                                    >
                                        Pre-Order
                                    </h2>
                                </div>
                                <span className="badge badge-warning">
                                    {preOrderProducts.length} Coming Soon
                                </span>
                            </div>

                            {preOrderProducts.length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {preOrderProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="text-center py-16 rounded-2xl"
                                    style={{ backgroundColor: "var(--bg-secondary)" }}
                                >
                                    <p style={{ color: "var(--text-muted)" }}>
                                        No pre-order items found matching your criteria.
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
