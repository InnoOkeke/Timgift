import { Product } from "@/types";

interface InvoiceProps {
    customerName: string;
    customerAddress?: string;
    items: { product: Product; quantity: number }[];
    totalAmount: number;
}

export default function Invoice({ customerName, customerAddress, items, totalAmount }: InvoiceProps) {
    const currentDate = new Date().toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const invoiceNumber = `TG-${Date.now().toString().slice(-6)}`;

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '24px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                padding: '28px',
                background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.08), rgba(22, 163, 74, 0.02))',
                borderBottom: '1px solid var(--border)',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                backgroundColor: '#16A34A',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '16px',
                                fontFamily: 'var(--font-display)',
                            }}>
                                TG
                            </div>
                            <div>
                                <div style={{
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    color: 'var(--text)',
                                    fontFamily: 'var(--font-display)',
                                }}>
                                    Tim Gift
                                </div>
                                <div style={{
                                    fontSize: '11px',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontWeight: 600,
                                }}>
                                    Premium Gadgets
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: 'var(--text-muted)',
                            marginBottom: '4px'
                        }}>
                            Invoice
                        </div>
                        <div style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'var(--text)',
                            fontFamily: 'var(--font-mono, monospace)',
                        }}>
                            {invoiceNumber}
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            marginTop: '4px'
                        }}>
                            {currentDate}
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Info */}
            {customerName && (
                <div style={{
                    padding: '20px 28px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        flexShrink: 0,
                    }}>
                        👤
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: 'var(--text-muted)',
                            marginBottom: '4px'
                        }}>
                            Bill To
                        </div>
                        <div style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: 'var(--text)',
                            marginBottom: customerAddress ? '4px' : '0'
                        }}>
                            {customerName}
                        </div>
                        {customerAddress && (
                            <div style={{
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.5,
                            }}>
                                {customerAddress}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Items */}
            <div style={{ padding: '24px 28px' }}>
                {items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <div style={{
                            fontSize: '48px',
                            marginBottom: '16px',
                            opacity: 0.4
                        }}>
                            🛒
                        </div>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '15px',
                            fontWeight: 500,
                            marginBottom: '4px'
                        }}>
                            Your cart is empty
                        </p>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '13px',
                        }}>
                            Add products to see them here
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {items.map((item, index) => {
                            const imageUrl = item.product.media?.[0]?.url ||
                                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop";

                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '12px',
                                        backgroundColor: 'var(--bg)',
                                        borderRadius: '14px',
                                        border: '1px solid var(--border)',
                                    }}
                                >
                                    {/* Product Image */}
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        backgroundColor: 'var(--bg-secondary)',
                                    }}>
                                        <img
                                            src={imageUrl}
                                            alt={item.product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop";
                                            }}
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: 'var(--text)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginBottom: '4px'
                                        }}>
                                            {item.product.name}
                                        </p>
                                        <p style={{
                                            fontSize: '12px',
                                            color: 'var(--text-muted)',
                                        }}>
                                            ₦{item.product.price.toLocaleString()} × {item.quantity}
                                        </p>
                                    </div>

                                    {/* Item Total */}
                                    <p style={{
                                        fontWeight: 700,
                                        fontSize: '15px',
                                        color: 'var(--text)',
                                        flexShrink: 0,
                                    }}>
                                        ₦{(item.product.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Total */}
            {items.length > 0 && (
                <div style={{
                    padding: '24px 28px',
                    background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(22, 163, 74, 0.04))',
                    borderTop: '1px solid var(--border)',
                }}>
                    {/* Subtotal */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px dashed var(--border)',
                    }}>
                        <span style={{
                            fontSize: '13px',
                            color: 'var(--text-secondary)',
                        }}>
                            Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                        </span>
                        <span style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'var(--text)',
                        }}>
                            ₦{totalAmount.toLocaleString()}
                        </span>
                    </div>

                    {/* Grand Total */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: 'var(--text)',
                        }}>
                            Total Amount
                        </span>
                        <span style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.02em',
                        }}>
                            ₦{totalAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
