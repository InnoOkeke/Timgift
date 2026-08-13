import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | TimGift",
    description: "Read the Terms and Conditions governing your use of the TimGift website and purchase of products.",
};

export default function TermsAndConditionsPage() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg)" }}>
            <Navbar />

            <main style={{ flex: 1, paddingTop: "120px" }}>
                {/* Hero */}
                <section style={{ backgroundColor: "var(--bg-secondary)", padding: "64px 0" }}>
                    <div className="container">
                        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
                            <span style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "var(--primary)",
                                marginBottom: "16px",
                                display: "block",
                            }}>
                                Legal
                            </span>
                            <h1 style={{
                                fontSize: "clamp(28px, 5vw, 42px)",
                                fontWeight: 700,
                                color: "var(--text)",
                                fontFamily: "var(--font-display)",
                                lineHeight: 1.2,
                                marginBottom: "16px",
                            }}>
                                Terms &amp; Conditions
                            </h1>
                            <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
                                Effective Date: July 1, 2026
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section style={{ padding: "64px 0 80px" }}>
                    <div className="container">
                        <div style={{ maxWidth: "760px", margin: "0 auto" }}>

                            {/* Intro */}
                            <p style={{
                                fontSize: "16px",
                                color: "var(--text-secondary)",
                                lineHeight: 1.8,
                                marginBottom: "48px",
                            }}>
                                Welcome to <strong style={{ color: "var(--text)" }}>TimGift</strong>, operated
                                by <strong style={{ color: "var(--text)" }}>Mofets Computers</strong> — owners
                                of timgift.com, a leading e-commerce platform for fast-moving consumer
                                electronics in Nigeria. These Terms and Conditions govern your use of our
                                website and any purchase of products made through it. By accessing our
                                website or placing an order, you confirm that you have read, understood,
                                and agree to be bound by these Terms. If you do not agree, please refrain
                                from using our website.
                            </p>

                            {/* Section 1 */}
                            <PolicySection number="1" title="Eligibility">
                                <p>
                                    To use our website and make purchases, you must be at least{" "}
                                    <strong style={{ color: "var(--text)" }}>18 years of age</strong>, or be
                                    using the platform with the knowledge and consent of a parent or legal
                                    guardian. By placing an order, you represent and warrant that you meet
                                    this requirement.
                                </p>
                            </PolicySection>

                            {/* Section 2 */}
                            <PolicySection number="2" title="Products">
                                <p>
                                    We sell consumer electronics, accessories, and related products. We make
                                    every effort to ensure that product descriptions, images, specifications,
                                    and prices are accurate and up to date. However, minor variations in
                                    appearance or specifications may occasionally occur, particularly for
                                    used or refurbished devices. Where such variations are material, they
                                    will be disclosed on the product page.
                                </p>
                            </PolicySection>

                            {/* Section 3 */}
                            <PolicySection number="3" title="Pricing and Payment">
                                <PolicyList items={[
                                    "All prices are displayed in Nigerian Naira (₦) unless otherwise stated",
                                    "Prices are subject to change without prior notice",
                                    "Full payment must be received and confirmed before any order is processed",
                                    "We accept the payment methods listed and approved on our website at the time of purchase",
                                ]} />
                                <p>
                                    If a pricing error is identified after your order has been placed, we
                                    will notify you promptly and give you the option to proceed at the
                                    correct price or cancel your order for a full refund.
                                </p>
                            </PolicySection>

                            {/* Section 4 */}
                            <PolicySection number="4" title="Order Acceptance">
                                <p>
                                    Placing an order constitutes an offer to purchase products from us.
                                    We reserve the right to accept or decline any order at our discretion,
                                    including but not limited to cases involving:
                                </p>
                                <PolicyList items={[
                                    "Product unavailability or stock discrepancies",
                                    "Pricing or listing errors",
                                    "Suspected fraudulent activity",
                                    "Any other legitimate operational reason",
                                ]} />
                                <p>
                                    An order is only confirmed upon receipt of our explicit acceptance,
                                    typically communicated via order confirmation notification.
                                </p>
                            </PolicySection>

                            {/* Section 5 */}
                            <PolicySection number="5" title="Shipping and Delivery">
                                <p>
                                    All orders are processed and delivered in accordance with our{" "}
                                    <Link href="/delivery-policy" style={{ color: "var(--primary)", fontWeight: 600 }}>
                                        Delivery Policy
                                    </Link>
                                    . Delivery timeframes are estimates and may be affected by factors
                                    outside our control, including courier delays, weather conditions,
                                    and public holidays. We are not liable for delays arising from
                                    such circumstances.
                                </p>
                            </PolicySection>

                            {/* Section 6 */}
                            <PolicySection number="6" title="Returns and Refunds">
                                <p>
                                    Returns and refunds are governed by our{" "}
                                    <Link href="/refund-policy" style={{ color: "var(--primary)", fontWeight: 600 }}>
                                        Refund Policy
                                    </Link>
                                    . We strongly encourage all customers to review the Refund Policy
                                    carefully before completing a purchase. By placing an order, you
                                    acknowledge and accept the terms set out therein.
                                </p>
                            </PolicySection>

                            {/* Section 7 */}
                            <PolicySection number="7" title="Warranty">
                                <p>
                                    Products are covered only by the warranty expressly stated on the
                                    individual product page or provided directly by the manufacturer.
                                    Unless explicitly stated, no additional warranty is offered by TimGift.
                                    The following are expressly excluded from warranty coverage:
                                </p>
                                <PolicyList items={[
                                    "Damage caused by misuse, accidents, or physical impact",
                                    "Liquid or water damage",
                                    "Damage resulting from unauthorised repairs or modifications",
                                    "Improper handling or storage",
                                ]} />
                            </PolicySection>

                            {/* Section 8 */}
                            <PolicySection number="8" title="Customer Responsibilities">
                                <p>
                                    Customers are solely responsible for ensuring that all billing,
                                    shipping, and contact information provided at the time of purchase
                                    is accurate and complete. TimGift will not be held responsible for
                                    order delays, failed deliveries, or losses resulting from incorrect
                                    or incomplete information submitted by the customer.
                                </p>
                            </PolicySection>

                            {/* Section 9 */}
                            <PolicySection number="9" title="Intellectual Property">
                                <p>
                                    All content on this website — including but not limited to logos,
                                    brand identity, text, graphics, images, product descriptions, and
                                    software — is the property of Mofets Computers or its licensed
                                    partners, and is protected under applicable Nigerian and international
                                    intellectual property laws. No part of this website may be reproduced,
                                    distributed, or used without our prior written consent.
                                </p>
                            </PolicySection>

                            {/* Section 10 */}
                            <PolicySection number="10" title="Limitation of Liability">
                                <p>
                                    To the fullest extent permitted by applicable law, TimGift and
                                    Mofets Computers shall not be liable for any indirect, incidental,
                                    special, consequential, or punitive damages arising from:
                                </p>
                                <PolicyList items={[
                                    "Your use of or inability to use our website",
                                    "Any products purchased through our platform",
                                    "Unauthorised access to or alteration of your data",
                                    "Any other matter relating to our services",
                                ]} />
                                <p>
                                    Our total liability in any matter shall not exceed the amount
                                    paid by you for the specific product or service in question.
                                </p>
                            </PolicySection>

                            {/* Section 11 */}
                            <PolicySection number="11" title="Privacy">
                                <p>
                                    Your personal information is collected and processed in accordance
                                    with our{" "}
                                    <Link href="/privacy-policy" style={{ color: "var(--primary)", fontWeight: 600 }}>
                                        Privacy Policy
                                    </Link>
                                    , which forms part of these Terms and Conditions. By using our
                                    website, you consent to the collection and use of your data as
                                    described therein.
                                </p>
                            </PolicySection>

                            {/* Section 12 */}
                            <PolicySection number="12" title="Prohibited Activities">
                                <p>By using our website, you agree that you will not:</p>
                                <PolicyList items={[
                                    "Use the website for any unlawful, fraudulent, or harmful purpose",
                                    "Attempt to gain unauthorised access to or interfere with the website's systems, infrastructure, or security",
                                    "Submit false, misleading, or deceptive information in any form",
                                    "Engage in, facilitate, or attempt any fraudulent transactions",
                                    "Scrape, copy, or reproduce content from this website without our written permission",
                                ]} />
                                <p>
                                    We reserve the right to suspend or permanently ban access for
                                    any user found to be in violation of these prohibitions.
                                </p>
                            </PolicySection>

                            {/* Section 13 */}
                            <PolicySection number="13" title="Account Security">
                                <p>
                                    If you create an account on our platform, you are responsible for
                                    maintaining the confidentiality of your login credentials. You are
                                    fully responsible for all activities conducted under your account,
                                    whether or not authorised by you. Please notify us immediately if
                                    you suspect any unauthorised use of your account.
                                </p>
                            </PolicySection>

                            {/* Section 14 */}
                            <PolicySection number="14" title="Changes to These Terms">
                                <p>
                                    We reserve the right to update or modify these Terms and Conditions
                                    at any time. Any changes will take effect immediately upon publication
                                    on this page. The effective date at the top of this document will be
                                    updated accordingly. Your continued use of our website after any
                                    changes constitutes your acceptance of the revised Terms.
                                </p>
                                <p>
                                    We encourage you to review this page periodically to stay informed
                                    of any updates.
                                </p>
                            </PolicySection>

                            {/* Section 15 */}
                            <PolicySection number="15" title="Governing Law">
                                <p>
                                    These Terms and Conditions shall be governed by, and construed in
                                    accordance with, the laws of the{" "}
                                    <strong style={{ color: "var(--text)" }}>Federal Republic of Nigeria</strong>.
                                    Any disputes arising out of or in connection with these Terms shall
                                    be subject to the exclusive jurisdiction of the competent courts
                                    of Nigeria.
                                </p>
                            </PolicySection>

                            {/* Section 16 */}
                            <PolicySection number="16" title="Contact Us" isLast>
                                <p>
                                    If you have any questions, concerns, or requests relating to these
                                    Terms and Conditions, please contact us through the phone number
                                    or contact details provided on our website or sales platform.
                                    We are happy to assist.
                                </p>
                            </PolicySection>

                            {/* Acknowledgement banner */}
                            <div style={{
                                marginTop: "56px",
                                padding: "28px 32px",
                                borderRadius: "16px",
                                backgroundColor: "rgba(22, 163, 74, 0.06)",
                                border: "1px solid rgba(22, 163, 74, 0.2)",
                            }}>
                                <p style={{
                                    fontSize: "14px",
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.8,
                                    textAlign: "center",
                                    margin: 0,
                                }}>
                                    By using our website and placing an order, you acknowledge that you
                                    have read, understood, and agreed to these Terms and Conditions in
                                    full.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ backgroundColor: "var(--bg-secondary)", padding: "72px 0" }}>
                    <div className="container">
                        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
                            <h2 style={{
                                fontSize: "clamp(22px, 4vw, 28px)",
                                fontWeight: 700,
                                color: "var(--text)",
                                fontFamily: "var(--font-display)",
                                marginBottom: "12px",
                            }}>
                                Questions about our terms? We&apos;re happy to help.
                            </h2>
                            <p style={{
                                fontSize: "15px",
                                color: "var(--text-secondary)",
                                lineHeight: 1.7,
                                marginBottom: "32px",
                            }}>
                                If anything in these Terms is unclear, reach out to us directly.
                                Otherwise, head over to our store and find your next favourite device.
                            </p>
                            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link href="/contact" className="btn btn-primary" style={{ padding: "14px 28px" }}>
                                    Contact Us
                                </Link>
                                <Link href="/" className="btn btn-secondary" style={{ padding: "14px 28px" }}>
                                    Back to Home
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

/* ── Numbered section block ── */
function PolicySection({
    number,
    title,
    children,
    isLast = false,
}: {
    number: string;
    title: string;
    children: React.ReactNode;
    isLast?: boolean;
}) {
    return (
        <div style={{
            marginBottom: isLast ? "0" : "48px",
            paddingBottom: isLast ? "0" : "48px",
            borderBottom: isLast ? "none" : "1px solid var(--border)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(22, 163, 74, 0.1)",
                    color: "var(--primary)",
                    fontWeight: 700,
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    {number}
                </span>
                <h2 style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--text)",
                    fontFamily: "var(--font-display)",
                }}>
                    {title}
                </h2>
            </div>

            <div style={{
                paddingLeft: "44px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
            }}>
                {children}
            </div>
        </div>
    );
}

/* ── Bullet list ── */
function PolicyList({ items }: { items: string[] }) {
    return (
        <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {items.map((item) => (
                <li
                    key={item}
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "15px",
                        lineHeight: 1.7,
                        listStyleType: "disc",
                    }}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}
