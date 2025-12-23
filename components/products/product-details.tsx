'use client';

import { useState, useMemo } from 'react';
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
import { Minus, Plus, Star, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { ProductImageGallery } from './product-image-gallery';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    compare_at_price?: number | null;
    image_url: string;
    images: string[];
    stock: number;
    category_id?: string | null;
    categories?: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
}

// 根据产品ID生成不同的样式变体
function getProductStyleVariant(productId: string): {
  bannerColor: string;
  bannerText: string;
  buttonColor: string;
  buttonHover: string;
  accentColor: string;
  showFlashSale: boolean;
  showReviews: boolean;
  showGuarantee: boolean;
} {
  const idNum = parseInt(productId) || 1;
  const variants = [
    {
      bannerColor: 'bg-gradient-to-r from-orange-500 to-red-500',
      bannerText: '🔥 Flash Sale - 50K+ SOLD! 🔥',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      buttonHover: 'hover:bg-orange-700',
      accentColor: 'text-orange-600',
      showFlashSale: true,
      showReviews: true,
      showGuarantee: true,
    },
    {
      bannerColor: 'bg-gradient-to-r from-blue-500 to-purple-500',
      bannerText: '⚡ Limited Time Offer ⚡',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      buttonHover: 'hover:bg-blue-700',
      accentColor: 'text-blue-600',
      showFlashSale: true,
      showReviews: true,
      showGuarantee: true,
    },
    {
      bannerColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      bannerText: '🌿 Eco-Friendly Choice 🌿',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonHover: 'hover:bg-green-700',
      accentColor: 'text-green-600',
      showFlashSale: false,
      showReviews: true,
      showGuarantee: true,
    },
    {
      bannerColor: 'bg-gradient-to-r from-pink-500 to-rose-500',
      bannerText: '💖 Best Seller - Top Rated 💖',
      buttonColor: 'bg-pink-600 hover:bg-pink-700',
      buttonHover: 'hover:bg-pink-700',
      accentColor: 'text-pink-600',
      showFlashSale: true,
      showReviews: true,
      showGuarantee: false,
    },
    {
      bannerColor: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      bannerText: '⭐ Premium Quality ⭐',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      buttonHover: 'hover:bg-indigo-700',
      accentColor: 'text-indigo-600',
      showFlashSale: false,
      showReviews: true,
      showGuarantee: true,
    },
    {
      bannerColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      bannerText: '🎉 New Arrival - Special Price 🎉',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      buttonHover: 'hover:bg-yellow-600',
      accentColor: 'text-yellow-600',
      showFlashSale: true,
      showReviews: false,
      showGuarantee: true,
    },
    {
      bannerColor: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      bannerText: '✨ Trendy & Fashionable ✨',
      buttonColor: 'bg-teal-600 hover:bg-teal-700',
      buttonHover: 'hover:bg-teal-700',
      accentColor: 'text-teal-600',
      showFlashSale: false,
      showReviews: true,
      showGuarantee: true,
    },
    {
      bannerColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      bannerText: '💫 Exclusive Collection 💫',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      buttonHover: 'hover:bg-purple-700',
      accentColor: 'text-purple-600',
      showFlashSale: true,
      showReviews: true,
      showGuarantee: false,
    },
    {
      bannerColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      bannerText: '🚀 Hot Deal - Limited Stock 🚀',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      buttonHover: 'hover:bg-red-700',
      accentColor: 'text-red-600',
      showFlashSale: true,
      showReviews: true,
      showGuarantee: true,
    },
  ];
  return variants[(idNum - 1) % variants.length];
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('type-c');
  const [selectedLength, setSelectedLength] = useState('5ft');
  const { toast } = useToast();
  const { addItem } = useCart();

  const styleVariant = useMemo(() => getProductStyleVariant(product.id), [product.id]);

  const handleAddToCart = () => {
    const allImages = [product.image_url, ...product.images].filter(Boolean);
    addItem({
      productId: product.id,
      name: product.name,
      image: allImages[0] || product.image_url,
      price: product.price,
      comparePrice: product.compare_at_price || undefined,
      quantity,
      selectedStyle,
      selectedLength,
    });
    toast({
      title: 'Added to cart!',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount && product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const allImages = [product.image_url, ...product.images].filter(Boolean);
  const reviewCount = Math.floor(Math.random() * 200000) + 10000;
  const rating = (Math.random() * 0.5 + 4.5).toFixed(1);

  return (
    <div className="bg-[#fdfbf7] py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 左侧图片区域 - 使用 sticky 定位 */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductImageGallery images={allImages} productName={product.name} />
          </div>

          {/* 右侧产品详情区域 */}
          <div>
            {styleVariant.showFlashSale && (
              <div className={`${styleVariant.bannerColor} text-white px-4 py-2 rounded-lg mb-4 text-center font-bold text-sm`}>
                {styleVariant.bannerText}
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {styleVariant.showReviews && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(parseFloat(rating))
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
            )}

            <div className="flex items-center gap-3 mb-6">
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.compare_at_price!.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <Badge className={`${styleVariant.buttonColor} text-white px-3 py-1 text-sm font-bold`}>
                  SAVE {discountPercent}%
                </Badge>
              )}
            </div>

            {/* 根据产品类别显示不同的选项 */}
            {product.category_id === '1' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Style
                  </label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type-c">TYPE-C</SelectItem>
                      <SelectItem value="usb-a">USB-A</SelectItem>
                      <SelectItem value="lightning">Lightning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Length
                  </label>
                  <Select value={selectedLength} onValueChange={setSelectedLength}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3ft">3.0 FT</SelectItem>
                      <SelectItem value="5ft">5.0 FT</SelectItem>
                      <SelectItem value="10ft">10.0 FT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {(product.category_id === '2' || product.category_id === '3') && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Size
                  </label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xlarge">X-Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Color
                  </label>
                  <Select value={selectedLength} onValueChange={setSelectedLength}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                      <SelectItem value="beige">Beige</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 bg-white"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 bg-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className={`w-full ${styleVariant.buttonColor} text-white font-semibold text-base py-6 mb-4`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to cart'}
            </Button>

            <div className="flex flex-col items-center gap-3 py-4 border-t border-gray-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold"></span>
                  </div>
                  <span className="text-sm text-gray-600">Apple Pay</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Also accepts:</span>
                <div className="flex gap-1">
                  <div className="w-8 h-5 bg-blue-600 rounded"></div>
                  <div className="w-8 h-5 bg-orange-500 rounded"></div>
                  <div className="w-8 h-5 bg-blue-800 rounded"></div>
                  <div className="w-8 h-5 bg-red-600 rounded"></div>
                </div>
              </div>
            </div>

            {styleVariant.showGuarantee && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center text-center">
                  <Truck className={`h-6 w-6 ${styleVariant.accentColor} mb-2`} />
                  <span className="text-xs text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className={`h-6 w-6 ${styleVariant.accentColor} mb-2`} />
                  <span className="text-xs text-gray-600">Money Back</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <HeadphonesIcon className={`h-6 w-6 ${styleVariant.accentColor} mb-2`} />
                  <span className="text-xs text-gray-600">24/7 Support</span>
                </div>
              </div>
            )}

            {product.description && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Product Description
                </h2>
                <div className="prose prose-sm text-gray-600 leading-relaxed">
                  {product.description}
                </div>
              </div>
            )}

            {/* 额外的产品信息区域，增加内容高度以便测试滚动 */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Product Features
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>High quality materials and craftsmanship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Durable and long-lasting design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Easy to use and maintain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Customer satisfaction guaranteed</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Shipping & Returns
              </h2>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>• Free shipping on all orders over $50</p>
                <p>• 30-day money-back guarantee</p>
                <p>• Fast and secure checkout</p>
                <p>• Worldwide shipping available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
