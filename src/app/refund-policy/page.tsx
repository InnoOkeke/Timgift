import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund Policy | TimGift",
    description: "Understand TimGift's return, refund, and exchange policy for all device purchases.",
};

export default function RefundPolicyPage() {
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
                                Refund Policy
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
                                Thank you for shopping with TimGift. Every device we sell is thoroughly
                                tested and inspected before dispatch to ensure it meets our quality standards
                                and is in good working condition. We stand behind every product we sell,
                                and this policy outlines the terms under which returns, refunds, and
                                exchanges may be granted.
                            </p>

                            {/* Section 1 */}
                            <PolicySection number="1" title="Returns and Refunds">
                                <p>
                                    Customers may request a return within <strong style={{ color: "var(--text)" }}>7 days</strong> of
                                    receiving their device, provided the following conditions are met:
                                </p>
                                <PolicyList items={[
                                    "The device has a verified hardware defect that was not disclosed at the time of purchase",
                                    "The device is returned in the exact condition in which it was sold — with no additional damage, tampering, or modification",
                                    "All original accessories included with the purchase (where applicable) are returned alongside the device",
                                ]} />
                                <p>
                                    Refunds will only be processed after the returned device has been
                                    physically inspected and the reported issue has been confirmed by
                                    our team.
                                </p>
                            </PolicySection>

                            {/* Section 2 */}
                            <PolicySection number="2" title="Non-Refundable Situations">
                                <p>
                                    Refunds will <strong style={{ color: "var(--text)" }}>not</strong> be
                                    granted in the following circumstances:
                                </p>
                                <PolicyList items={[
                                    "Change of mind after purchase",
                                    "Physical damage caused by misuse, accidental drops, water or liquid exposure, or any form of impact after delivery",
                                    "Damage resulting from unauthorised repairs or modifications carried out after purchase",
                                    "Software-related issues caused by customer-installed applications, system modifications, or factory resets performed by the customer",
                                    "Normal cosmetic wear (such as minor scratches or scuffs) that was clearly disclosed prior to the sale",
                                ]} />
                                <p>
                                    We strongly encourage all customers to inspect and test their device
                                    thoroughly upon receipt and to raise any concerns within the
                                    applicable return window.
                                </p>
                            </PolicySection>

                            {/* Section 3 */}
                            <PolicySection number="3" title="Exchanges">
                                <p>
                                    Where a return is approved and a suitable replacement is available
                                    in our inventory, we may offer an exchange for a similar model as
                                    an alternative to a monetary refund. The option of exchange versus
                                    refund will be discussed and agreed upon with the customer on a
                                    case-by-case basis.
                                </p>
                            </PolicySection>

                            {/* Section 4 */}
                            <PolicySection number="4" title="Refund Processing">
                                <p>
                                    Once a return has been received and the reported defect has been
                                    verified, approved refunds will be processed within{" "}
                                    <strong style={{ color: "var(--text)" }}>5 to 10 business days</strong>.
                                    Refunds will be issued via the original payment method used at
                                    the time of purchase, or through another method mutually agreed
                                    upon by both parties.
                                </p>
                                <p>
                                    Customers will be notified once their refund has been approved
                                    and initiated.
                                </p>
                            </PolicySection>

                            {/* Section 5 */}
                            <PolicySection number="5" title="Contact Us" isLast>
                                <p>
                                    If you have questions about this Refund Policy or wish to initiate
                                    a return, please contact us with your order details and a clear
                                    description of the issue. Our team will review your request promptly
                                    and guide you through the process.
                                </p>
                                <p>
                                    You can reach us via the phone number or contact details provided
                                    on our sales platform.
                                </p>
                            </PolicySection>

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
                                We stand behind every product we sell.
                            </h2>
                            <p style={{
                                fontSize: "15px",
                                color: "var(--text-secondary)",
                                lineHeight: 1.7,
                                marginBottom: "32px",
                            }}>
                                Every device is tested and inspected before it reaches you. Shop with
                                the confidence that we've got you covered.
                            </p>
                            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link href="/products" className="btn btn-primary" style={{ padding: "14px 28px" }}>
                                    Browse Products
                                </Link>
                                <Link href="/contact" className="btn btn-secondary" style={{ padding: "14px 28px" }}>
                                    Contact Us
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
