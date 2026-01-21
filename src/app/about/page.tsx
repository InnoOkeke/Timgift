import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: '120px' }}>
                {/* Hero Section */}
                <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '80px 0' }}>
                    <div className="container">
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'var(--primary)',
                                marginBottom: '16px',
                                display: 'block'
                            }}>
                                About Us
                            </span>
                            <h1 style={{
                                fontSize: 'clamp(32px, 5vw, 48px)',
                                fontWeight: 700,
                                color: 'var(--text)',
                                fontFamily: 'var(--font-display)',
                                lineHeight: 1.2,
                                marginBottom: '24px'
                            }}>
                                Nigeria's Trusted Partner for Premium Electronics
                            </h1>
                            <p style={{
                                fontSize: '18px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.7,
                                maxWidth: '600px',
                                margin: '0 auto'
                            }}>
                                We're on a mission to make quality technology accessible to everyone —
                                delivering certified authentic gadgets at unbeatable prices.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section style={{ padding: '80px 0' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
                            <div>
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--primary)',
                                    marginBottom: '16px',
                                    display: 'block'
                                }}>
                                    Our Story
                                </span>
                                <h2 style={{
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    color: 'var(--text)',
                                    fontFamily: 'var(--font-display)',
                                    marginBottom: '24px'
                                }}>
                                    From Passion to Purpose
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                    <p>
                                        Tim Gift was born from a simple observation: Nigerians deserve access to
                                        genuine, high-quality electronics without the premium markup or authenticity
                                        concerns that plague the market.
                                    </p>
                                    <p>
                                        What started as a small operation has grown into one of the most trusted
                                        ICT sourcing platforms for businesses, schools, and individuals across Nigeria.
                                        We source directly from authorized distributors, ensuring every device that
                                        leaves our warehouse is certified authentic.
                                    </p>
                                    <p>
                                        Today, we serve thousands of satisfied customers — from tech enthusiasts
                                        seeking the latest smartphones to organizations outfitting their teams
                                        with reliable work devices.
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                aspectRatio: '4/3',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
                            }}>
                                <img
                                    src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop"
                                    alt="Tim Gift Store"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <span style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'var(--primary)',
                                marginBottom: '16px',
                                display: 'block'
                            }}>
                                Our Values
                            </span>
                            <h2 style={{
                                fontSize: '32px',
                                fontWeight: 700,
                                color: 'var(--text)',
                                fontFamily: 'var(--font-display)',
                            }}>
                                What Drives Us
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                            {[
                                {
                                    icon: '✓',
                                    title: 'Authenticity First',
                                    desc: 'Every product is verified genuine — no counterfeits, no compromises. Your trust is our foundation.'
                                },
                                {
                                    icon: '💎',
                                    title: 'Quality Over Quantity',
                                    desc: 'We carefully curate our inventory, offering only devices that meet our rigorous standards.'
                                },
                                {
                                    icon: '🤝',
                                    title: 'Customer Obsession',
                                    desc: 'Your satisfaction drives every decision. We go above and beyond to ensure you are delighted.'
                                },
                                {
                                    icon: '⚡',
                                    title: 'Speed & Reliability',
                                    desc: 'From order to delivery, we prioritize efficiency without sacrificing care.'
                                },
                            ].map((value, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        backgroundColor: 'var(--bg)',
                                        borderRadius: '20px',
                                        padding: '32px',
                                        border: '1px solid var(--border)',
                                    }}
                                >
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '16px',
                                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        marginBottom: '20px'
                                    }}>
                                        {value.icon}
                                    </div>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        color: 'var(--text)',
                                        marginBottom: '12px'
                                    }}>
                                        {value.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.7
                                    }}>
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: '80px 0' }}>
                    <div className="container">
                        <div style={{
                            textAlign: 'center',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            <h2 style={{
                                fontSize: '28px',
                                fontWeight: 700,
                                color: 'var(--text)',
                                fontFamily: 'var(--font-display)',
                                marginBottom: '16px'
                            }}>
                                Ready to Experience the Difference?
                            </h2>
                            <p style={{
                                fontSize: '16px',
                                color: 'var(--text-secondary)',
                                marginBottom: '32px'
                            }}>
                                Browse our curated collection of premium gadgets and discover why
                                thousands of Nigerians trust Tim Gift.
                            </p>
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link
                                    href="/products"
                                    className="btn btn-primary"
                                    style={{ padding: '14px 28px' }}
                                >
                                    Shop Now
                                </Link>
                                <Link
                                    href="/contact"
                                    className="btn btn-secondary"
                                    style={{ padding: '14px 28px' }}
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
