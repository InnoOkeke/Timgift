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
            default: return '#EAB308'; // PENDING
        }
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-72 p-12 pt-20">
                <header className="mb-16">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                        <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--primary)" }}></span>
                        <span>Sales Tracking</span>
                    </div>
                    <h1
                        className="text-4xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        Order Management
                    </h1>
                    <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
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
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", backgroundColor: "rgba(0,0,0,0.02)" }}>
                                        <th className="px-8 py-4">Customer Details</th>
                                        <th className="px-8 py-4">Ordered Items</th>
                                        <th className="px-8 py-4">Total Amount</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                                    {orders.map((order: Order) => (
                                        <tr key={order.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-4">
                                                <p className="font-bold text-sm" style={{ color: "var(--text)" }}>{order.customerName}</p>
                                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{order.customerPhone}</p>
                                                <p className="text-[10px] truncate max-w-[150px]" style={{ color: "var(--text-muted)" }}>{order.customerAddress}</p>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex -space-x-2">
                                                    {order.items?.slice(0, 3).map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 overflow-hidden"
                                                            title={`${item.name} (${item.quantity})`}
                                                        >
                                                            <img src={item.media?.[0]?.url} className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                    {order.items?.length > 3 && (
                                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] text-white font-bold">
                                                            +{order.items.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                                                    {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ').slice(0, 30)}...
                                                </p>
                                            </td>
                                            <td className="px-8 py-4 font-bold text-sm" style={{ color: "var(--text)" }}>
                                                ₦{order.totalAmount.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-4">
                                                <select
                                                    className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest focus:ring-0 cursor-pointer p-0"
                                                    style={{ color: getStatusColor(order.status) }}
                                                    defaultValue={order.status}
                                                    onChange={async (e) => {
                                                        // Update status logic could go here
                                                        console.log("Update status to:", e.target.value);
                                                    }}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="COMPLETED">Completed</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-8 py-4 text-right text-xs" style={{ color: "var(--text-muted)" }}>
                                                {new Date(order.createdAt).toLocaleDateString()}<br />
                                                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
