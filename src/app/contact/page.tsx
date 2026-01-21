"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
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
                                Contact Us
                            </span>
                            <h1 style={{
                                fontSize: 'clamp(32px, 5vw, 48px)',
                                fontWeight: 700,
                                color: 'var(--text)',
                                fontFamily: 'var(--font-display)',
                                lineHeight: 1.2,
                                marginBottom: '24px'
                            }}>
                                We'd Love to Hear From You
                            </h1>
                            <p style={{
                                fontSize: '18px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.7,
                                maxWidth: '600px',
                                margin: '0 auto'
                            }}>
                                Have questions about a product? Need help with an order?
                                Our team is here to assist you every step of the way.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Options */}
                <section style={{ padding: '80px 0' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
                            {/* WhatsApp - Primary */}
                            <a
                                href="https://wa.me/2348090529117"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    backgroundColor: '#25D366',
                                    borderRadius: '24px',
                                    padding: '40px',
                                    color: 'white',
                                    textDecoration: 'none',
                                    display: 'block',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 211, 102, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>💬</div>
                                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
                                    Chat on WhatsApp
                                </h3>
                                <p style={{ fontSize: '15px', opacity: 0.9, marginBottom: '20px', lineHeight: 1.6 }}>
                                    Get instant responses from our sales team. Available Mon-Sat, 8AM-8PM.
                                </p>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    padding: '10px 16px',
                                    borderRadius: '8px'
                                }}>
                                    Start Chat →
                                </div>
                            </a>

                            {/* Phone */}
                            <a
                                href="tel:+2348090529117"
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderRadius: '24px',
                                    padding: '40px',
                                    border: '1px solid var(--border)',
                                    textDecoration: 'none',
                                    display: 'block',
                                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📞</div>
                                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: 'var(--text)' }}>
                                    Call Us Directly
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                                    Prefer a voice conversation? Give us a call.
                                </p>
                                <div style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    color: 'var(--primary)',
                                }}>
                                    0809 052 9117
                                </div>
                            </a>

                            {/* Visit */}
                            <div
                                style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    borderRadius: '24px',
                                    padding: '40px',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📍</div>
                                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: 'var(--text)' }}>
                                    Visit Our Store
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                                    Come see our products in person at our Ikeja showroom.
                                </p>
                                <div style={{
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    color: 'var(--text)',
                                    lineHeight: 1.6
                                }}>
                                    5, Oshitelu Street<br />
                                    GTBank Plaza, Ikeja<br />
                                    Lagos, Nigeria
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Business Hours */}
                <section style={{ padding: '60px 0', backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="container">
                        <div style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            textAlign: 'center',
                            padding: '40px',
                            backgroundColor: 'var(--bg)',
                            borderRadius: '24px',
                            border: '1px solid var(--border)'
                        }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                color: 'var(--text)',
                                marginBottom: '24px'
                            }}>
                                Business Hours
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Monday - Friday</span>
                                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>8:00 AM - 8:00 PM</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Saturday</span>
                                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>9:00 AM - 6:00 PM</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Sunday</span>
                                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Preview */}
                <section style={{ padding: '80px 0' }}>
                    <div className="container">
                        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
                                    Common Questions
                                </span>
                                <h2 style={{
                                    fontSize: '28px',
                                    fontWeight: 700,
                                    color: 'var(--text)',
                                    fontFamily: 'var(--font-display)',
                                }}>
                                    Frequently Asked Questions
                                </h2>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    {
                                        q: 'How do I place an order?',
                                        a: 'Browse our products, add items to your cart, and proceed to checkout. You can also message us directly on WhatsApp for personalized assistance.'
                                    },
                                    {
                                        q: 'Are your products genuine?',
                                        a: 'Absolutely. Every device is sourced from authorized distributors and verified for authenticity before shipping.'
                                    },
                                    {
                                        q: 'What payment methods do you accept?',
                                        a: 'We accept bank transfers and can generate secure WhatsApp invoices for convenient payment.'
                                    },
                                    {
                                        q: 'How long does delivery take?',
                                        a: 'Lagos orders typically arrive within 1-2 business days. Other states may take 2-5 business days depending on location.'
                                    },
                                ].map((faq, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            borderRadius: '16px',
                                            padding: '24px',
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        <h4 style={{
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: 'var(--text)',
                                            marginBottom: '8px'
                                        }}>
                                            {faq.q}
                                        </h4>
                                        <p style={{
                                            fontSize: '14px',
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.7
                                        }}>
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
