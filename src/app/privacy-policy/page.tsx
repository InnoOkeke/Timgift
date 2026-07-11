import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Tim Gift",
    description: "Learn how Tim Gift collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
                                Privacy Policy
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
                                At Tim Gift, we value your privacy and are committed to protecting your
                                personal information. This Privacy Policy explains what data we collect,
                                how we use it, and the rights available to you as our customer.
                            </p>

                            {/* Section 1 */}
                            <PolicySection number="1" title="Information We Collect">
                                <p>
                                    When you purchase a product from us or contact us, we may collect
                                    the following personal information:
                                </p>
                                <PolicyList items={[
                                    "Full name",
                                    "Phone number",
                                    "Email address (where provided)",
                                    "Delivery address (for shipped orders)",
                                    "Payment information necessary to complete your transaction",
                                ]} />
                                <p>
                                    We collect only the information required to fulfil your order and
                                    provide you with a seamless shopping experience.
                                </p>
                            </PolicySection>

                            {/* Section 2 */}
                            <PolicySection number="2" title="How We Use Your Information">
                                <p>We use the information we collect to:</p>
                                <PolicyList items={[
                                    "Process and deliver your orders efficiently",
                                    "Respond to your enquiries and provide customer support",
                                    "Send updates and notifications regarding your purchase",
                                    "Comply with applicable legal obligations",
                                ]} />
                                <p>
                                    We do not use your personal information for marketing purposes
                                    without your express consent.
                                </p>
                            </PolicySection>

                            {/* Section 3 */}
                            <PolicySection number="3" title="Data Protection">
                                <p>
                                    We take the security of your personal information seriously.
                                    Tim Gift implements reasonable technical and administrative measures
                                    to protect your data from unauthorised access, disclosure, alteration,
                                    or misuse. While no system can guarantee absolute security, we
                                    continuously work to safeguard the information entrusted to us.
                                </p>
                            </PolicySection>

                            {/* Section 4 */}
                            <PolicySection number="4" title="Information Sharing">
                                <p>
                                    We do not sell, rent, or trade your personal information to third
                                    parties. We may share your data only in the following circumstances:
                                </p>
                                <PolicyList items={[
                                    "With trusted service providers — such as delivery couriers or payment processors — strictly to the extent necessary to complete your order",
                                    "Where required by law, regulation, or a lawful request from a government authority",
                                ]} />
                                <p>
                                    All third-party service providers we engage are required to handle
                                    your information responsibly and in accordance with applicable data
                                    protection standards.
                                </p>
                            </PolicySection>

                            {/* Section 5 */}
                            <PolicySection number="5" title="Customer Responsibility">
                                <p>
                                    Customers are encouraged to inspect and test all devices upon receipt.
                                    Used and refurbished phones are sold in the condition described and
                                    agreed upon at the time of purchase. Please review the product
                                    description carefully before completing your order.
                                </p>
                            </PolicySection>

                            {/* Section 6 */}
                            <PolicySection number="6" title="Your Rights">
                                <p>
                                    Subject to applicable legal requirements, you have the right to:
                                </p>
                                <PolicyList items={[
                                    "Request access to the personal information we hold about you",
                                    "Request correction of any inaccurate or incomplete data",
                                    "Request deletion of your personal information",
                                ]} />
                                <p>
                                    To exercise any of these rights, please contact us using the
                                    details provided below.
                                </p>
                            </PolicySection>

                            {/* Section 7 */}
                            <PolicySection number="7" title="Contact Us" isLast>
                                <p>
                                    If you have any questions about this Privacy Policy or the way
                                    your personal information is handled, please reach out to us
                                    through the business phone number or email address displayed on
                                    our sales platform. We are happy to assist.
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
                                Your privacy is protected. Shop with confidence.
                            </h2>
                            <p style={{
                                fontSize: "15px",
                                color: "var(--text-secondary)",
                                lineHeight: 1.7,
                                marginBottom: "32px",
                            }}>
                                We handle your information with care so you can focus on finding
                                the perfect device. Browse our full range of premium electronics today.
                            </p>
                            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                                <Link href="/products" className="btn btn-primary" style={{ padding: "14px 28px" }}>
                                    Shop Now
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
            {/* Section heading */}
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

            {/* Body — indented to align with heading text */}
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
