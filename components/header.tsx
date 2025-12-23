'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartSheet } from '@/components/cart/cart-sheet';
import { useCart } from '@/contexts/cart-context';

export function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-center items-center gap-6 text-lg">
          <span>OVER $43.99 FREE SHIPPING🌏100%🔒90 DAY MONEY BACK GUARANTEE👍</span>
      
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            EconomicalKShop
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/best-selling" className="hover:text-blue-600 transition-colors">
              Best Sellings
            </Link>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              All Products
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            

            

            <Button 
              size="icon" 
              variant="ghost" 
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

            <Sheet>
              <SheetTrigger asChild>
                
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/products?filter=bestsellers" className="text-lg hover:text-blue-600 transition-colors">
                    Best Sellings
                  </Link>
                  <Link href="/products" className="text-lg hover:text-blue-600 transition-colors">
                    All Products
                  </Link>
                  <Link href="/contact" className="text-lg hover:text-blue-600 transition-colors">
                    Contact Us
                  </Link>
                  
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
