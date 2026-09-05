# EventSphere — Modern Event Discovery & Ticket Management Platform

EventSphere is a premier full-stack web application designed for discovering, booking, and managing tickets for world-class conferences, music festivals, tech summits, and cultural gatherings. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

---

## Key Features

### 1. Event Discovery & Search
- **Live Search & Filter**: Real-time multi-criteria filtering by event name, category, venue, and organizer.
- **Dynamic Category Tags**: Quick navigation across Technology, Music, Business, Art, Food, and more.
- **Interactive Event Cards**: Rich preview cards with dates, times, venues, pricing badges, and hover animations.

### 2. Smart Ticket Checkout & Simulated Payment
- **Multi-Step Checkout**: Seamless 2-step registration & payment flow.
- **Live Input Auto-Formatters**:
  - **Phone Number**: Automatically formatted to `(XXX) XXX-XXXX`.
  - **Payment Card**: Formatted to `XXXX XXXX XXXX XXXX` with live card brand recognition (**Visa**, **Mastercard**, **Amex**).
  - **Expiry Date**: Auto-formatted to `MM/YY`.
  - **CVV / Security Code**: Masked 3–4 digit code with security encryption badge.
- **Smart Data Sync**: Attendee full name automatically syncs with the cardholder name field.
- **Transparent Pricing Breakdown**: Real-time subtotal and service fee calculations for free & paid tiers.

### 3. "My Tickets" Management Dashboard (`/my-tickets`)
- **Booking Reference Generator**: Assigns unique codes (e.g., `ESP-784920`) to confirmed bookings.
- **Persistent Storage**: Tickets are safely saved locally across browser sessions.
- **Digital Passes & QR Codes**: Scannable digital ticket pass with high-contrast QR display.
- **Print Pass**: Direct printer-friendly ticket export (`window.print()`).
- **Ticket Status & Cancellation**: Filter tickets by `All`, `Active`, or `Cancelled` with an instant cancellation flow.
- **Live Navigation Badge**: Shows active registered ticket counts directly in the navbar.

### 4. Complete Application Pages & Legal
- **About Us (`/about`)**: Company story, mission values, platform statistics, and interactive FAQ accordion.
- **Contact Us (`/contact`)**: Interactive inquiry submission form with company details and office hours.
- **Privacy Policy (`/privacy`)** & **Terms of Service (`/terms`)**: Clean, comprehensive legal guidelines.
- **SEO & Discoverability**: Native `sitemap.ts`, `robots.ts`, OpenGraph metadata, and Google Fonts.

---

## Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Glassmorphism & Custom Design Tokens
- **UI Components & Primitives**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Storage**: LocalStorage Persistence Layer (`lib/tickets-store.ts`)
- **Typography**: Google Fonts (`Inter` and `Playfair Display`)

---

## Getting Started

### Prerequisites
Make sure you have Node.js 18+ installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/EventManagementSystem.git
cd EventManagementSystem
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### 4. Build for production
```bash
npm run build
npm run start
```
