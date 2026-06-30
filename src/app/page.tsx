import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getPreOrderProducts, getLatestProducts } from "@/lib/data";

const CATEGORIES = [
  {
    name: "IPHONE",
    label: "iPhone",
    image: "https://images.unsplash.com/lDWTfYhZ85w?w=500&h=500&fit=crop&q=75&auto=format",
  },
  {
    name: "ANDROID",
    label: "Android",
    image: "https://images.unsplash.com/V-iFRXuuBeQ?w=500&h=500&fit=crop&q=75&auto=format",
  },
  {
    name: "MACBOOK",
    label: "MacBook",
    image: "https://images.unsplash.com/Hin-rzhOdWs?w=500&h=500&fit=crop&q=75&auto=format",
  },
  {
    name: "IPAD",
    label: "iPad",
    image: "https://images.unsplash.com/ADilxPQeWcI?w=500&h=500&fit=crop&q=75&auto=format",
  },
  {
    name: "VIDEO GAMES CONSOLES",
    label: "Video Games Consoles",
    image: "https://images.unsplash.com/ads33nL7V4k?w=500&h=500&fit=crop&q=75&auto=format",
  },
  {
    name: "SMARTWATCHES",
    label: "Smartwatches",
    image: "https://images.unsplash.com/FPEBZJLD8Rs?w=500&h=500&fit=crop&q=75&auto=format",
  },
  {
    name: "WINDOWS LAPTOPS",
    label: "Windows Laptops",
    image: "https://images.unsplash.com/i5UV2HpITYA?w=500&h=500&fit=crop&q=75&auto=format",
  },
  {
    name: "AIRPODS",
    label: "AirPods",
    image: "https://images.unsplash.com/rI2MXeP6sss?w=500&h=500&fit=crop&q=75&auto=format",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse & Select",
    description: "Explore our curated collection of quality new and gently used electronics at amazing prices.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Create Order",
    description: "Add items to cart and submit your purchase request. Our sales team responds fast via WhatsApp.",
    icon: "🛒",
  },
  {
    step: "03",
    title: "Pay & Receive",
    description: "Choose from various payment methods. We inspect products thoroughly and confirm delivery.",
    icon: "✅",
  },
];

export default async function Home() {
  const FEATURED_PRODUCTS = await getFeaturedProducts();
  const PRE_ORDER_PRODUCTS = await getPreOrderProducts();
  const LATEST_PRODUCTS = await getLatestProducts();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: "var(--bg-secondary)", paddingTop: "120px", paddingBottom: "80px" }}
        >
          <div className="container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-center md:text-left">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                >
                  Your Trusted Source for{" "}
                  <span className="text-gradient">Premium Gadgets</span>
                </h1>

                <p
                  className="text-lg mb-8 leading-relaxed max-w-xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Shop the latest smartphones, laptops, smartwatches, and accessories at unbeatable wholesale prices.
                  Fast nationwide delivery, guaranteed authenticity.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    href="/products"
                    className="btn btn-primary"
                    style={{ padding: "12px 24px", fontSize: "15px" }}
                  >
                    Shop Now →
                  </Link>
                  <Link
                    href="/products?status=PRE_ORDER"
                    className="btn btn-secondary"
                    style={{ padding: "12px 24px", fontSize: "15px" }}
                  >
                    Pre-Order Exclusives
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative hidden md:block">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: "linear-gradient(135deg, var(--primary) 0%, rgba(22,163,74,0.2) 100%)",
                      transform: "rotate(-6deg)"
                    }}
                  ></div>
                  <div
                    className="relative rounded-3xl overflow-hidden shadow-xl"
                    style={{ backgroundColor: "var(--bg-card)" }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop"
                      alt="Premium smartphones collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16" style={{ backgroundColor: "var(--bg)" }}>
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "✓", title: "Certified Authentic", desc: "Every device verified genuine — sourced directly from authorized distributors" },
                { icon: "⚡", title: "Swift Nationwide Delivery", desc: "Express shipping to your doorstep, anywhere in Nigeria" },
                { icon: "🔒", title: "Seamless & Secure Checkout", desc: "Effortless payment via WhatsApp with complete buyer protection" },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="card p-6 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                    style={{ backgroundColor: "rgba(22, 163, 74, 0.1)" }}
                  >
                    {badge.icon}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{badge.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                Categories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                Shop by Category
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="px-3 py-3 text-center"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <span className="font-semibold text-sm leading-snug" style={{ color: "var(--text)" }}>
                      {cat.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20" style={{ backgroundColor: "var(--bg)" }}>
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                  Featured
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                  Trending Now
                </h2>
              </div>
              <Link
                href="/products"
                className="btn btn-secondary"
                style={{ whiteSpace: 'nowrap' }}
              >
                View All Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Arrivals */}
        {LATEST_PRODUCTS.length > 0 && (
          <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                    New Arrivals
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                    Latest Products
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="btn btn-secondary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Shop Everything
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {LATEST_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pre-Order Products */}
        {PRE_ORDER_PRODUCTS.length > 0 && (
          <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--pre-order)" }}>
                    ⏳ Coming Soon
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                    Pre-Order Now
                  </h2>
                  <p className="text-base mt-2" style={{ color: "var(--text-secondary)" }}>
                    Reserve the latest devices before they hit the shelves
                  </p>
                </div>
                <Link
                  href="/products?status=PRE_ORDER"
                  className="btn btn-secondary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  View Pre-Orders
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRE_ORDER_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                Simple Steps to Your Order
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Connector Line */}
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <div
                      className="hidden md:block absolute top-12 left-[60%] w-full h-0.5"
                      style={{ backgroundColor: "var(--border)" }}
                    ></div>
                  )}

                  <div className="card p-8 relative z-10 text-center">
                    <span
                      className="absolute -top-4 left-4 text-6xl font-bold opacity-10"
                      style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
                    >
                      {item.step}
                    </span>
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20" style={{ backgroundColor: "var(--bg)" }}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                  Your Trusted Gadgets Partner
                </h2>

                <div className="space-y-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <p>
                    Wireless devices have changed how we live, and we are developing new ways to make
                    these devices more accessible for everyone.
                  </p>
                  <p>
                    From smartphones to tablets to smartwatches and mobile accessories, we provide
                    life-changing solutions that keep our world connected.
                  </p>
                  <p>
                    We are one of the best ICT sourcing and procurement platforms for MSMEs, Schools,
                    Public & Private organizations.
                  </p>
                </div>

                <div
                  className="mt-8 p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Contact Us</h4>
                  <div className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <p className="flex items-center gap-3">
                      <span style={{ color: "var(--primary)" }}>📍</span>
                      5, Oshitelu St, GTBank Plaza, Ikeja Lagos
                    </p>
                    <p className="flex items-center gap-3">
                      <span style={{ color: "var(--primary)" }}>📞</span>
                      08090529117
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop"
                    alt="Tim Gift store"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
