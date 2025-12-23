'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  image_url: string;
  is_featured: boolean;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="/home.png"
                alt="Home"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transform Your Life: Explore Special Offers for an Enhanced You!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Embark on a journey through our curated collection of health, beauty, wellness, and
              innovative gadgets, designed to enhance every aspect of your life. Our online store
              offers an unparalleled shopping experience, with exclusive offers tailored to ignite
              your journey towards self-improvement. Let us transform your daily routine into an
              extraordinary adventure. Start shopping today and unleash the best version of yourself.
            </p>
            <div>
              <Link href="/products">
                <Button className="inline-flex items-center px-6 py-3">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
