"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";

export default function AdminDashboard() {
    interface Product {
        id: number;
        stockQuantity: number;
    }

    interface Order {
        id: number;
        customerName: string;
        customerPhone: string;
        status: string;
        totalAmount: number;
        createdAt: string;
    }

    interface StatCardProps {
        title: string;
        value: string | number;
        subtext: string;
        icon: string;
        color: string;
    }

    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        totalProducts: 0
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // In a real app, we'd have a specific /api/admin/stats endpoint
                // For now we fetch current lists to compute
                const [productsRes, ordersRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/orders')
                ]);

                if (productsRes.ok && ordersRes.ok) {
                    const products: Product[] = await productsRes.json();
                    const orders: Order[] = await ordersRes.json();

                    const activeOrders = orders.filter((o) => o.status === 'PENDING').length;
                    const totalSales = orders
                        .filter((o) => o.status === 'COMPLETED')
                        .reduce((acc, o) => acc + o.totalAmount, 0);

                    const totalInventory = products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);

                    setStats({
                        totalSales,
                        activeOrders,
                        totalProducts: totalInventory
                    });
                    setRecentOrders(orders.slice(0, 5));
                }
            } catch (error) {
                console.error("Dashboard Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const StatCard = ({ title, value, subtext, icon, color }: StatCardProps) => (
        <div
            className="p-6 rounded-2xl border transition-all hover:shadow-lg"
            style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border)"
            }}
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${color}15`, color: color }}
                >
                    {icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-500">
                    Live
                </span>
            </div>
            <h3 className="text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                {title}
            </h3>
            <p className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
                {value}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {subtext}
            </p>
        </div>
    );

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-72 p-12 pt-20">
                <header className="mb-16">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                        <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--primary)" }}></span>
                        <span>Management Overview</span>
                    </div>
                    <h1
                        className="text-4xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                    >
                        Dashboard
                    </h1>
                    <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                        Welcome back to your Tim Gift command center.
                    </p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }}></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <StatCard
                                title="Total Revenue"
                                value={`₦${stats.totalSales.toLocaleString()}`}
                                subtext="Total from completed orders"
                                icon="💰"
                                color="var(--primary)"
                            />
                            <StatCard
                                title="Active Orders"
                                value={stats.activeOrders}
                                subtext="Pending items requiring attention"
                                icon="📦"
                                color="#EAB308"
                            />
                            <StatCard
                                title="Inventory"
                                value={stats.totalProducts}
                                subtext="Total products in catalog"
                                icon="📱"
                                color="#6366F1"
                            />
                        </div>

                        <div
                            className="rounded-2xl border overflow-hidden"
                            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                        >
                            <div className="px-10 py-8 border-b flex justify-between items-center" style={{ borderColor: "var(--border)" }}>
                                <h3 className="font-bold text-xl" style={{ color: "var(--text)" }}>
                                    Recent Orders
                                </h3>
                                <Link href="/admin/orders" className="text-sm font-semibold hover:underline" style={{ color: "var(--primary)" }}>
                                    View All Orders →
                                </Link>
                            </div>

                            {recentOrders.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="text-4xl mb-4 opacity-20">📭</div>
                                    <p style={{ color: "var(--text-muted)" }}>No recent orders found.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", backgroundColor: "rgba(0,0,0,0.02)" }}>
                                                <th className="px-8 py-4">Customer</th>
                                                <th className="px-8 py-4">Status</th>
                                                <th className="px-8 py-4">Amount</th>
                                                <th className="px-8 py-4">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                                            {recentOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-4">
                                                        <p className="font-bold text-sm" style={{ color: "var(--text)" }}>{order.customerName}</p>
                                                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{order.customerPhone}</p>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}
                                                            style={{
                                                                backgroundColor: order.status === 'COMPLETED' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                                                color: order.status === 'COMPLETED' ? '#22C55E' : '#EAB308'
                                                            }}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-4 font-bold text-sm" style={{ color: "var(--text)" }}>
                                                        ₦{order.totalAmount.toLocaleString()}
                                                    </td>
                                                    <td className="px-8 py-4 text-xs" style={{ color: "var(--text-muted)" }}>
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
