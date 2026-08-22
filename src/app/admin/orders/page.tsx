"use client";

import { useState, useEffect, useMemo } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Order } from "@/types";

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [updatingId, setUpdatingId] = useState<number | null>(null);

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

    // Filtered orders based on status tab and search term
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                !searchTerm ||
                order.customerName?.toLowerCase().includes(searchLower) ||
                order.customerPhone?.toLowerCase().includes(searchLower) ||
                order.customerAddress?.toLowerCase().includes(searchLower) ||
                order.items?.some(i => i.name.toLowerCase().includes(searchLower));

            return matchesStatus && matchesSearch;
        });
    }, [orders, statusFilter, searchTerm]);

    // Counts for tabs and metrics
    const counts = useMemo(() => {
        const pending = orders.filter(o => o.status === 'PENDING').length;
        const completed = orders.filter(o => o.status === 'COMPLETED').length;
        const cancelled = orders.filter(o => o.status === 'CANCELLED').length;
        const totalSales = orders
            .filter(o => o.status === 'COMPLETED')
            .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        return {
            all: orders.length,
            pending,
            completed,
            cancelled,
            totalSales,
        };
    }, [orders]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return '#16A34A';
            case 'CANCELLED': return '#EF4444';
            default: return '#D97706';
        }
    };

    const getInitials = (name: string) => {
        if (!name) return "TG";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
            <AdminSidebar />

            <main className="flex-1 ml-64 p-6 lg:p-8 max-w-7xl">
                {/* Header */}
                <header className="mb-6 pb-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ borderColor: "var(--border)" }}>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--primary)" }}>
                                Fulfillment & Dispatch
                            </span>
                        </div>
                        <h1
                            className="text-2xl font-bold tracking-tight mb-0.5"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                        >
                            Order Management
                        </h1>
                        <p className="text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
                            Review, fulfill, and update live customer orders across all channels.
                        </p>
                    </div>

                    <button
                        onClick={fetchOrders}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs border transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                        style={{
                            borderColor: "var(--border)",
                            backgroundColor: "var(--bg-secondary)",
                            color: "var(--text)"
                        }}
                    >
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Refresh</span>
                    </button>
                </header>

                {/* Top Summary Metrics Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>Total Orders</p>
                        <p className="text-xl font-extrabold" style={{ color: "var(--text)" }}>{counts.all}</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 text-amber-500">Pending Action</p>
                        <p className="text-xl font-extrabold text-amber-500">{counts.pending}</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 text-emerald-500">Completed</p>
                        <p className="text-xl font-extrabold text-emerald-500">{counts.completed}</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--primary)" }}>Realized Volume</p>
                        <p className="text-xl font-extrabold" style={{ color: "var(--text)" }}>₦{counts.totalSales.toLocaleString()}</p>
                    </div>
                </div>

                {/* Filter Controls & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                    {/* Status Tabs */}
                    <div
                        className="p-1 rounded-xl border flex items-center gap-1 overflow-x-auto"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border)"
                        }}
                    >
                        {[
                            { id: "ALL", label: "All Orders", count: counts.all },
                            { id: "PENDING", label: "Pending", count: counts.pending },
                            { id: "COMPLETED", label: "Completed", count: counts.completed },
                            { id: "CANCELLED", label: "Cancelled", count: counts.cancelled },
                        ].map((tab) => {
                            const isSelected = statusFilter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatusFilter(tab.id)}
                                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                                        isSelected
                                            ? "text-white shadow-sm"
                                            : "opacity-70 hover:opacity-100"
                                    }`}
                                    style={{
                                        backgroundColor: isSelected ? "var(--primary)" : "transparent",
                                        color: isSelected ? "white" : "var(--text)",
                                    }}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                            isSelected ? "bg-white/20 text-white" : "bg-black/5 dark:bg-white/10"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Input */}
                    <div className="relative min-w-[260px]">
                        <input
                            type="text"
                            placeholder="Search by customer, phone, address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border outline-none transition-all"
                            style={{
                                backgroundColor: "var(--bg-secondary)",
                                borderColor: "var(--border)",
                                color: "var(--text)"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                        />
                        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Orders Table Container */}
                <div
                    className="rounded-3xl border shadow-sm overflow-hidden"
                    style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
                >
                    {loading ? (
                        <div className="p-20 text-center animate-pulse" style={{ color: "var(--text-muted)" }}>
                            <div className="w-8 h-8 mx-auto mb-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm font-medium">Loading orders data...</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="p-16 text-center">
                            <div
                                className="w-14 h-14 mx-auto mb-3.5 rounded-2xl flex items-center justify-center"
                                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-base font-bold mb-1" style={{ color: "var(--text)" }}>No matching orders found</h3>
                            <p className="text-xs max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
                                {searchTerm ? "Try searching for a different name, phone number, or item." : "Orders will appear here once customers complete checkout."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse" style={{ minWidth: "850px" }}>
                                <thead>
                                    <tr
                                        className="text-[10px] font-bold uppercase tracking-widest border-b"
                                        style={{
                                            color: "var(--text-muted)",
                                            borderColor: "var(--border)",
                                            backgroundColor: "rgba(0,0,0,0.015)"
                                        }}
                                    >
                                        <th className="px-6 py-4">Customer Details</th>
                                        <th className="px-6 py-4">Ordered Items</th>
                                        <th className="px-6 py-4">Total Amount</th>
                                        <th className="px-6 py-4">Order Status</th>
                                        <th className="px-6 py-4 text-right">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="divide-y"
                                    style={{ borderColor: "var(--border)" }}
                                >
                                    {filteredOrders.map((order: Order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                                        >
                                            {/* Customer Details */}
                                            <td className="px-6 py-4" style={{ minWidth: "220px", maxWidth: "260px" }}>
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 mt-0.5"
                                                        style={{
                                                            background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
                                                        }}
                                                    >
                                                        {getInitials(order.customerName)}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-bold text-sm truncate" style={{ color: "var(--text)" }}>
                                                            {order.customerName}
                                                        </p>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <a
                                                                href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-xs font-semibold hover:underline inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
                                                                title="Contact on WhatsApp"
                                                            >
                                                                <span>{order.customerPhone}</span>
                                                                <svg width="10" height="10" style={{ width: "10px", height: "10px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                        {order.customerAddress && (
                                                            <p className="text-[11px] mt-1 line-clamp-2 leading-tight flex items-start gap-1" style={{ color: "var(--text-muted)" }}>
                                                                <svg width="11" height="11" style={{ width: "11px", height: "11px", minWidth: "11px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                                <span>{order.customerAddress}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Ordered Items Preview */}
                                            <td className="px-6 py-4" style={{ minWidth: "220px", maxWidth: "300px" }}>
                                                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                                                    {order.items?.slice(0, 3).map((item, idx) => (
                                                        <div
                                                             key={idx}
                                                             title={`${item.name} ×${item.quantity}`}
                                                             className="flex-shrink-0 rounded-lg border overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm"
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
                                                                 <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                                                                     <svg width="14" height="14" style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                     </svg>
                                                                 </div>
                                                             )}
                                                         </div>
                                                     ))}
                                                     {order.items && order.items.length > 3 && (
                                                         <div
                                                             className="flex-shrink-0 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                                                             style={{ width: "36px", height: "36px", backgroundColor: "var(--primary)" }}
                                                         >
                                                             +{order.items.length - 3}
                                                         </div>
                                                     )}
                                                 </div>
                                                 <p className="text-xs leading-snug font-medium" style={{ color: "var(--text-secondary)" }}>
                                                     {order.items?.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                                                 </p>
                                             </td>

                                             {/* Total Amount */}
                                             <td className="px-6 py-4 whitespace-nowrap" style={{ minWidth: "120px" }}>
                                                 <span className="font-extrabold text-sm tracking-tight" style={{ color: "var(--text)" }}>
                                                     ₦{order.totalAmount.toLocaleString()}
                                                 </span>
                                             </td>

                                             {/* Status Dropdown */}
                                             <td className="px-6 py-4 whitespace-nowrap" style={{ minWidth: "140px" }}>
                                                 <div className="relative inline-flex items-center">
                                                     <select
                                                         disabled={updatingId === order.id}
                                                         className="appearance-none font-bold text-xs uppercase tracking-wider rounded-xl pl-3 pr-7 py-1.5 border cursor-pointer outline-none transition-all shadow-xs disabled:opacity-50"
                                                         style={{
                                                             color: getStatusColor(order.status),
                                                             borderColor: `${getStatusColor(order.status)}40`,
                                                             backgroundColor: `${getStatusColor(order.status)}15`,
                                                         }}
                                                         value={order.status}
                                                         onChange={async (e) => {
                                                             const newStatus = e.target.value as Order['status'];
                                                             setUpdatingId(order.id);
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
                                                             } finally {
                                                                 setUpdatingId(null);
                                                             }
                                                         }}
                                                     >
                                                         <option value="PENDING">Pending</option>
                                                         <option value="COMPLETED">Completed</option>
                                                         <option value="CANCELLED">Cancelled</option>
                                                     </select>
                                                     <div className="absolute right-2.5 flex items-center justify-center pointer-events-none opacity-60">
                                                         {updatingId === order.id ? (
                                                             <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                                                         ) : (
                                                             <svg width="10" height="10" style={{ width: "10px", height: "10px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                             </svg>
                                                         )}
                                                     </div>
                                                 </div>
                                             </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 text-right whitespace-nowrap" style={{ minWidth: "120px" }}>
                                                <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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

