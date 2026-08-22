"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Order } from "@/types";

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Fetch Orders Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return '#22C55E';
            case 'CANCELLED': return '#EF4444';
            default: return '#EAB308';
        }
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-72 p-8 pt-16">
                <header className="mb-10">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--primary)" }}>
                        <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--primary)" }}></span>
                        <span>Sales Tracking</span>
                    </div>
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        Order Management
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Track and process customer purchases from the store.
                    </p>
                </header>

                <div
                    className="rounded-2xl border overflow-hidden"
                    style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                >
                    {loading ? (
                        <div className="p-20 text-center animate-pulse" style={{ color: "var(--text-muted)" }}>
                            Loading orders...
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="text-6xl mb-6 opacity-20">🛒</div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>No orders yet</h3>
                            <p style={{ color: "var(--text-muted)" }}>Orders will appear here once customers complete the checkout flow.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left" style={{ minWidth: "700px" }}>
                                <thead>
                                    <tr
                                        className="text-xs uppercase tracking-widest"
                                        style={{ color: "var(--text-muted)", backgroundColor: "rgba(0,0,0,0.03)" }}
                                    >
                                        <th className="px-5 py-4 whitespace-nowrap">Customer</th>
                                        <th className="px-5 py-4 whitespace-nowrap">Items</th>
                                        <th className="px-5 py-4 whitespace-nowrap">Total</th>
                                        <th className="px-5 py-4 whitespace-nowrap">Status</th>
                                        <th className="px-5 py-4 whitespace-nowrap text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="divide-y"
                                    style={{ borderColor: "var(--border)" }}
                                >
                                    {orders.map((order: Order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                        >
                                            {/* Customer Details */}
                                            <td className="px-5 py-4" style={{ minWidth: "160px", maxWidth: "200px" }}>
                                                <p className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>
                                                    {order.customerName}
                                                </p>
                                                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                                                    {order.customerPhone}
                                                </p>
                                                <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                                                    {order.customerAddress}
                                                </p>
                                            </td>

                                            {/* Ordered Items */}
                                            <td className="px-5 py-4" style={{ minWidth: "180px", maxWidth: "240px" }}>
                                                <div className="flex items-center gap-1 flex-wrap">
                                                    {order.items?.slice(0, 3).map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            title={`${item.name} ×${item.quantity}`}
                                                            className="flex-shrink-0 rounded-lg border overflow-hidden bg-gray-100 dark:bg-gray-800"
                                                            style={{
                                                                width: "36px",
                                                                height: "36px",
                                                                borderColor: "var(--border)",
                                                            }}
                                                        >
                                                            {item.media?.[0]?.url ? (
                                                                <img
                                                                    src={item.media[0].url}
                                                                    alt={item.name}
                                                                    width={36}
                                                                    height={36}
                                                                    style={{ width: "36px", height: "36px", objectFit: "cover", display: "block" }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[10px]" style={{ color: "var(--text-muted)" }}>
                                                                    📦
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {order.items?.length > 3 && (
                                                        <div
                                                            className="flex-shrink-0 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                                                            style={{ width: "36px", height: "36px", backgroundColor: "var(--primary)" }}
                                                        >
                                                            +{order.items.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                                    {order.items?.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                                                </p>
                                            </td>

                                            {/* Total Amount */}
                                            <td className="px-5 py-4 whitespace-nowrap" style={{ minWidth: "100px" }}>
                                                <span className="font-bold text-sm" style={{ color: "var(--text)" }}>
                                                    ₦{order.totalAmount.toLocaleString()}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4" style={{ minWidth: "120px" }}>
                                                <select
                                                    className="bg-transparent border rounded-lg text-xs font-bold uppercase tracking-wide focus:outline-none cursor-pointer px-2 py-1"
                                                    style={{
                                                        color: getStatusColor(order.status),
                                                        borderColor: getStatusColor(order.status) + "55",
                                                        backgroundColor: getStatusColor(order.status) + "11",
                                                    }}
                                                    value={order.status}
                                                    onChange={async (e) => {
                                                        const newStatus = e.target.value as Order['status'];
                                                        try {
                                                            const res = await fetch('/api/orders', {
                                                                method: 'PATCH',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ id: order.id, status: newStatus })
                                                            });
                                                            if (res.ok) {
                                                                setOrders(prev =>
                                                                    prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o)
                                                                );
                                                            } else {
                                                                alert("Failed to update status");
                                                            }
                                                        } catch (error) {
                                                            console.error("Update Status Error:", error);
                                                            alert("An error occurred while updating status");
                                                        }
                                                    }}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="COMPLETED">Completed</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-right whitespace-nowrap" style={{ minWidth: "100px" }}>
                                                <p className="text-xs font-medium" style={{ color: "var(--text)" }}>
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                                                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
