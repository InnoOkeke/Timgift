"use client";

export default function BuySellBanner() {
    return (
        <section style={{ backgroundColor: "var(--bg)", padding: "16px 0 0" }}>
            <div className="container">
                <a
                    href="https://wa.me/2348090529117?text=Hi%20TimGift%2C%20I%27d%20like%20to%20enquire%20about%20buying%20or%20selling%20a%20device."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "linear-gradient(135deg, #064e3b 0%, #065f46 60%, #059669 100%)",
                        borderRadius: "14px",
                        padding: "20px 24px",
                        textDecoration: "none",
                        gap: "16px",
                        flexWrap: "wrap",
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.93";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    {/* Left — icon + text */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255,255,255,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "26px",
                            flexShrink: 0,
                        }}>
                            🔄
                        </div>
                        <div>
                            <p style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "rgba(255,255,255,0.7)",
                                margin: "0 0 4px 0",
                            }}>
                                Got a device to sell?
                            </p>
                            <h3 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(18px, 3vw, 24px)",
                                fontWeight: 800,
                                color: "#FFFFFF",
                                margin: 0,
                                letterSpacing: "-0.02em",
                            }}>
                                Buy &amp; Sell With Us
                            </h3>
                        </div>
                    </div>

                    {/* Right — WhatsApp CTA */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        backgroundColor: "#25D366",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        flexShrink: 0,
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                        </svg>
                        <span style={{
                            color: "white",
                            fontWeight: 700,
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                        }}>
                            Chat on WhatsApp
                        </span>
                    </div>
                </a>
            </div>
        </section>
    );
}
