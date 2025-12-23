# EconomicalKShop - E-commerce Platform

A modern e-commerce frontend application built with Next.js and Tailwind CSS.

## Features

- Product catalog with filtering and search
- Product detail pages with related products
- Shopping cart UI
- Contact form
- Responsive design
- Fast and SEO-friendly
- **Pure frontend with mock data (no database required)**

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Data**: Static mock data (no backend required)
- **Deployment**: Vercel

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── products/          # Product pages
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── home/             # Home page components
│   ├── products/         # Product components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Navigation header
│   └── footer.tsx        # Footer
├── lib/                   # Utility functions
│   ├── mock-data.ts      # Mock product data
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── public/                # Static assets
```

## Mock Data

The application includes 12 sample products across 4 categories:
- Electronics
- Home & Living
- Fashion
- Sports & Outdoors

All products use high-quality stock photos from Pexels.

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment to Vercel

### Quick Deploy

The easiest way to deploy this Next.js app is with Vercel:

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and click "Add New Project"

3. Import your GitHub repository

4. Click "Deploy"

That's it! No environment variables needed since this is a pure frontend application.

### Manual Deploy

You can also use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Building for Production

To create a production build:

```bash
npm run build
```

To run the production server locally:

```bash
npm start
```

## Customization

### Adding New Products

Edit `/lib/mock-data.ts` to add or modify products:

```typescript
export const mockProducts: Product[] = [
  {
    id: 'unique-id',
    name: 'Product Name',
    slug: 'product-url-slug',
    description: 'Product description',
    price: 99.99,
    compare_at_price: 129.99, // Optional sale price
    image_url: 'https://...',
    category_id: 'category-id',
    stock: 50,
    is_featured: true,
    is_bestseller: true,
  },
  // ... more products
];
```

### Adding New Categories

Edit `/lib/mock-data.ts` to add categories:

```typescript
export const mockCategories: Category[] = [
  {
    id: 'unique-id',
    name: 'Category Name',
    slug: 'category-slug',
    description: 'Category description',
    image_url: 'https://...',
  },
  // ... more categories
];
```

### Styling

This project uses Tailwind CSS and shadcn/ui. Customize the theme in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles

## Features to Add (Future)

- Real shopping cart with localStorage
- Checkout flow
- User authentication
- Backend integration
- Payment processing
- Order management

## License

This project is licensed under the MIT License.
