# TimGift | Premium Gadgets Store

TimGift is a premium e-commerce platform for sourcing quality new and gently used electronics at wholesale prices. The application is built with modern web technologies to provide a sleek, Apple-inspired user experience.

![TimGift Home](/images/screenshots/home-preview.png)
*(Note: Add actual screenshots to `public/images/screenshots`)*

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Database:** SQLite (via Prisma ORM)
- **Styling:** Vanilla CSS (CSS Variables, Glassmorphism, Responsive Design)
- **State Management:** React Context API (Cart, Toast)

## ✨ Key Features

### 🛒 Customer Experience
- **Premium UI/UX:** A visually stunning interface with glassmorphism effects, smooth animations, and a clean, minimalist design.
- **Product Catalog:** Browse products by categories (Smartphones, Smartwatches, Computers, etc.).
- **Smart Cart System:** 
  - Persistent cart using Local Storage.
  - Real-time total calculation.
  - Quantity management.
- **WhatsApp Checkout:** Seamless order submission that redirects users to WhatsApp with a pre-formatted message containing their order details.
- **Invoice Generation:** Automatic invoice preview during checkout.

### 🛡️ Admin Dashboard
- **Product Management:** Create, read, update, and delete (CRUD) products.
- **Media Upload:** Support for uploading multiple product images and videos.
- **Inventory Control:** Manage stock availability (In Stock / Pre-Order) and pricing.
- **Real-time Updates:** Changes in the admin panel reflect immediately on the storefront.

### ⚙️ Technical Highlights
- **Toast Notifications:** Custom-built, animated toast notification system for user feedback.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
- **API Routes:** Robust backend logic handled via Next.js API Routes.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/timgift.git
   cd timgift
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   Initialize the Prisma database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
timgift/
├── prisma/               # Database schema and SQLite file
├── public/               # Static assets (images, icons)
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── api/          # Backend API endpoints
│   │   ├── checkout/     # Checkout flow
│   │   ├── product/      # Product details
│   │   └── page.tsx      # Homepage
│   ├── components/       # Reusable React components
│   │   ├── Toast.tsx     # Toast notification system
│   │   ├── CartProvider.tsx # Cart context logic
│   │   └── ...
│   └── types.ts          # TypeScript definitions
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary software. All rights reserved.
