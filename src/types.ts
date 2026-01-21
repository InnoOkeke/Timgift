export type ProductStatus = 'IN_STOCK' | 'PRE_ORDER';

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    status: ProductStatus;
    media: { type: 'image' | 'video'; url: string }[];
    stockQuantity: number;
    featured?: boolean;
}

export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    media: { url: string }[];
}

export interface Order {
    id: number;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
}

