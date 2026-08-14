import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryRow from "@/components/CategoryRow";
import HeroSlider from "@/components/HeroSlider";
import NewsletterSignup from "@/components/NewsletterSignup";
import FeatureCard from "@/components/FeatureCard";
import { getFeaturedProducts, getPreOrderProducts, getLatestProducts, getBestSellers, getLimitedTimeDeals } from "@/lib/data";

export default async function Home() {
    const FEATURED_PRODUCTS = await getFeaturedProducts();
    const PRE_ORDER_PRODUCTS = await getPreOrderProducts();
    const LATEST_PRODUCTS = await getLatestProducts();
    const BEST_SELLERS = await getBestSellers();
    const LIMITED_TIME_DEALS = await getLimitedTimeDeals();

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg)" }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: "56px" }}>

                {/* ── Hero Slider (Client Component) ── */}
                <HeroSlider />

                {/* ── Category Row (Client Component — handles hover interactions) ── */}
                <CategoryRow />

                {/* ── Flash Sale Banner ── */}
                <section style={{ backgroundColor: "var(--bg)", padding: "16px 0 0 0" }}>
                    <div className="container">
                        <div style={{
                            background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                            borderRadius: "12px",
                            padding: "16px 20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "12px",
                            marginBottom: "24px",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <div style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "24px",
                                }}>
                                    🔥
                                </div>
                                <div>
                                    <h3 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: "#FFFFFF",
                                        margin: 0,
                                    }}>
                                        Limited Time Deals
                                    </h3>
                                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)", margin: 0 }}>
                                        Grab them before they're gone!
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/products"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "12px 24px",
                                    borderRadius: "8px",
                                    backgroundColor: "#FFFFFF",
                                    color: "#DC2626",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    transition: "opacity 0.15s",
                                }}
                            >
                                Shop All Deals
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Products directly under banner */}
                        {LIMITED_TIME_DEALS.length > 0 && (
                            <div className="product-grid" style={{ paddingBottom: "36px" }}>
                                {LIMITED_TIME_DEALS.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                        {LIMITED_TIME_DEALS.length === 0 && (
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px', paddingBottom: '36px' }}>
                                No limited time deals right now. Check back soon!
                            </p>
                        )}
                    </div>
                </section>

                {/* ── Featured / Trending ── */}
                {FEATURED_PRODUCTS.length > 0 && (
                    <section style={{ backgroundColor: "var(--bg-secondary)", padding: "36px 0" }}>
                        <div className="container">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "20px",
                            }}>
                                <div>
                                    <h2 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        margin: 0,
                                    }}>
                                        Trending Now
                                    </h2>
                                    <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                                        Most popular items this week
                                    </p>
                                </div>
                                <Link href="/products" style={{ fontSize: "13px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                                    See All →
                                </Link>
                            </div>
                            <div className="product-grid">
                                {FEATURED_PRODUCTS.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Latest Arrivals ── */}
                {LATEST_PRODUCTS.length > 0 && (
                    <section style={{ backgroundColor: "var(--bg)", padding: "36px 0" }}>
                        <div className="container">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "20px",
                            }}>
                                <div>
                                    <h2 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        margin: 0,
                                    }}>
                                        Latest Deals
                                    </h2>
                                    <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                                        Fresh drops and new additions
                                    </p>
                                </div>
                                <Link href="/products" style={{ fontSize: "13px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                                    See All →
                                </Link>
                            </div>
                            <div className="product-grid">
                                {LATEST_PRODUCTS.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── Pre-Order ── */}
                {PRE_ORDER_PRODUCTS.length > 0 && (
                    <section style={{ backgroundColor: "var(--bg-secondary)", padding: "36px 0" }}>
                        <div className="container">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "20px",
                            }}>
                                <div>
                                    <h2 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        margin: 0,
                                    }}>
                                        Pre-Order Now
                                    </h2>
                                    <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                                        Reserve before they arrive
                                    </p>
                                </div>
                                <Link href="/products?status=PRE_ORDER" style={{ fontSize: "13px", color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
                                    See All →
                                </Link>
                            </div>
                            <div className="product-grid">
                                {PRE_ORDER_PRODUCTS.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ── How It Works ── */}
                <section style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "56px 0",
                }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "40px" }}>
                            <h2 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "var(--text)",
                                margin: "0 0 12px 0",
                            }}>
                                How It Works
                            </h2>
                            <p style={{ fontSize: "15px", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
                                Getting your dream gadget is easy with TimGift
                            </p>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "32px",
                        }}>
                            {[
                                {
                                    step: "01",
                                    icon: "🔍",
                                    title: "Browse Products",
                                    desc: "Explore our wide range of verified authentic gadgets and electronics"
                                },
                                {
                                    step: "02",
                                    icon: "🛒",
                                    title: "Add to Cart & Checkout",
                                    desc: "Review your items, adjust quantities, and proceed to secure checkout"
                                },
                                {
                                    step: "03",
                                    icon: "💳",
                                    title: "Pay Securely",
                                    desc: "Complete payment online via Paystack or choose bank transfer"
                                },
                                {
                                    step: "04",
                                    icon: "📦",
                                    title: "Get Delivered",
                                    desc: "Fast nationwide delivery straight to your doorstep across Nigeria"
                                },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    position: "relative",
                                    padding: "28px 24px",
                                    borderRadius: "12px",
                                    backgroundColor: "var(--bg-card)",
                                    border: "1px solid var(--border)",
                                    textAlign: "center",
                                }}>
                                    <div style={{
                                        position: "absolute",
                                        top: "-14px",
                                        left: "24px",
                                        padding: "4px 12px",
                                        borderRadius: "20px",
                                        backgroundColor: "var(--primary)",
                                        color: "white",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                    }}>
                                        STEP {item.step}
                                    </div>
                                    <div style={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "50%",
                                        backgroundColor: "var(--primary-bg)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "32px",
                                        margin: "0 auto 20px",
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "17px",
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        margin: "0 0 12px 0",
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        fontSize: "14px",
                                        color: "var(--text-muted)",
                                        lineHeight: 1.6,
                                        margin: 0,
                                    }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Customer Testimonials ── */}
                <section style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "56px 0",
                }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "40px" }}>
                            <h2 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "var(--text)",
                                margin: "0 0 12px 0",
                            }}>
                                What Our Customers Say
                            </h2>
                            <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                                Trusted by thousands of satisfied customers
                            </p>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "24px",
                        }}>
                            {[
                                {
                                    name: "Oluwaseun A.",
                                    location: "Lagos",
                                    rating: 5,
                                    review: "Got my iPhone 15 Pro at an amazing price! Delivery was super fast and the phone is 100% authentic. Highly recommend TimGift!",
                                    product: "iPhone 15 Pro"
                                },
                                {
                                    name: "Chidinma N.",
                                    location: "Abuja",
                                    rating: 5,
                                    review: "Best place to buy gadgets in Nigeria. I pre-ordered the PS5 and they delivered exactly when promised. Great customer service!",
                                    product: "PlayStation 5"
                                },
                                {
                                    name: "Emmanuel K.",
                                    location: "Port Harcourt",
                                    rating: 5,
                                    review: "Ordered a MacBook Air and received it in perfect condition. The WhatsApp ordering process is so convenient. Will definitely buy again!",
                                    product: "MacBook Air M2"
                                },
                            ].map((testimonial, i) => (
                                <div key={i} style={{
                                    padding: "28px",
                                    borderRadius: "12px",
                                    backgroundColor: "var(--bg-card)",
                                    border: "1px solid var(--border)",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        marginBottom: "16px",
                                        gap: "4px",
                                    }}>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} style={{ color: "#F59E0B", fontSize: "18px" }}>★</span>
                                        ))}
                                    </div>
                                    <p style={{
                                        fontSize: "14px",
                                        lineHeight: 1.7,
                                        color: "var(--text-secondary)",
                                        marginBottom: "20px",
                                        fontStyle: "italic",
                                    }}>
                                        "{testimonial.review}"
                                    </p>
                                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>
                                            <div>
                                                <div style={{
                                                    fontSize: "15px",
                                                    fontWeight: 600,
                                                    color: "var(--text)",
                                                    marginBottom: "4px",
                                                }}>
                                                    {testimonial.name}
                                                </div>
                                                <div style={{
                                                    fontSize: "13px",
                                                    color: "var(--text-muted)",
                                                }}>
                                                    {testimonial.location}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: "4px 10px",
                                                borderRadius: "6px",
                                                backgroundColor: "var(--primary-bg)",
                                                color: "var(--primary)",
                                                fontSize: "11px",
                                                fontWeight: 600,
                                            }}>
                                                ✓ Verified Purchase
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Why Choose Us ── */}
                <section style={{
                    backgroundColor: "var(--bg)",
                    padding: "56px 0",
                }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "40px" }}>
                            <h2 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "var(--text)",
                                margin: "0 0 12px 0",
                            }}>
                                Why Shop With TimGift?
                            </h2>
                            <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                                We're committed to providing the best shopping experience
                            </p>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "24px",
                        }}>
                            {[
                                {
                                    icon: "🛡️",
                                    title: "100% Authentic Guarantee",
                                    desc: "All products are certified authentic and come with manufacturer warranty"
                                },
                                {
                                    icon: "💰",
                                    title: "Competitive Pricing",
                                    desc: "Get wholesale prices on premium gadgets without compromising on quality"
                                },
                                {
                                    icon: "🚀",
                                    title: "Fast Delivery",
                                    desc: "Quick nationwide shipping to all major cities in Nigeria within 2-3 days"
                                },
                                {
                                    icon: "🔒",
                                    title: "Secure Transactions",
                                    desc: "Safe and secure payment methods with buyer protection"
                                },
                                {
                                    icon: "📞",
                                    title: "24/7 Customer Support",
                                    desc: "Our team is always ready to help via WhatsApp, email, or phone"
                                },
                                {
                                    icon: "🎁",
                                    title: "Special Deals",
                                    desc: "Exclusive discounts and promotions for our valued customers"
                                },
                            ].map((feature, i) => (
                                <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Payment Methods ── */}
                <section style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "40px 0",
                }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "32px" }}>
                            <h3 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "20px",
                                fontWeight: 700,
                                color: "var(--text)",
                                margin: "0 0 8px 0",
                            }}>
                                Accepted Payment Methods
                            </h3>
                            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                                Pay securely with your preferred method
                            </p>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <div style={{
                                padding: "20px 32px",
                                borderRadius: "12px",
                                border: "1px solid var(--border)",
                                backgroundColor: "var(--bg-card)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "12px",
                                textAlign: "center",
                                minWidth: "180px",
                            }}>
                                {/* Paystack official logo — public domain, via Wikimedia Commons */}
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Paystack_Logo.svg"
                                    alt="Paystack"
                                    style={{
                                        height: "36px",
                                        width: "auto",
                                        objectFit: "contain",
                                    }}
                                />
                                <span style={{
                                    fontSize: "12px",
                                    color: "var(--text-muted)",
                                    lineHeight: 1.4,
                                }}>
                                    Secure payments via Paystack
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Delivery Coverage ── */}
                <section style={{
                    backgroundColor: "var(--bg)",
                    padding: "48px 0",
                }}>
                    <div className="container">
                        <div style={{
                            textAlign: "center",
                            maxWidth: "600px",
                            margin: "0 auto",
                            padding: "32px",
                            borderRadius: "12px",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                        }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
                            <h3 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "24px",
                                fontWeight: 700,
                                color: "var(--text)",
                                margin: "0 0 12px 0",
                            }}>
                                We Deliver Nationwide
                            </h3>
                            <p style={{
                                fontSize: "15px",
                                color: "var(--text-muted)",
                                lineHeight: 1.6,
                                margin: 0,
                            }}>
                                Fast and reliable delivery to all major cities across Nigeria including Lagos, Abuja, Port Harcourt, Kano, Ibadan, and more. Contact us on WhatsApp to confirm delivery to your area.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Newsletter Signup ── */}
                <NewsletterSignup />

            </main>

            <Footer />
        </div>
    );
}
