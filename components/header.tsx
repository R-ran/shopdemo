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
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* 顶部横幅 - 移动端隐藏部分文字 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 md:gap-6 text-xs md:text-lg">
            <span className="hidden sm:inline">OVER $43.99 FREE SHIPPING</span>
            <span className="sm:hidden">FREE SHIPPING</span>
            <span>🌏</span>
            <span>100%🔒</span>
            <span className="hidden md:inline">90 DAY MONEY BACK GUARANTEE</span>
            <span className="md:hidden">90 DAY GUARANTEE</span>
            <span>👍</span>
          </div>
        </div>
      </div>

      {/* 主导航栏 */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 whitespace-nowrap">
            EconomicalKShop
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/best-selling" className="hover:text-blue-600 transition-colors font-medium">
              Best Sellings
            </Link>
            <Link href="/products" className="hover:text-blue-600 transition-colors font-medium">
              All Products
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors font-medium">
              Contact Us
            </Link>
          </nav>

          {/* 右侧操作按钮 */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* 购物车按钮 */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

            {/* 移动端菜单按钮 */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
                  <nav className="flex flex-col gap-4">
                    <Link 
                      href="/best-selling" 
                      className="text-lg font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
                      onClick={() => {
                        // 关闭菜单（Sheet会自动处理）
                      }}
                    >
                      Best Sellings
                    </Link>
                    <Link 
                      href="/products" 
                      className="text-lg font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
                    >
                      All Products
                    </Link>
                    <Link 
                      href="/contact" 
                      className="text-lg font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
                    >
                      Contact Us
                    </Link>
                    <Link 
                      href="/about" 
                      className="text-lg font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/faqs" 
                      className="text-lg font-medium hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
                    >
                      FAQs
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
