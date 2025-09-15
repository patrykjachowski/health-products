# Health Labs Cart

A Nuxt 3 e-commerce application for health products with smart variant selection and dual product lists.

## 🚀 Features

- **Dual Product Lists**: Separate views for regular products (Lista A) and DM variants (Lista B)
- **Smart Cart Logic**: Automatically selects DM variants when available, falls back to regular products
- **Mock API Integration**: Simulated CMS and Magento endpoints with realistic delays
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety with comprehensive interfaces
- **Testing**: Unit tests for core business logic

## 🛠️ Tech Stack

- **Nuxt 3** + Vue 3 + TypeScript
- **Tailwind CSS** for styling
- **Pinia** for state management
- **Vitest** for testing
- **Nuxt Icon** + **Nuxt Image** for assets

## 📁 Key Files

```
├── pages/
│   ├── index.vue        # Product catalog with dual lists
│   └── cart.vue         # Shopping cart view
├── server/
│   ├── api/             # Mock API endpoints
│   └── services/        # ProductService with variant logic
├── stores/cart.ts       # Cart state management
├── components/          # Reusable UI components
└── types/product.ts     # TypeScript definitions
```

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🏗️ Business Logic

### Product Variants

- **DM variants** (suffix `_dm`) are prioritized over regular products
- **Stock-based selection**: DM variant → Regular variant → Out of stock
- **Transparent to users**: Cart operations handle variant selection automatically

### Product Lists

- **Lista A**: Regular products only (ignores DM variants)
- **Lista B**: DM variants only (when in stock)

### Cart Operations

- **Add to cart**: API determines best variant, updates store
- **Remove from cart**: Direct store manipulation
- **State persistence**: Cart maintained in Pinia store

## 🧪 Testing

Tests cover the `ProductService` variant selection logic with comprehensive edge cases.

## 🔧 Configuration

The app uses mock data that simulates:

- **CMS API** (`/api/cms/products`) - Product metadata and images
- **Magento API** (`/api/magento/products`) - Pricing and stock status
- **Cart APIs** (`/api/cart/*`) - Add/remove operations

All endpoints include 1-second delays to simulate real API calls.

## 📄 License

Private and proprietary.
