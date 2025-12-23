import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductSort } from '@/components/products/product-sort';
import { MobileFilters } from '@/components/products/mobile-filters';
import { mockProducts } from '@/lib/mock-data';
import { EmailSubscribe } from '@/components/email-subscribe';

interface ProductsPageProps {
  searchParams: {
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    outOfStock?: string;
  };
}

function sortProducts(products: typeof mockProducts, sortBy?: string) {
  const sorted = [...products];

  switch (sortBy) {
    case 'bestselling':
      return sorted.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    case 'title-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'title-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
  }
}

function filterProducts(
  products: typeof mockProducts,
  minPrice?: string,
  maxPrice?: string,
  inStock?: string,
  outOfStock?: string
) {
  let filtered = [...products];

  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }

  if (inStock === 'true' && outOfStock !== 'true') {
    filtered = filtered.filter((p) => p.stock > 0);
  }

  if (outOfStock === 'true' && inStock !== 'true') {
    filtered = filtered.filter((p) => p.stock === 0);
  }

  return filtered;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  let products = [...mockProducts];

  products = filterProducts(
    products,
    searchParams.minPrice,
    searchParams.maxPrice,
    searchParams.inStock,
    searchParams.outOfStock
  );

  products = sortProducts(products, searchParams.sort);

  const maxPrice = Math.max(...mockProducts.map((p) => p.price));

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters maxPrice={maxPrice} />
          </aside>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-sm text-gray-600">
                Showing {products.length} {products.length === 1 ? 'result' : 'results'}
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* 移动端筛选按钮 */}
                <MobileFilters maxPrice={maxPrice} />
                <ProductSort />
              </div>
            </div>

            <ProductGrid products={products} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6 pb-12 md:pb-18 mb-12 md:mb-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-4">Subscribe to our emails</h3>
          <p className="text-sm text-gray-700 text-center max-w-xl mx-auto mb-4">
            Join our email list for exclusive offers and the latest news.
          </p>

          <EmailSubscribe
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            inputClassName="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50"
            buttonClassName="w-full sm:w-auto bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}