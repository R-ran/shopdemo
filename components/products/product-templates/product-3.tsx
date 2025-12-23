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
import { Minus, Plus, Star, Sparkles } from 'lucide-react';
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

export function Product3Template({ product }: ProductTemplateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('single');
  const [selectedColor, setSelectedColor] = useState('💛YELLOW');
  const [selectedBuyMoreSaveMore, setSelectedBuyMoreSaveMore] = useState('buy-2');
  const { toast } = useToast();
  const { addItem } = useCart();

  const colorOptions = [
    { value: '💛YELLOW', label: '💛YELLOW' },
    { value: '💚GREEN', label: '💚GREEN' },
    { value: '💚GREEN+💛YELLOW (2PCS)', label: '💚GREEN+💛YELLOW (2PCS)' },
  ];

  const getColorLabel = (value: string) => {
    return colorOptions.find(opt => opt.value === value)?.label || value;
  };

  const buyOptions: BuyOption[] = [
    {
      id: 'buy-1',
      label: '1PC ONLY',
      price: 17.99,
      comparePrice: 18.55,
    },
    {
      id: 'buy-2',
      label: 'BUY 2 GET 1 FREE🔥3PCS',
      price: 29.99,
      comparePrice: 53.97,

    },
    {
      id: 'buy-3',
      label: 'BUY 3 GET 2 FREE💥5PCS',
      price: 59.99,
      comparePrice: 89.95,
    },
  ];

  const selectedOption = buyOptions.find(opt => opt.id === selectedBuyMoreSaveMore) || buyOptions[1];
  const discountPercent = Math.round(((selectedOption.comparePrice - selectedOption.price) / selectedOption.comparePrice) * 100);

  const getOptionLabel = (optionId: string) => {
    return buyOptions.find(opt => opt.id === optionId)?.label || '';
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
      selectedPackage,
      selectedColor: getColorLabel(selectedColor),
      selectedBuyMoreSaveMore: getOptionLabel(selectedBuyMoreSaveMore),
    });
    toast({
      title: 'Added to cart!',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const allImages = [product.image_url, ...product.images].filter(Boolean);
  const reviewCount = 25;
  const rating = 4.7;

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
                Package - {selectedOption.label}
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
                  selectedPackage={selectedPackage}
                  selectedColor={getColorLabel(selectedColor)}
                  selectedBuyMoreSaveMore={getOptionLabel(selectedBuyMoreSaveMore)}
                  image={allImages[0] || product.image_url}
                />
              );
            })()}

            <div className="mt-2 pt-3 ">
              <p className="text-lg font-bold text-red-500 mb-4 ">
              TIPS: Our goods are authentic, with genuine patents, counterfeit must be investigated! Customers, please identify our products!
              </p>
              <div className="prose prose-sm text-gray-600 leading-relaxed">
               <p>✅ Guaranteed! GoogleTrusted Store!
                Payments Via PayPal® and CreditCard</p>
              </div>
              <img
               src="https://cdn.shopify.com/s/files/1/0853/1165/2154/files/a7f64d7462170cf2f67979403ad3ee80_d30c71e3-edc5-41cd-82c7-9f49513a858d.jpg?v=1758801920"
               alt="Google Trusted Store" 
               className="w-full h-auto" 
            />
            <div className='font-bold text-orange-500 mt-1 mb-1'>Don't forget to buy some for your family or friends as it's a unique gift idea.❤️❤️❤️</div>
            <div className='font-bold text-green-500 mt-1 mb-1'>No more cleaning disgusting sink kitchen waste by hand!</div>
            <div className='font-bold text-red-500 mt-1 mb-1'>Our cute and innovative cactus filter can achieve efficient drainage and prevent sink clogging, the switch design at the bottom also allows it to automatically dump kitchen waste, saving time and effort!</div>
           <img
           src="https://cdn.hotishop.com/image/27d51765f813b6a4df85d94d73895806736303ca.gif"
           alt="Cactus Filter"
           className="w-full h-auto"
           />
           </div>
            

            <div className="mt-2 pt-3 space-y-4">
              <p className="text-xl font-bold text-gray-900 mb-4">
              Automatic Dumping Basket
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>This cactus filter features a convenient press function, allowing you to easily empty the collected kitchen waste without touching it. Just press the button on the Cactus, the switch at the bottom of the filter will open, and the garbage will automatically pour into the trash can, making kitchen cleaning a breeze.</span>
                </li>
              </ul>
              <img
               src="https://cdn.hotishop.com/image/fb182d0647e42b81f6f2c5c40ef03aeeb21baefd.jpeg"
               alt="Automatic Dumping"
               className="w-full h-auto"
               />
            </div>

            <div className="mt-2 pt-3 space-y-4">
              <p className="text-xl font-bold text-gray-900 mb-4">
              Efficient Draining
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>The cactus filter is designed to effectively drain water, preventing clogs and keeping your sink clean and tidy. With its innovative design of multiple large drainage holes, ensures smooth and efficient drainage, saving you time and effort in cleaning up after meal preparation.</span>
                </li>
              </ul>
              <img
               src="https://cdn.hotishop.com/image/f747f83e21adeab6a21213be06c3c3cf6dea397e.jpeg"
               alt="Efficient Draining"
               className="w-full h-auto"
               />
            </div>

            <div className="mt-2 pt-3 space-y-4">
              <p className="text-xl font-bold text-gray-900 mb-4">
              Universally Applicable
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>Its universal size design makes it suitable for all standard sinks, you don't have to worry about the problem of inappropriate size.</span>
                </li>
              </ul>
              <p className="text-xl font-bold text-gray-900 mb-4">
              Easy to Clean
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>The cactus filter is designed with the convenience of daily use in mind, with a smooth surface that is not easy to hide dirt. Just rinse it after use, or put it in the dishwasher for cleaning, easy maintenance, and ensure a clean kitchen.</span>
                </li>
              </ul>
              <img
               src="https://cdn.hotishop.com/image/d80ad218aae81e227cc564147a0b8ff83e62caf0.jpeg"
               alt="Easy to Clean"
               className="w-full h-auto"
               />
            </div>

            <div className="mt-2 pt-3 space-y-4">
              <p className="text-xl font-bold text-gray-900 mb-4">
              Durable Material
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>Made of high-quality food-grade plastic, the sturdy structural design not only increases the service life of the product but also withstands frequent use and cleaning in the kitchen. It's your long-term and reliable partner for your kitchen sink!</span>
                </li>
              </ul>
              <img
               src="https://cdn.hotishop.com/image/da574027d86fecf0b273c9d8a1985d5dd013c079.jpeg"
               alt="Durable Material"
               className="w-full h-auto"
               />
            </div>

            <div className="mt-2 pt-3 space-y-4">
              <p className="text-xl font-bold text-gray-900 mb-4">
              Use Scenario
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>The cactus filter is suitable for various places such as home kitchens, restaurant kitchens, and cafes, improving cleaning efficiency. It's a practical and functional accessory that will make your sink cleaner and more hygienic. It can also add a lovely touch of style to your sink.</span>
                </li>
              </ul>
              <img
               src="https://cdn.hotishop.com/image/b28ec08fe106c5bfa91ce38133d1a2a7d12bc960.jpeg"
               alt="Use Scenario"
               className="w-full h-auto"
               />
            </div>

            <div className="mt-2 pt-3 space-y-4">
              <p className="text-2xl font-bold text-red-500 mb-4">
              Specifications
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>Material: PP</span>
                </li>
                <li className="gap-2"> 
                  <span>Color: Yellow, Green</span>
                </li>
                <li className="gap-2"> 
                  <span>Size: 8.5*7.8*5cm/3.45*3.07*1.97inch</span>
                </li>
                <li className="gap-2"> 
                  <span>Package includes: 1/3/5 *Cactus Kitchen Sink Drain Strainer</span>
                </li>
              </ul>
              <img
               src="https://cdn.hotishop.com/image/1dffd07c148d44d6223e0b22fe1f0848ac4642e8.jpeg"
               alt="Specifications"
               className="w-full h-auto"
               />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

