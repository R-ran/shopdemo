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
import { Minus, Plus, Star, Battery, Zap } from 'lucide-react';
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

export function Product9Template({ product }: ProductTemplateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('type-c-to-type-c');
  const [selectedLength, setSelectedLength] = useState('5ft');
  const [selectedBuyMoreSaveMore, setSelectedBuyMoreSaveMore] = useState('buy-1');
  const { toast } = useToast();
  const { addItem } = useCart();

  const styleOptions = [
    { value: 'type-c-to-type-c', label: 'TYPE-C to TYPE-C' },
    { value: 'usb-a-to-type-c', label: 'USB-A to TYPE-C' },
  ];

  const lengthOptions = [

    { value: '5ft', label: '🔥 5.0 FT', emoji: '🔥' },

  ];

  const buyOptions: BuyOption[] = [
    {
      id: 'buy-1',
      label: 'BUY 1',
      price: 16.99,
      comparePrice: 33.31,
    },
    {
      id: 'buy-2',
      label: 'BUY 2 🔥 SAVE 10%',
      price: 29.99,
      comparePrice: 58.80,

    },
    {
      id: 'buy-3',
      label: 'BUY 3 💥 💥 SAVE 15% & FREE SHIPPING!',
      price:43.99,
      comparePrice:86.25,

    },
  ];

  const selectedOption = buyOptions.find(opt => opt.id === selectedBuyMoreSaveMore) || buyOptions[0];
  const selectedStyleLabel = styleOptions.find(opt => opt.value === selectedStyle)?.label || '';
  const selectedLengthLabel = lengthOptions.find(opt => opt.value === selectedLength)?.label || '';
  
  // 根据选择的购买选项动态计算折扣百分比
  const discountPercent = selectedOption.comparePrice > selectedOption.price
    ? Math.round(((selectedOption.comparePrice - selectedOption.price) / selectedOption.comparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    const allImages = [product.image_url, ...product.images].filter(Boolean);
    addItem({
      productId: product.id,
      name: product.name,
      image: allImages[0] || product.image_url,
      price: selectedOption.price,
      comparePrice: selectedOption.comparePrice,
      quantity,
      selectedStyle: selectedStyleLabel,
      selectedLength: selectedLengthLabel,
      selectedBuyMoreSaveMore: selectedOption.label,
    });
    toast({
      title: 'Added to cart!',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const allImages = [product.image_url, ...product.images].filter(Boolean);
  const reviewCount = 18;
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
            <div className="flex items-center gap-3 mb-6">
              {selectedOption.comparePrice > selectedOption.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${selectedOption.comparePrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                ${selectedOption.price.toFixed(2)}
              </span>
              {discountPercent > 0 && (
                <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm font-bold">
                  SAVE {discountPercent}%
                </Badge>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {/* Style 选择器 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Style - {selectedStyleLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedStyle(option.value)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedStyle === option.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buy More Save More 选择器 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Buy More Save More - {selectedOption.id === 'buy-1' ? 'BUY 1' : selectedOption.id === 'buy-2' ? 'BUY 2' : 'BUY 3'}
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

              {/* Length 选择器 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Length - {selectedLengthLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {lengthOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedLength(option.value)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedLength === option.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option.emoji && <span className="mr-1">{option.emoji}</span>}
                      {option.label.replace('🔥 ', '')}
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
                  selectedStyle={selectedStyleLabel}
                  selectedLength={selectedLengthLabel}
                  selectedBuyMoreSaveMore={selectedOption.label}
                  image={allImages[0] || product.image_url}
                />
              );
            })()}

            <div className="mt-2 pt-3 ">
              <p className="text-xl font-bold text-gray-900 mb-4">
              🔥Here comes our hot winter sale!We sell at the price of  $16.99 only today, will revert to the original price after hot sale, secure yours before sale ends.
              </p>
              <img
               src="https://cdn.techcloudly.com/image/5192ef25ea1e7ab6a8510bc613b72a71962a8c65.jpeg"
               alt="Pay Attention"
               className="w-full h-auto"
               />
             
            </div>

            <div className="mt-2 pt-3 space-y-4">
              <p className="text-xl font-bold text-red-500 mb-4">
              ⚡2-in-1 Invisible Holder Charger Cable – 240W Fast Charging Cord with Built-In Phone Stand!
              </p>
              <img
               src="https://cdn.techcloudly.com/image/3160761baed23714bdbae9aa0575958b02dc04a7.gif"
               alt="2-in-1 Invisible Holder Charger Cable"
               className="w-full h-auto"
               />
               <p className="text-base text-gray-900 mb-4">
               Upgrade your charging and viewing experience with the <b>Invisible Holder Charger Cable</b>—a sleek 2-in-1 solution that combines a super-fast 240W charging cord with a foldable phone stand. Perfect for gaming, working, or binging shows, it’s compatible with iPhone, Samsung and all Type-C devices.
               </p>
               <img
               src="https://cdn.techcloudly.com/image/9be632318af92c958849ae5832d3e3e869b03483.jpeg"
               alt="Invisible Holder Charger Cable"
               className="w-full h-auto"
               />
               
            </div>
            <div className="mt-2 pt-3 space-y-4">
              <p className="text-xl font-bold text-gray-900 mb-4">
              ✨ Key Features
              </p>
              <p className="text-base font-bold text-gray-900 mb-4">
              240W Super Fast Charging ⚡
              </p>
              <p className="text-base text-gray-900 mb-4">
              Power up your devices in record time! This cable delivers blazing-fast charging for iPhones, Samsung Galaxy, and other Type-C devices—ideal for when you need juice in a hurry.
              </p>
              <img
               src="https://cdn.techcloudly.com/image/bb802c37098c82c40f1f30dec68c85580d862fcd.jpeg"
               alt="240W Super Fast Charging"
               className="w-full h-auto"
               />

               <p className="text-base font-bold text-gray-900 mb-4">
               Built-In Foldable Phone Stand
              </p>
              <p className="text-base text-gray-900 mb-4">
              Watch videos, play games, or video call hands-free! The integrated stand folds flat for portability and unfolds to hold your phone in both vertical and horizontal orientations.
              </p>
              <img
               src="https://cdn.techcloudly.com/image/4af22754432f7b8cad087be7243b6059bca0b2b8.jpeg"
               alt="Built-In Foldable Phone Stand"
               className="w-full h-auto"
               />
               <p className="text-base font-bold text-gray-900 mb-4">
               Universal Compatibility
               </p>
              <p className="text-base text-gray-900 mb-4">
              Works with all iPhone models, Samsung Galaxy and any device with a Type-C port. One cable for all your gadgets!
              </p>
              <p className="text-base font-bold text-gray-900 mb-4">
              Durable & Portable Design
               </p>
              <p className="text-base text-gray-900 mb-4">
              The braided cable is tough enough for daily use, while the foldable stand slips easily into pockets or bags. Take it gaming, to the office, or on car trips—it’s ready for anything.
              </p>

              <img
               src="https://cdn.techcloudly.com/image/672bd5b7155e03fc5a3e5fe7108c2e7e570a62c4.jpeg"
               alt="Universal Compatibility"
               className="w-full h-auto"
               />
              <p className="text-base font-bold text-gray-900 mb-4">
              Ideal For:
              </p>
              <p className="text-base text-gray-900 mb-4">
              <b>Gamers: </b>Who need to charge while playing without cable clutter.
              </p>
              <p className="text-base text-gray-900 mb-4">
              <b>Multitaskers: </b>Who want to watch shows or video call while their phone charges.
              </p>
              <p className="text-base text-gray-900 mb-4">
              <b>Travelers: </b>Who need a compact, all-in-one charging and viewing solution.
              </p>
              <div className="mt-3 pt-4 space-y-4"></div>
              <p className="text-xl font-bold text-orange-500 mb-4">
              ⚡️Stock sells fast - get yours today!
              </p>
              <p className="text-base font-bold text-gray-900 mb-4">
              It will sell out fast, Enjoy a discount now!!⚡Please make sure to buy enough quantity before we increase the price!!!🔥
              </p>
              <img
               src="https://cdn.techcloudly.com/image/a9fdc0ce28d5f4e0da27c104189b1ef019d0f2f8.jpg"
               alt="Stock sells fast - get yours today!"
               className="w-full h-auto"
               />
               <p className="text-base font-bold text-gray-900 mb-4">
               💐WHY US❓
               </p>
               <p className="text-base text-gray-900 mb-4">
               We work directly with manufacturers worldwide to ensure the best quality of our products. We have a Quality Control department which helps us to keep our promise!
               </p>
               <p className="text-base text-gray-900 mb-4">
               🔥Price is always competitive.
               </p>
               <p className="text-base text-gray-900 mb-4">
               😊Awesome Customer Service.
               </p>
               <p className="text-base text-gray-900 mb-4">
               🏆Amazing products along with High Quality.
               </p>
               <p className="text-base text-gray-900 mb-4">
               🍭Read reviews from our lovely customers.
               </p>
               <img
               src="https://cdn.techcloudly.com/image/2022/06/2866bb72afd63eb45adffbc6276287033a6225279c9592cabbe32e7e53893f2c.gif"
               alt="Read reviews from our lovely customers."
               className="w-full h-auto"
               />
               <p className="text-base font-bold text-gray-900 mb-4">
               🔒 100% Risk-Free Purchase
               </p>
               <p className="text-base text-gray-900 mb-4">
               If you bought it and felt that it is not for you, don't worry. Send a message for us, and we will make it right by offering you a replacement or refund. 100% Simple & Risk-Free process.
               </p>
               <p className="text-base font-bold text-gray-900 mb-4">
               🏭 Our Warehouse
               </p>
               <p className="text-base text-gray-900 mb-4">
               We will choose the nearest warehouse according to your address for delivery.
               </p>
               <img
               src="https://cdn.techcloudly.com/image/d3ae68bbfbe9d2851d99dcc7ebcf35c183d2aa2f.gif"
               alt="Our Warehouse"
               className="w-full h-auto"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

