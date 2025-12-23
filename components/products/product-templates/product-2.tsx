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
import { Minus, Plus, Star, Droplet, CheckCircle, Tag } from 'lucide-react';
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
  freeShipping?: boolean;
}

export function Product2Template({ product }: ProductTemplateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedBuyOption, setSelectedBuyOption] = useState('buy-2');
  const { toast } = useToast();
  const { addItem } = useCart();

  const buyOptions: BuyOption[] = [
    {
      id: 'buy-1',
      label: 'BUY 1',
      price: 15.99,
      comparePrice: 31.50,
    },
    {
      id: 'buy-2',
      label: 'BUY 2 GET 1 FREE (3PCS)',
      emoji: '🔥',
      price: 29.99,
      comparePrice: 31.50,
    },
    {
      id: 'buy-3',
      label: 'BUY 3 GET 2 FREE (5PCS) & FREE SHIPPING',
      emoji: '🔥🔥',
      price: 45.99,
      comparePrice: 89.99,
      freeShipping: true,
    },
  ];

  const selectedOption = buyOptions.find(opt => opt.id === selectedBuyOption) || buyOptions[1];
  const discountPercent = Math.round(((selectedOption.comparePrice - selectedOption.price) / selectedOption.comparePrice) * 100);

  const handleAddToCart = () => {
    const allImages = [product.image_url, ...product.images].filter(Boolean);
    addItem({
      productId: product.id,
      name: product.name,
      image: allImages[0] || product.image_url,
      price: selectedOption.price,
      comparePrice: selectedOption.comparePrice,
      quantity,
      selectedBuyMoreSaveMore: selectedOption.label,
    });
    toast({
      title: 'Added to cart!',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const allImages = [product.image_url, ...product.images].filter(Boolean);
  const rating = 4.8;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 左侧图片区域 - 固定 */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductImageGallery images={allImages} productName={product.name} />
          </div>

          {/* 右侧产品详情 */}
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg mb-4 text-center font-bold text-sm">
              🔥 Last Save 49% OFF! 🔥
            </div>

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
                20 Reviews
              </span>
            </div>

            {/* 价格显示 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl text-gray-500 line-through">
                ${selectedOption.comparePrice.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-blue-600">
                ${selectedOption.price.toFixed(2)}
              </span>
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm font-bold flex items-center gap-1">
                <Tag className="h-3 w-3" />
                SAVE {discountPercent}%
              </Badge>
            </div>

            {/* Buy More Save More 模块 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Buy More Save More - 🔥 BUY 2 GET 1 FREE (3PCS)
              </h3>
              
              <div className="space-y-2">
                {buyOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedBuyOption(option.id)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                      selectedBuyOption === option.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-900 border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {option.emoji && <span>{option.emoji}</span>}
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-6">

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
                  selectedBuyMoreSaveMore={selectedOption.label}
                  image={allImages[0] || product.image_url}
                />
              );
            })()}

            <div className="mt-8 pt-6space-y-4">
              <p className="text-xl font-bold mb-4" style={{ color: '#e67d22' }}>
              Don't forget to buy some for your family or friends as it's a unique gift idea.❤️❤️❤️
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="font-bold flex items-start gap-2">
                  <span>This sink stopper is a practical choice for any bathroom sink. Its efficient drainage and anti-clogging capabilities ensure a smooth flow of water, Say goodbye to clogged sinks,make it a reliable and low-maintenance solution for bathroom sinks.</span>
                </li>
              </ul>
              <img 
               src="https://cdn.newfastcdn.com/image/1478aa4ae8fd9925b413080e1b2687aefd0885be.gif"
               alt="application video" 
               className="w-full h-auto" 
               />
            </div>

            <div className="mt-2 pt-3 ">
              <p className="text-xl font-bold text-gray-900 mb-4">
              【POP-UP DESIGN】
              </p>
              <div className="space-y-2 text-gray-600 text-base">
                <p>This sink stopper is designed to catch hair and prevent clogging in bathroom sinks.The pop-up bathroom sink stopper is crafted with a pop-up mechanism for easy opening and closing of the drain. 1.1-1.29 Inch for US Bathroom Sink Stopper Replacement, Bathroom Sink Drain Strainer,making it a reliable choice for your bathroom sink.</p>
            
              </div>
            </div>
            <div className="mt-2 pt-3 "></div>

            <img
               src="https://cdn.newfastcdn.com/image/79fdf136cbc6049c3bbe4c07a6ca0a09779a07e5.webp"
               alt="pop-up design" 
               className="w-full h-auto" 
            />
            <div className="mt-2 pt-3 ">
              <p className="text-xl font-bold text-gray-900 mb-4">
              【PERFECT COMPATlBlLiTY】
              </p>
              <div className="space-y-2 text-gray-600 text-base">
                <p>This sink stopper is suitable for 99% of sinkholes,lt comes with a rubber rings to ensure a snug fit in a variety of drainsizes. With an inner diameter ranging from with an inner diameter range of1.02 inches to 1.2 inches. it is widely suitable for washbasins, bathroom sinkdrains, and shower tub drains</p>
              </div>
            </div>
            <div className="mt-2 pt-3 "></div>
            <img
               src="https://cdn.newfastcdn.com/image/ff6b3d630a99e254b9ffdaba9988c9c9a5213e67.webp"
               alt="perfect compatibility" 
               className="w-full h-auto" 
            />
            <div className="mt-2 pt-3 "></div>
            <div className="space-y-4 text-gray-600 text-base">
              <p>【EASY SET-UP AND CLEANING】Installing a universal bathroom sink filter plug is effortless.Simply replace the old sink plug with the new drain plug. For cleaning, effortlessly remove it and rinse under running water. Use a soft brush or cloth to eliminate any stubborn debris. Say goodbye to the hassle of digging through hair and gunk to clear your drain!</p>
            </div>
            <div className="mt-2 pt-3 "></div>
            <img
               src="https://cdn.newfastcdn.com/image/a322c260b66d94f890572df666d7d5d6b563ab4b.jpeg"
               alt="easy set-up and cleaning" 
               className="w-full h-auto" 
            />
            <img
               src="https://cdn.newfastcdn.com/image/408ebd50798735525105eaf6566fb8c83e5b463f.webp"
               alt="easy set-up and cleaning" 
               className="w-full h-auto" 
            />
            <div className="mt-2 pt-3 "></div>
            <div className="space-y-4 text-gray-600 text-base">
              <p>【UPGRADED 2-IN-1 DESIGN】The pop-up bathroom sink drain strainer features an anti-clogging basket inside, combining a stopper and a strainer in one.clogging basket that captures hair and other debris, preventing them from entering the drain.This helps to maintain efficient drainage and prevents clogging issues.</p>

          </div>
          <div className="mt-2 pt-3 "></div>
          <img
               src="https://cdn.newfastcdn.com/image/50e91ef7ca2d98627cb883602d80dd2d9925540b.webp"
               alt="upgraded 2-in-1 design" 
               className="w-full h-auto" 
            />
            <img
               src="https://cdn.newfastcdn.com/image/728e6be3f394b6ec19655e1fbc5dc0090a00536d.webp"
               alt="upgraded 2-in-1 design" 
               className="w-full h-auto" 
            />
            <div className="mt-2 pt-3 "></div>
            <div className="space-y-4 text-gray-600 font-bold text-xl">
              <p>NOTE:</p>
              <span className="space-y-4 text-gray-600 font-bold text-base">Our Facebook Official Customer Feedback Score Has Reached 4.9 out of 5. The score is better than 98% of other Ecommerce businesses who sell products through Facebook ads. We take very seriously our product quality and customer service.</span>
            </div>
            <div className="mt-2 pt-3 "></div>
            <img
               src="https://cdn.newfastcdn.com/image/36f2e9e8ffe6aa6ede01d88bc084e280ce05e74b.jpeg"
               alt="note" 
               className="w-full h-auto" 
            />
            
            <div className="space-y-4 text-gray-600 font-bold text-xl">
              <p>CERTIFICATION</p>
            
            </div>
            <div className="mt-2 pt-3 "></div>
            <img
               src="https://cdn.newfastcdn.com/image/18fe789795c5fc49741847056c3fca599dcf696f.jpeg"
               alt="certification" 
               className="w-full h-auto" 
            />
            <img
               src="https://cdn.newfastcdn.com/image/181bfe2ce4ada795e13112c9c92613ce65860b1a.jpeg"
               alt="certification" 
               className="w-full h-auto" 
            />
            <div className="mt-2 pt-3 "></div>
            <div className="space-y-4 text-gray-600 font-bold text-base">
              <p>Worldwide Shipping ✈</p>
              <div className="mt-1 pt-1 "></div>
              <span className="font-boldt ext-gray-600 text-base">Please do note that shipping is insured. However, you may receive your items earlier. Tracking Numbers will ALWAYS be sent so you can track it every step of the way! Cool things are worth waiting for!</span>
            </div>
            <div className="mt-1 pt-1 "></div>
            <img
               src="https://cdn.newfastcdn.com/image/7edefe735994bf59bf1a9bda412921da5b3d90a3.jpeg"
               alt="worldwide shipping" 
               className="w-full h-auto" 
            />
            <div className="mt-1 pt-1 "></div>
            <div className="space-y-4 text-gray-600 font-bold text-xl">
              <p>OUR GUARANTEE</p>
              <div className="mt-1 pt-1 "></div>
              <span className="font-bold text-base">Worldwide Shipping: Each order includes real-time tracking details and insurance coverage in the unlikely event that a package gets lost or stolen in transit.</span>
            <p className="font-bold text-base">Money-Back Guarantee: If you bought it and felt that it is not for you, don't worry. Just shoot us a message , we will make it right by offering you a replacement or refund. 100% Simple & Risk-Free process.</p>
            <p className="font-bold text-base">✉️ 24/7 Customer Support: We have a team of live reps ready to help and answer any questions you have within a 24-hour time frame, 7 days a week.</p>
            <p className="font-bold text-base">Safe & Secure Checkouts: We use state-of-the-art SSL Secure encryption to keep your personal and financial information 100% protected.</p>
            </div>
            <div className="mt-2 pt-3 "></div>
            <img
               src="https://cdn.newfastcdn.com/image/75e2f1c6b82f0a73a23182830f8e8751e7157558.webp"
               alt="our guarantee" 
               className="w-full h-auto" 
            />
            <div className="mt-2 pt-3 "></div>
            <div className="space-y-4 text-gray-600 font-bold text-lg">
              <p>⭐I Wish You A Happy Shopping, THANK YOU⭐</p>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
}

