'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  image_url: string;
  stock: number;
  is_bestseller?: boolean;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  const calculateDiscount = (price: number, comparePrice: number) => {
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
        const discountPercent = hasDiscount
          ? calculateDiscount(product.price, product.compare_at_price!)
          : 0;

        return (
          <div key={product.id} className="group">
            <Link href={`/products/${product.slug}`}>
              <div className="relative aspect-square mb-4 bg-gray-100 overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {hasDiscount && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-3 py-1 text-xs font-bold">
                    SAVE {discountPercent}%
                  </Badge>
                )}

                {product.is_bestseller && (
                  <Badge className="absolute top-3 left-3 bg-yellow-500 text-gray-900 border-0 px-3 py-1 text-xs font-bold">
                    BEST SELLER
                  </Badge>
                )}
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-medium text-base text-gray-900 line-clamp-2 px-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  {hasDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.compare_at_price!.toFixed(2)}
                    </span>
                  )}
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>

            <div className="mt-3 px-2">
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Choose options'}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
