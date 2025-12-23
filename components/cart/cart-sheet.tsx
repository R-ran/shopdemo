'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X, Truck, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalSavings } = useCart();
  const [timeLeft, setTimeLeft] = useState(180); // 3分钟倒计时
  const router = useRouter();
  const [shippingProtection, setShippingProtection] = useState(false);
  const shippingProtectionPrice = 3.99;

  useEffect(() => {
    if (!open) return;
    
    setTimeLeft(180);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const subtotal = getTotalPrice();
  const savings = getTotalSavings();
  const shippingProtectionFee = shippingProtection ? shippingProtectionPrice : 0;
  const total = subtotal + shippingProtectionFee;
  const freeShippingThreshold = 43.99;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Cart • {items.length} items</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your cart is empty</h2>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-md"
              asChild
            >
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <SheetTitle className="text-xl">Cart • {items.length} {items.length === 1 ? 'item' : 'items'}</SheetTitle>
            </div>
            {/* Cart Reservation Timer */}
            <div className="bg-black text-white text-sm px-3 py-1.5 rounded flex items-center justify-center">
              Cart reserved for {formatTime(timeLeft)}
            </div>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-900">
                OVER ${freeShippingThreshold.toFixed(2)} FREE SHIPPING
              </span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <Truck className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" style={{ left: `${Math.min(progress, 95)}%` }} />
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    {item.selectedStyle && (
                      <p className="text-xs text-gray-500 mb-1">
                        Style: {item.selectedStyle}
                      </p>
                    )}
                    {item.selectedLength && (
                      <p className="text-xs text-gray-500 mb-1">
                        Length: {item.selectedLength}
                      </p>
                    )}
                    {item.selectedBuyMoreSaveMore && (
                      <p className="text-xs text-gray-500 mb-1">
                        {item.selectedBuyMoreSaveMore}
                      </p>
                    )}
                    {item.selectedColor && (
                      <p className="text-xs text-gray-500 mb-1">
                        Color: {item.selectedColor}
                      </p>
                    )}
                    {item.selectedSize && (
                      <p className="text-xs text-gray-500 mb-1">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    {item.selectedPackage && (
                      <p className="text-xs text-gray-500 mb-1">
                        Package: {item.selectedPackage}
                      </p>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-gray-600"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="text-right mt-auto">
                      {item.comparePrice && item.comparePrice > item.price && (
                        <p className="text-xs text-gray-500 line-through">
                          ${(item.comparePrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-blue-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.comparePrice && item.comparePrice > item.price && (
                        <p className="text-xs text-blue-600">
                          (You save ${((item.comparePrice - item.price) * item.quantity).toFixed(2)})
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Protection */}
          <div className="px-6 py-4 border-t border-b bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    Shipping Protection
                  </h4>
                  <p className="text-xs text-gray-600">
                    Protect your shipment from damage, loss, or theft.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">$3.99</span>
                <button
                  onClick={() => setShippingProtection(!shippingProtection)}
                  className={`w-10 h-6 rounded-full relative transition-colors ${
                    shippingProtection ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      shippingProtection ? 'translate-x-5' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-6 py-4 border-b bg-white">
            <div className="space-y-2">
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Savings</span>
                  <span className="text-blue-600 font-semibold">
                    -${savings.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {shippingProtection && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Protection</span>
                  <span className="text-gray-900 font-semibold">
                    ${shippingProtectionPrice.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base pt-2 border-t">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-gray-900 font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="px-6 py-4 bg-white space-y-3">
            <Button
              onClick={() => {
                router.push('/checkout?payment=paypal');
                onOpenChange(false);
              }}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-6 flex items-center justify-center gap-2"
            >
              <span>Pay with PayPal</span>
            </Button>
            <Button
              onClick={() => {
                router.push('/checkout?payment=card');
                onOpenChange(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6"
            >
              Pay with Visa
            </Button>

            {/* Payment Icons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {/* Visa */}
              <div className="bg-white rounded px-3 py-2 flex items-center justify-center">
                <img 
                  src="/visa.png" 
                  alt="VISA" 
                  className="h-4 w-auto"
                />
              </div>
              {/* Google Pay */}
              <div className="bg-white rounded px-3 py-2 flex items-center justify-center">
                <img 
                  src="/Googlepay.png" 
                  alt="Google Pay" 
                  className="h-4 w-auto"
                />
              </div>
              {/* Apple Pay */}
              <div className="bg-white rounded px-3 py-2 flex items-center justify-center">
                <img 
                  src="/apple.png" 
                  alt="Apple Pay" 
                  className="h-4 w-auto"
                />
              </div>
              {/* PayPal */}
              <div className="bg-white rounded px-3 py-2 flex items-center justify-center">
                <img 
                  src="/paypal.png" 
                  alt="PayPal" 
                  className="h-4 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

