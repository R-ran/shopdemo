import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="block text-blue-600 mt-2">EconomicalKShop</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Discover quality products at unbeatable prices. Free shipping on all orders,
            100% satisfaction guaranteed, and a 90-day money-back policy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/best-selling">
                Best Sellings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          
          </div>
        </div>
      </div>
    </section>
  );
}
