'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/cart-context';
import { Minus, Plus, Star, Anchor } from 'lucide-react';
import { ProductImageGallery } from '../product-image-gallery';
import { PaymentButtons } from '../payment-buttons';

interface ProductTemplateProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    compare_at_price?: number | null;
    image_url: string;
    images: string[];
    stock: number;
  };
}

interface BuyOption {
  id: string;
  label: string;
  emoji?: string;
  price: number;
  comparePrice: number;
}

export function Product4Template({ product }: ProductTemplateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Orange');
  const [selectedBuyMoreSaveMore, setSelectedBuyMoreSaveMore] = useState('buy-2');
  const { toast } = useToast();
  const { addItem } = useCart();

  const colorOptions = [
    { value: 'Orange', label: 'Orange' },
    { value: 'Green', label: 'Green' },
    { value: '💧Family Bundle (Green+Orange)', label: '💧Family Bundle (Green+Orange)' },
  ];

  const getColorLabel = (value: string) => {
    return colorOptions.find(opt => opt.value === value)?.label || value;
  };

  const buyOptions: BuyOption[] = [
    {
      id: 'buy-1',
      label: 'BUY 1',
      price: 15.99,
      comparePrice: 30.15,
    },
    {
      id: 'buy-2',
      label: 'BUY 2 GET 1 FREE (3PCS)',
      price: 29.98,
      comparePrice: 118.85,
    },
    {
      id: 'buy-3',
      label: 'BUY 3 GET 2 FREE (5PCS)',
      price: 47.97,
      comparePrice: 186.75,
    },
  ];

  const selectedOption = buyOptions.find(opt => opt.id === selectedBuyMoreSaveMore) || buyOptions[1];
  const discountPercent = Math.round(((selectedOption.comparePrice - selectedOption.price) / selectedOption.comparePrice) * 100);

  const getBuyMoreSaveMoreLabel = (value: string) => {
    return buyOptions.find(opt => opt.id === value)?.label || '';
  };

  const handleAddToCart = () => {
    const allImages = [product.image_url, ...product.images].filter(Boolean);
    addItem({
      productId: product.id,
      name: product.name,
      image: allImages[0] || product.image_url,
      price: selectedOption.price,
      comparePrice: selectedOption.comparePrice,
      quantity,
      selectedColor: getColorLabel(selectedColor),
      selectedBuyMoreSaveMore: getBuyMoreSaveMoreLabel(selectedBuyMoreSaveMore),
    });
    toast({
      title: 'Added to cart!',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const allImages = [product.image_url, ...product.images].filter(Boolean);
  const reviewCount = 25;
  const rating = 4.6;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductImageGallery images={allImages} productName={product.name} />
          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {reviewCount.toLocaleString()}+ reviews
              </span>
            </div>

            {/* 价格显示 - 根据选择的购买选项动态更新 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl text-gray-500 line-through">
                ${selectedOption.comparePrice.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-gray-900">
                ${selectedOption.price.toFixed(2)}
              </span>
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm font-bold">
                SAVE {discountPercent}%
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              {/* Buy More Save More 选择器 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                Buy More Save More - {getBuyMoreSaveMoreLabel(selectedBuyMoreSaveMore)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {buyOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedBuyMoreSaveMore(option.id)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedBuyMoreSaveMore === option.id
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option.emoji && <span className="mr-1">{option.emoji}</span>}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Color - {getColorLabel(selectedColor)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedColor(option.value)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedColor === option.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            

            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-6 mb-4"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to cart'}
            </Button>

            {(() => {
              const allImages = [product.image_url, ...product.images].filter(Boolean);
              return (
                <PaymentButtons
                  productId={product.id}
                  productName={product.name}
                  price={selectedOption.price}
                  comparePrice={selectedOption.comparePrice}
                  quantity={quantity}
                  selectedColor={getColorLabel(selectedColor)}
                  selectedBuyMoreSaveMore={getBuyMoreSaveMoreLabel(selectedBuyMoreSaveMore)}
                  image={allImages[0] || product.image_url}
                />
              );
            })()}

            <div className="mt-2 pt-3 ">
              <p className="text-xl font-bold text-gray-900 mb-4 text-green-500 text-center">
              💧 Fine mesh = better drainage!
              </p>
              <p className="text-base font-bold text-gray-900 mb-4 text-center ">
              Dense holes trap food bits 🍽️, let water drain fast—keeps sink flowing, clog-free 🚰.
              </p>
              <div className="mt-2 pt-3 "></div>
              <img
               src="https://cdn.fastcdnshop.com/image/bd8b82233859c4d236f63c520d85868baa54bb33.gif"
               alt="application" 
               className="w-full h-auto" 
            />
            <img
               src="https://cdn.fastcdnshop.com/image/27f096ce983e47b41da8ee9adeed3f46ddba6690.jpeg"
               alt="application" 
               className="w-full h-auto" 
            />
            </div>

            <div className="mt-4 pt-6 space-y-4">
            <p className="text-xl font-bold text-gray-900 mb-4 text-green-500 text-center">
            🧽 No-Touch Waste Disposal!
              </p>
              <p className="text-base font-bold text-gray-900 mb-4 text-center">
              Press the bottom lid—food scraps drop straight into the trash 🗑️, no dirty hands 👐.
              Clean your sink mess-free, hassle-free! ✨
              </p>
              <div className="mt-2 pt-3 "></div>
              <img
               src="https://cdn.fastcdnshop.com/image/d4e82db98d6662501bb94ae1c13589a5c193918a.gif"
               alt="application" 
               className="w-full h-auto" 
            />
            <img
               src="https://cdn.fastcdnshop.com/image/5f877c34a75fa79f14b6316e91307aadf793686f.jpeg"
               alt="application" 
               className="w-full h-auto" 
            />
            <p className="text-xl font-bold text-gray-900 mb-4 text-green-500 text-center">
            🔧 One-Second Install!
              </p>
              <p className="text-base font-bold text-gray-900 mb-4 text-center">
              Powerful suction cups—install in seconds, no drilling/tools 🛠️.
              Press to lock tight—stable & reliable! ✨
              </p>
            
              <img
               src="https://cdn.fastcdnshop.com/image/ec45806dcceebf14817a5611ab27b629d3c07e56.jpeg"
               alt="application" 
               className="w-full h-auto" 
            />
            <p className="text-xl font-bold text-gray-900 mb-4 text-green-500 text-center">
            🛠️ Removable for easy cleaning! 🧼
              </p>
              <p className="text-base font-bold text-gray-900 mb-4 text-center">
              Detachable strainer lifts out easy—quick rinse/clean. No buildup, no odors—just a fresher kitchen 🌬️!
              </p>
            
              <img
               src="https://cdn.fastcdnshop.com/image/af15a733705dc9e9b64aeb7db77d9141ee7a51bd.jpeg"
               alt="application" 
               className="w-full h-auto" 
            />
            <p className="text-xl font-bold text-gray-900 mb-4 text-green-500 text-center">
            📦 Multipurpose kitchen tool!
              </p>
              <p className="text-base font-bold text-gray-900 mb-4 text-center">
              More than a strainer—stores sponges 🧽, scrubbers, small utensils. Space-saving for any sink setup! ✨
              </p>
            
              <img
               src="https://cdn.fastcdnshop.com/image/7944dbff53ed69a8254b824f3cd31d71366f13e7.jpeg"
               alt="application" 
               className="w-full h-auto" 
            />
            <p className="text-xl font-bold text-gray-900 mb-4 text-green-500 text-center">
            🌿 Odor-free sink starts here!
              </p>
              <p className="text-base font-bold text-gray-900 mb-4 text-center">
              Stops leftover food from stinking 🤢.
This basket keeps things dry, clean, hygienic—right from the start! 🧼✨
              </p>
            
              <img
               src="https://cdn.fastcdnshop.com/image/ab330aa9c85fc10c0d3c778c4f1a0308c891ccba.jpeg"
               alt="application" 
               className="w-full h-auto" 
            />
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

