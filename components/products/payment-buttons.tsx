'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';

interface PaymentButtonsProps {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  selectedStyle?: string;
  selectedLength?: string;
  selectedBuyMoreSaveMore?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedPackage?: string;
  image: string;
  comparePrice?: number;
}

export function PaymentButtons({
  productId,
  productName,
  price,
  quantity,
  selectedStyle,
  selectedLength,
  selectedBuyMoreSaveMore,
  selectedColor,
  selectedSize,
  selectedPackage,
  image,
  comparePrice,
}: PaymentButtonsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCartAndCheckout = () => {
    addItem({
      productId,
      name: productName,
      image,
      price,
      comparePrice,
      quantity,
      selectedStyle,
      selectedLength,
      selectedBuyMoreSaveMore,
      selectedColor,
      selectedSize,
      selectedPackage,
    });
    router.push('/checkout');
  };

  const handlePayPalCheckout = () => {
    addItem({
      productId,
      name: productName,
      image,
      price,
      comparePrice,
      quantity,
      selectedStyle,
      selectedLength,
      selectedBuyMoreSaveMore,
      selectedColor,
      selectedSize,
      selectedPackage,
    });
    router.push('/checkout?payment=paypal');
  };

  const handleCardCheckout = () => {
    addItem({
      productId,
      name: productName,
      image,
      price,
      comparePrice,
      quantity,
      selectedStyle,
      selectedLength,
      selectedBuyMoreSaveMore,
      selectedColor,
      selectedSize,
      selectedPackage,
    });
    router.push('/checkout?payment=card');
  };

  return (
    <div className="space-y-3 mt-4">
      <Button
        onClick={handlePayPalCheckout}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-6 flex items-center justify-center gap-2"
      >
        <span>Pay with</span>
        <div className="flex items-center gap-1">
          <span className="text-[#003087] font-bold">Pay</span>
          <span className="text-[#009CDE] font-bold">Pal</span>
        </div>
      </Button>
      <Button
        onClick={handleCardCheckout}
        variant="outline"
        className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold uppercase py-6"
      >
        PAY WITH VISA
      </Button>
    </div>
  );
}

