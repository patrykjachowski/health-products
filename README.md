# Health Labs Cart

A modern e-commerce shopping cart application built with Nuxt 3, designed for health and laboratory products. The application integrates with multiple data sources (CMS and Magento) to provide a seamless shopping experience.

## 🚀 Features

- **Product Catalog**: Browse health and laboratory products with real-time stock status
- **Shopping Cart**: Add/remove products with persistent cart state using Pinia
- **Multi-source Integration**: Combines data from CMS (Prismic) and Magento e-commerce platform
- **Smart Product Variants**: Automatically selects the best product variant (DM vs regular) based on stock availability
- **Responsive Design**: Built with Tailwind CSS for optimal mobile and desktop experience
- **TypeScript**: Full type safety throughout the application
- **Testing**: Unit tests with Vitest for core business logic

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) with Vue 3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Icons**: [Nuxt Icon](https://icon-sets.iconify.design/)
- **Image Optimization**: [Nuxt Image](https://image.nuxt.com/)
- **Linting**: ESLint with Nuxt ESLint config

## 📁 Project Structure

```
health-labs-cart/
├── components/           # Vue components
│   ├── NavBar.vue
│   ├── ProductImage.vue
│   ├── ProductListActionButton.vue
│   ├── ProductListItem.vue
│   ├── ProductsHeader.vue
│   └── ProductsList.vue
├── pages/               # Application pages
│   ├── index.vue        # Product catalog
│   └── cart.vue         # Shopping cart
├── server/              # Server-side API
│   ├── api/             # API endpoints
│   │   ├── cart/        # Cart operations
│   │   ├── cms/         # CMS integration
│   │   ├── magento/     # Magento integration
│   │   └── product/     # Product aggregation
│   └── services/        # Business logic services
├── stores/              # Pinia stores
│   └── cart.ts          # Cart state management
├── types/               # TypeScript type definitions
│   └── product.ts       # Product-related types
├── utils/               # Utility functions
│   └── use-format-currency.ts
└── tests/               # Test files
    └── unit/
        └── product.service.test.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd health-labs-cart
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm test` - Run unit tests
- `pnpm generate` - Generate static site

## 🏗️ Architecture

### Data Flow

1. **Product Service** fetches data from two sources:

   - CMS (Prismic) for product metadata and images
   - Magento for pricing, stock status, and product details

2. **Product Aggregation** merges data from both sources, prioritizing:

   - DM variants over regular variants when both are in stock
   - In-stock products over out-of-stock ones

3. **Caching** stores merged product data for improved performance

### State Management

The application uses Pinia for state management with a dedicated cart store that handles:

- Adding/removing products
- Cart persistence
- Total calculations
- Stock status tracking

## 🧪 Testing

Run the test suite:

```bash
pnpm test
```

The project includes comprehensive unit tests for the `ProductService` class, covering:

- Product variant selection logic
- Data merging from multiple sources
- Edge cases and error handling

## 🎨 Styling

The application uses Tailwind CSS with a custom configuration. Key styling features:

- Responsive design with mobile-first approach
- Consistent spacing and typography
- Custom color scheme for health/lab theme
- Component-based styling architecture

## 🔧 Configuration

### Environment Variables

The application expects the following integrations:

- **Prismic CMS**: For product content and images
- **Magento**: For e-commerce data (pricing, inventory)

### Nuxt Configuration

Key Nuxt modules and features enabled:

- ESLint for code quality
- Tailwind CSS for styling
- Pinia for state management
- Nuxt Image for optimized images
- Nuxt Icon for icon management

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Static Generation

```bash
pnpm generate
```

The application can be deployed to any static hosting service or serverless platform that supports Node.js.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
