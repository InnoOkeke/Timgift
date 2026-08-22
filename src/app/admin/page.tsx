"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";

export default function AdminDashboard() {
    interface Product {
        id: number;
        stockQuantity: number;
    }

    interface OrderItem {
        name: string;
        quantity: number;
        price: number;
        media?: { url: string }[];
    }

    interface Order {
        id: number;
        customerName: string;
        customerPhone: string;
        customerAddress?: string;
        status: string;
        totalAmount: number;
        items?: OrderItem[];
        createdAt: string;
    }

    interface StatCardProps {
        title: string;
        value: string | number;
        subtext: string;
        icon: React.ReactNode;
        color: string;
        badge?: string;
        badgeColor?: string;
        link?: string;
    }

    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        completedOrders: 0,
        totalProducts: 0,
        totalOrdersCount: 0,
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsRes, ordersRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/orders')
                ]);

                if (productsRes.ok && ordersRes.ok) {
                    const products: Product[] = await productsRes.json();
                    const orders: Order[] = await ordersRes.json();

                    const activeOrders = orders.filter((o) => o.status === 'PENDING').length;
                    const completedOrders = orders.filter((o) => o.status === 'COMPLETED').length;
                    const totalSales = orders
                        .filter((o) => o.status === 'COMPLETED')
                        .reduce((acc, o) => acc + o.totalAmount, 0);

                    const totalInventory = products.reduce((acc, p) => acc + (p.stockQuantity || 0), 0);

                    setStats({
                        totalSales,
                        activeOrders,
                        completedOrders,
                        totalProducts: totalInventory,
                        totalOrdersCount: orders.length,
                    });
                    setRecentOrders(orders.slice(0, 6));
                }
            } catch (error) {
                console.error("Dashboard Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Customer initials helper
    const getInitials = (name: string) => {
        if (!name) return "TG";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    const StatCard = ({ title, value, subtext, icon, color, badge, badgeColor, link }: StatCardProps) => {
        const cardContent = (
            <div
                className="group relative p-5 rounded-2xl border transition-all duration-200 hover:shadow-md"
                style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border)",
                }}
            >
                <div className="flex justify-between items-start mb-3">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                            backgroundColor: `${color}15`,
                            color: color,
                            border: `1px solid ${color}25`
                        }}
                    >
                        {icon}
                    </div>
                    {badge && (
                        <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                            style={{
                                backgroundColor: badgeColor ? `${badgeColor}12` : "rgba(22, 163, 74, 0.1)",
                                color: badgeColor || "var(--primary)",
                                borderColor: badgeColor ? `${badgeColor}25` : "rgba(22, 163, 74, 0.2)"
                            }}
                        >
                            {badge}
                        </span>
                    )}
                </div>

                <h3 className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    {title}
                </h3>
                <p
                    className="text-2xl font-extrabold tracking-tight mb-1"
                    style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}
                >
                    {value}
                </p>
                <p className="text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
                    {subtext}
                </p>
            </div>
        );

        if (link) {
            return <Link href={link} className="block">{cardContent}</Link>;
        }
        return cardContent;
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-64 p-6 lg:p-8 max-w-7xl">
                {/* Top Welcome Header */}
                <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                                Admin Console
                            </span>
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>•</span>
                            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        <h1
                            className="text-2xl font-bold tracking-tight mb-0.5"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                        >
                            Dashboard
                        </h1>
                        <p className="text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
                            Store overview, sales metrics, and active orders.
                        </p>
                    </div>

                    {/* Quick Header Actions */}
                    <div className="flex items-center gap-2.5">
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs text-white transition-all active:scale-95 shadow-xs"
                            style={{
                                backgroundColor: "var(--primary)",
                            }}
                        >
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Product</span>
                        </Link>
                        <Link
                            href="/admin/orders"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs border transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                            style={{
                                borderColor: "var(--border)",
                                backgroundColor: "var(--bg-secondary)",
                                color: "var(--text)"
                            }}
                        >
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>Orders Queue</span>
                        </Link>
                    </div>
                </header>

                {loading ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-32 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }}></div>
                            ))}
                        </div>
                        <div className="h-72 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }}></div>
                    </div>
                ) : (
                    <>
                        {/* Bento Grid Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {/* Revenue Stat Card */}
                            <StatCard
                                title="Total Revenue"
                                value={`₦${stats.totalSales.toLocaleString()}`}
                                subtext={`${stats.completedOrders} completed sales`}
                                icon={
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                color="var(--primary)"
                                badge="Sales"
                                badgeColor="#10B981"
                                link="/admin/orders"
                            />

                            {/* Active Orders Stat Card */}
                            <StatCard
                                title="Pending Orders"
                                value={stats.activeOrders}
                                subtext={stats.activeOrders > 0 ? "Requires fulfillment" : "All orders fulfilled"}
                                icon={
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                }
                                color="#D97706"
                                badge={stats.activeOrders > 0 ? "Action" : "Clear"}
                                badgeColor="#D97706"
                                link="/admin/orders"
                            />

                            {/* Catalog Inventory Stat Card */}
                            <StatCard
                                title="Live Catalog"
                                value={`${stats.totalProducts} Units`}
                                subtext="Available inventory in store"
                                icon={
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                }
                                color="#6366F1"
                                badge="Stock"
                                badgeColor="#6366F1"
                                link="/admin/products"
                            />
                        </div>

                        {/* Recent Orders Section */}
                        <div
                            className="rounded-2xl border shadow-xs overflow-hidden"
                            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                        >
                            <div className="px-6 py-4 border-b flex flex-col sm:flex-row justify-between sm:items-center gap-2" style={{ borderColor: "var(--border)" }}>
                                <div>
                                    <h2 className="font-bold text-sm tracking-tight" style={{ color: "var(--text)" }}>
                                        Recent Purchases
                                    </h2>
                                    <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                                        Latest customer orders from the storefront
                                    </p>
                                </div>
                                <Link
                                    href="/admin/orders"
                                    className="text-xs font-semibold hover:underline"
                                    style={{ color: "var(--primary)" }}
                                >
                                    View All Orders →
                                </Link>
                            </div>

                            {recentOrders.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div
                                        className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                                    >
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-bold mb-0.5" style={{ color: "var(--text)" }}>
                                        No recent orders
                                    </h3>
                                    <p className="text-xs max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
                                        Customer orders will appear here automatically when items are purchased.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr
                                                className="text-[10px] font-bold uppercase tracking-widest border-b"
                                                style={{
                                                    color: "var(--text-muted)",
                                                    borderColor: "var(--border)",
                                                    backgroundColor: "rgba(0,0,0,0.01)"
                                                }}
                                            >
                                                <th className="px-8 py-3.5">Customer</th>
                                                <th className="px-6 py-3.5">Items</th>
                                                <th className="px-6 py-3.5">Status</th>
                                                <th className="px-6 py-3.5">Total Amount</th>
                                                <th className="px-8 py-3.5 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                                            {recentOrders.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                                                >
                                                    {/* Customer Column */}
                                                    <td className="px-8 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0"
                                                                style={{
                                                                    background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
                                                                }}
                                                            >
                                                                {getInitials(order.customerName)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-bold text-sm truncate" style={{ color: "var(--text)" }}>
                                                                    {order.customerName}
                                                                </p>
                                                                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                                                                    {order.customerPhone}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Items Column */}
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-medium truncate block max-w-xs" style={{ color: "var(--text-secondary)" }}>
                                                            {order.items && order.items.length > 0
                                                                ? order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')
                                                                : 'Standard Order'}
                                                        </span>
                                                    </td>

                                                    {/* Status Column */}
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm"
                                                            style={{
                                                                backgroundColor:
                                                                    order.status === 'COMPLETED'
                                                                        ? 'rgba(34, 197, 94, 0.12)'
                                                                        : order.status === 'CANCELLED'
                                                                        ? 'rgba(239, 68, 68, 0.12)'
                                                                        : 'rgba(234, 179, 8, 0.12)',
                                                                color:
                                                                    order.status === 'COMPLETED'
                                                                        ? '#16A34A'
                                                                        : order.status === 'CANCELLED'
                                                                        ? '#EF4444'
                                                                        : '#D97706',
                                                                borderColor:
                                                                    order.status === 'COMPLETED'
                                                                        ? 'rgba(34, 197, 94, 0.25)'
                                                                        : order.status === 'CANCELLED'
                                                                        ? 'rgba(239, 68, 68, 0.25)'
                                                                        : 'rgba(234, 179, 8, 0.25)'
                                                                    }}
                                                        >
                                                            <span
                                                                className="w-1.5 h-1.5 rounded-full"
                                                                style={{
                                                                    backgroundColor:
                                                                        order.status === 'COMPLETED'
                                                                            ? '#16A34A'
                                                                            : order.status === 'CANCELLED'
                                                                            ? '#EF4444'
                                                                            : '#D97706'
                                                                }}
                                                            />
                                                            <span>{order.status}</span>
                                                        </span>
                                                    </td>

                                                    {/* Total Amount Column */}
                                                    <td className="px-6 py-4">
                                                        <span className="font-extrabold text-sm tracking-tight" style={{ color: "var(--text)" }}>
                                                            ₦{order.totalAmount.toLocaleString()}
                                                        </span>
                                                    </td>

                                                    {/* Date Column */}
                                                    <td className="px-8 py-4 text-right">
                                                        <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
                    </>
                )}
            </main>
        </div>
    );
}

