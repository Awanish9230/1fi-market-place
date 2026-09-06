# 1Fi Marketplace — React Native & Expo Implementation

A mobile marketplace application built for **1Fi** showcasing asset-backed (Mutual Fund) financing for flagship electronics with **0% No Cost EMI** plans, dynamic variant selection, real-time recalculation, and a 1Fi-themed design system.

---

## Implementation Notes

> **Note on Existing Codebase:**
> The existing 1Fi source code and backend APIs were not provided with the assignment. Therefore, this submission implements the Marketplace feature as a standalone **React Native + Expo** application using TypeScript, Expo Router, TanStack Query, and Axios.
>
> The official 1Fi application design language (light/white backgrounds, signature `#7137D9` purple brand accents, rounded cards and containers, pill-shaped tabs, skeleton loaders, and asset-backed credit limit flows) was used as the UI/UX reference.
>
> Product and EMI information is provided through an isolated mock REST API (`json-server`) with embedded fallback data to avoid hardcoding application data inside UI components. The API layer is cleanly separated so that it can be connected to the actual 1Fi backend with zero UI refactoring.

---

## 🏗 Architecture & Data Flow

```
                      1Fi Marketplace
                             │
                             ▼
                     ┌───────────────┐
                     │  UI Screens   │
                     │  Shop / Detail│
                     └───────┬───────┘
                             │
                             ▼
                     ┌───────────────┐
                     │ TanStack Query│
                     │ useProducts() │
                     └───────┬───────┘
                             │
                             ▼
                     ┌───────────────┐
                     │Product Service│
                     │productService │
                     └───────┬───────┘
                             │
                             ▼
                     ┌───────────────┐
                     │  Axios Client │
                     │   (api.ts)    │
                     └───────┬───────┘
                             │
                             ▼
                     ┌───────────────┐
                     │ Mock REST API │
                     │ (JSON Server) │
                     └───────────────┘
```

### Separation of Concerns
- **UI Screen (`app/` & `src/components/`)**: Purely handles presentation, user interaction, and layout.
- **State & Caching Layer (`src/hooks/`)**: Managed with TanStack Query (`useProducts`, `useProduct`), providing automatic cache invalidation, loading skeletons, error recovery, and background refetching.
- **Service Layer (`src/services/productService.ts`)**: Encapsulates all data retrieval logic.
- **Network Layer (`src/services/api.ts`)**: Centralized Axios client instance with standard base configuration, interceptors, and timeout handling.
- **Mock Database (`mock-api/db.json`)**: Curated catalog of flagship electronics with multi-tier storage/color variants, specs, and structured EMI plans (3m, 6m, 9m, 12m).

---

## ✨ Features Implemented

### 1. Shop Hub Screen
- **Shop Header**: Displays greeting, active location pill (e.g., *Indiranagar, Bengaluru*), and notification badge.
- **Location Selector**: Simulated bottom sheet for switching delivery locations with active checkmark indicators.
- **Promotional Area**: Gradient rounded card highlighting *0% No Cost EMI* on mutual fund portfolio limits.
- **3-Segment Tab Switcher**:
  - `Top Brands`: Verified merchant partners (Apple, Samsung, Sony, Dell, OnePlus, JBL).
  - `Nearby Stores`: Nearby electronic stores with rating badges, distance, and skeleton loading.
  - `1Fi Marketplace`: Main marketplace experience.

### 2. 1Fi Marketplace Listing
- **Search Bar**: Live search with clear action and active purple border styling.
- **Category Filter Pills**: Interactive pills for *All*, *Mobiles*, *Laptops*, *Audio*, *TV*, and *Wearables*.
- **2-Column Responsive Product Grid**:
  - High-resolution product images with discount percentage badges.
  - Brand name, product title, and structured pricing (discounted vs original strikethrough).
  - Signature purple EMI badge: *"From ₹4,999/mo"*.
- **States Handled**:
  - Animated skeleton placeholders matching the 1Fi video.
  - Error state with **Retry** trigger.
  - Clean empty state with **Clear Filters** CTA.

### 3. Product Details & EMI Selection (`/marketplace/[productId]`)
- **Product Overview**: Brand, title, rating, review count, category badge, and savings summary.
- **Interactive Variant Selector**: Switch between storage and color configurations with instant dynamic price and EMI recalculation.
- **EMI Plan Selector**:
  - Selectable tenure cards (3, 6, 9, 12 Months).
  - "No Cost EMI", "Most Popular", and "Lowest Monthly" badges.
  - Radio button active-state indicators with purple border highlight.
  - Breakdown of interest rate (0% vs 15% p.a.) and total repayment amount.
- **Product Highlights & Tech Specs**: Bulleted feature highlights and structured specs table.
- **Sticky Bottom Action Bar**:
  - Live summary of selected EMI (e.g., `₹4,999 / mo for 12 mos`).
  - **Proceed with EMI** button enabled only when variant and EMI plan are selected.

### 4. EMI Confirmation Screen (`/confirmation`)
- Success confirmation banner celebrating pre-approved loan status.
- Product preview with chosen variant.
- Itemized breakdown of tenure, monthly installment, product cost, interest rate, processing fee waiver, and total repayment.
- Security badge confirming active mutual fund units stay invested and continue generating returns.

### 5. Full 5-Tab Bottom Navigation
- **Home**: Financial overview, active portfolio limit card (₹2,50,000), and active EMI summary.
- **Shop**: Core Shop hub with 3 segments.
- **EMI Dues**: Upcoming auto-debit schedule and repayment progress bar.
- **Limit**: Asset-backed credit limit breakdown and pledged mutual fund folios (CAMS/KFintech linked).
- **Profile**: KYC verification status, linked bank accounts, loan agreements, and help center.

---

## 🎨 Design System

Defined in `src/constants/`:
- **Colors (`colors.ts`)**:
  - `primary`: `#7137D9` (Signature 1Fi Purple)
  - `primaryDark`: `#5625B8`
  - `primarySoft`: `#F5F3FF`
  - `background`: `#F8F9FD`
  - `cardBackground`: `#FFFFFF`
- **Spacing & Radius (`spacing.ts`)**:
  - Rounded cards: `16px` to `24px`
  - Pill badges & buttons: `borderRadius: 999`
  - Subtle drop shadows with purple tint: `shadowColor: '#7137D9'`
- **Typography (`typography.ts`)**:
  - Clean hierarchy with bold titles and high legibility weights.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Mock REST API (Optional)
```bash
npm run mock-api
```
*(Note: If the mock server is not running, the application automatically falls back to its embedded dataset with simulated network latency, ensuring the app works instantly without extra setup).*

### 3. Start Expo Development Server
```bash
# Start for mobile (Expo Go) and web
npm start

# Or directly open in browser:
npm run web
```
Scan the QR code with the Expo Go app on iOS/Android, or press `w` to open in your web browser.

---

## 📁 Project Structure

```
1fi-marketplace/
├── app/
│   ├── _layout.tsx                 # Root layout with TanStack Query & Theme
│   ├── (tabs)/
│   │   ├── _layout.tsx             # 5-Tab Bar (Home, Shop, EMI Dues, Limit, Profile)
│   │   ├── index.tsx               # Home tab (Portfolio Limit & Overview)
│   │   ├── shop.tsx                # Shop Hub (Top Brands | Nearby Stores | 1Fi Marketplace)
│   │   ├── emi-dues.tsx            # EMI Dues tab
│   │   ├── limit.tsx               # Limit & Pledged Funds tab
│   │   └── profile.tsx             # Profile & Settings tab
│   ├── marketplace/
│   │   ├── index.tsx               # Full Marketplace catalog & filter explorer
│   │   └── [productId].tsx         # Product Detail & EMI selector screen
│   └── confirmation.tsx            # EMI Plan confirmation screen
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx          # 1Fi rounded action buttons
│   │   │   ├── SearchBar.tsx       # Search bar with clear & focus states
│   │   │   ├── Screen.tsx          # Safe-area wrapped layout container
│   │   │   ├── EmptyState.tsx      # Empty search state
│   │   │   ├── ErrorState.tsx      # Error view with Retry button
│   │   │   ├── SkeletonLoader.tsx  # Animated skeleton cards
│   │   │   └── Header.tsx          # Navigation header
│   │   ├── marketplace/
│   │   │   ├── ProductCard.tsx     # Card with image, price, EMI badge
│   │   │   ├── ProductGrid.tsx     # 2-column responsive product layout
│   │   │   ├── CategoryPills.tsx   # Category filter pills
│   │   │   ├── VariantSelector.tsx # Interactive variant pills (RAM/Storage/Color)
│   │   │   ├── EmiPlanCard.tsx     # Interactive selectable EMI tenure card
│   │   │   ├── EmiPlanList.tsx     # List of EMI plans
│   │   │   └── ProductInfo.tsx     # Spec badges and highlights
│   │   └── shop/
│   │       ├── ShopTabs.tsx        # 3-segment switcher
│   │       ├── ShopHeader.tsx      # Greeting & location badge
│   │       ├── PromoBanner.tsx     # Large rounded gradient promo banner
│   │       ├── TopBrandsView.tsx   # Top Brands preview
│   │       └── NearbyStoresView.tsx# Nearby stores with simulated location sheet
│   ├── services/
│   │   ├── api.ts                  # Axios client configuration
│   │   └── productService.ts       # getProducts(), getProductById()
│   ├── hooks/
│   │   ├── useProducts.ts          # TanStack Query hook for products list
│   │   └── useProduct.ts           # TanStack Query hook for single product
│   ├── types/
│   │   └── product.ts              # TypeScript interfaces
│   ├── constants/
│   │   ├── colors.ts               # 1Fi brand colors
│   │   ├── spacing.ts              # Spacing, radius & shadow tokens
│   │   └── typography.ts           # Typography tokens
│   └── utils/
│       ├── currency.ts             # Currency formatting (e.g., ₹59,999)
│       └── emi.ts                  # Dynamic EMI tenure calculations
│
├── mock-api/
│   └── db.json                     # Curated electronics product dataset
├── package.json
├── tsconfig.json
├── app.json
└── README.md
```
