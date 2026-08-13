import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Delivery Policy | TimGift",
    description: "Everything you need to know about TimGift's order processing, delivery timelines, and shipping terms.",
};

export default function DeliveryPolicyPage() {
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
                                Delivery Policy
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
                                Thank you for shopping with TimGift. We are committed to delivering
                                your electronics safely, securely, and as promptly as possible.
                                Please read this Delivery Policy carefully so you know what to expect
                                once your order has been placed.
                            </p>

                            {/* Section 1 */}
                            <PolicySection number="1" title="Order Processing">
                                <p>
                                    All orders are processed within{" "}
                                    <strong style={{ color: "var(--text)" }}>1 to 2 business days</strong>{" "}
                                    after payment has been confirmed. Orders placed on weekends or
                                    public holidays will be processed on the next available business day.
                                </p>
                                <p>
                                    You will receive a confirmation notification once your order has
                                    been processed and is ready for dispatch.
                                </p>
                            </PolicySection>

                            {/* Section 2 */}
                            <PolicySection number="2" title="Delivery Areas">
                                <p>
                                    We currently deliver to all states and territories{" "}
                                    <strong style={{ color: "var(--text)" }}>nationwide within Nigeria</strong>.
                                    Please note that deliveries to remote or hard-to-reach locations
                                    may take longer than the standard estimated timeframes.
                                </p>
                            </PolicySection>

                            {/* Section 3 */}
                            <PolicySection number="3" title="Delivery Timeframes">
                                <p>
                                    Estimated delivery times from the date of dispatch are as follows:
                                </p>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                    gap: "16px",
                                    margin: "4px 0",
                                }}>
                                    <DeliveryCard
                                        icon="🏙️"
                                        label="Major Cities"
                                        time="1 – 3 Business Days"
                                    />
                                    <DeliveryCard
                                        icon="📦"
                                        label="Other Locations"
                                        time="3 – 7 Business Days"
                                    />
                                </div>
                                <p>
                                    These timeframes are estimates only and are not guaranteed.
                                    Actual delivery times may be affected by weather conditions,
                                    courier delays, public holidays, high-order volumes, or other
                                    circumstances beyond our control.
                                </p>
                            </PolicySection>

                            {/* Section 4 */}
                            <PolicySection number="4" title="Delivery Charges">
                                <p>
                                    Shipping fees are calculated based on your delivery location and
                                    the size or weight of the item being shipped. The applicable
                                    delivery fee will be clearly displayed at checkout before you
                                    complete your purchase — there are no hidden charges.
                                </p>
                            </PolicySection>

                            {/* Section 5 */}
                            <PolicySection number="5" title="Order Tracking">
                                <p>
                                    Where tracking is available through our courier partners, a
                                    tracking number will be provided to you after your order has
                                    been dispatched. You can use this number to monitor the progress
                                    of your delivery in real time.
                                </p>
                                <p>
                                    If you do not receive a tracking number or have difficulty
                                    locating your shipment, please contact our support team for
                                    assistance.
                                </p>
                            </PolicySection>

                            {/* Section 6 */}
                            <PolicySection number="6" title="Delivery Inspection">
                                <p>
                                    Please inspect your package carefully upon delivery. If the
                                    packaging appears damaged, tampered with, or if the item
                                    received does not match your order, you must:
                                </p>
                                <PolicyList items={[
                                    "Notify us within 24 hours of receiving the delivery",
                                    "Provide clear photographs of the damaged packaging and/or incorrect item",
                                    "Retain all original packaging until the issue has been resolved",
                                ]} />
                                <p>
                                    Failure to report delivery issues within 24 hours may affect
                                    your eligibility for a resolution. We take all such reports
                                    seriously and will work swiftly to address them.
                                </p>
                            </PolicySection>

                            {/* Section 7 */}
                            <PolicySection number="7" title="Failed Delivery Attempts">
                                <p>
                                    If a delivery cannot be completed because the recipient is
                                    unavailable at the time of the attempt, or because the delivery
                                    address provided was incomplete or incorrect, a re-delivery may
                                    be arranged. Please note that additional delivery charges may
                                    apply in such cases.
                                </p>
                                <p>
                                    To avoid failed delivery attempts, please ensure that your
                                    delivery address is accurate and that someone is available to
                                    receive the package at the time of delivery.
                                </p>
                            </PolicySection>

                            {/* Section 8 */}
                            <PolicySection number="8" title="Ownership and Risk">
                                <p>
                                    Ownership of and responsibility for an item transfers to the
                                    customer once the package has been successfully delivered to
                                    the delivery address provided at the time of order. TimGift
                                    is not liable for loss, theft, or damage that occurs after
                                    a successful delivery has been confirmed.
                                </p>
                            </PolicySection>

                            {/* Section 9 */}
                            <PolicySection number="9" title="Contact Us" isLast>
                                <p>
                                    If you have any questions about your delivery, need to update
                                    your address, or require assistance with an order, please
                                    contact our customer support team using the phone number or
                                    contact details provided on our website or sales platform.
                                    We are always happy to help.
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
                                Fast, reliable delivery nationwide.
                            </h2>
                            <p style={{
                                fontSize: "15px",
                                color: "var(--text-secondary)",
                                lineHeight: 1.7,
                                marginBottom: "32px",
                            }}>
                                From Lagos to Port Harcourt, Abuja to Kano — we deliver quality
                                electronics to your door, wherever you are in Nigeria.
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

/* ── Delivery time card ── */
function DeliveryCard({ icon, label, time }: { icon: string; label: string; time: string }) {
    return (
        <div style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
        }}>
            <span style={{ fontSize: "24px" }}>{icon}</span>
            <div>
                <p style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "4px",
                }}>
                    {label}
                </p>
                <p style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--primary)",
                    fontFamily: "var(--font-display)",
                }}>
                    {time}
                </p>
            </div>
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
