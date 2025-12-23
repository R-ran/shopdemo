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
import { Minus, Plus, Star, Truck, Shield, HeadphonesIcon, Wrench, Check } from 'lucide-react';
import { ProductImageGallery } from '../product-image-gallery';
import { PaymentButtons } from '../payment-buttons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

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

interface PackageOption {
  id: string;
  label: string;
  price: number;
  comparePrice: number;
  badge?: string;
  emoji?: string;
}

interface Review {
  id: string;
  userName: string;
  userInitial: string;
  rating: number;
  text: string;
  image?: string;
  verified?: boolean;
}

export function Product1Template({ product }: ProductTemplateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('standard');
  const [selectedPackage, setSelectedPackage] = useState('package-1');
  const { toast } = useToast();
  const { addItem } = useCart();

  const packageOptions: PackageOption[] = [
    {
      id: 'package-1',
      label: '40 Pcs (20 X Small +20 X Big)',
      price: 19.99,
      comparePrice: 27.96,
    },
    {
      id: 'package-2',
      label: '20 Pcs (10 X Small +10 X Big)',
      price: 14.99,
      comparePrice: 31.59,
    },
    {
      id: 'package-3',
      label: '80Pcs (40 X Small +40 X Big)',
      price: 29.99,
      comparePrice: 55.92,
      badge: 'Most popular',
      emoji: '🔥',
    },
    {
      id: 'package-4',
      label: '(80 X Small +80 X Big)Family Pack❤160Pcs🎁 ',
      price: 49.99,
      comparePrice: 83.98,
      badge: 'Hot Sale',
      emoji: '🔥🔥',
    },
  ];

  const selectedPackageData = packageOptions.find(pkg => pkg.id === selectedPackage) || packageOptions[0];

  // 客户评价数据
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'A Armando Chandler',
      userInitial: 'A',
      rating: 5,
      text: 'I love the fact this comes in its own case and comes in 2 different sizes. It also comes with its own tool as well',
      image: 'https://i.ibb.co/JjFtdp1D/17606931353073.png',
      verified: true,
    },
    {
      id: '2',
      userName: 'L Lillie B',
      userInitial: 'L',
      rating: 5,
      text: 'will make job easier, exactly as described, look strong handle',
      image: 'https://i.ibb.co/ksC74TNy/17646524197592.png',
      verified: true,
    },
    {
      id: '3',
      userName: 'K Karen H',
      userInitial: 'K',
      rating: 5,
      text: 'Very smart product. Great love it big time.',
      verified: true,
    },
    {
      id: '4',
      userName: 'B Bethany F',
      userInitial: 'B',
      rating: 5,
      text: 'Handy item to have available.',
      verified: true,
    },
    {
      id: '5',
      userName: 'M Molly C',
      userInitial: 'M',
      rating: 5,
      text: 'Haven\'t got to use any yet',
      verified: true,
    },
    {
      id: '6',
      userName: 'J John D',
      userInitial: 'J',
      rating: 5,
      text: 'Great quality product, highly recommended!',
      verified: true,
    },
  ];

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const handleAddToCart = () => {
    const allImages = [product.image_url, ...product.images].filter(Boolean);
    addItem({
      productId: product.id,
      name: product.name,
      image: allImages[0] || product.image_url,
      price: selectedPackageData.price,
      comparePrice: selectedPackageData.comparePrice,
      quantity,
      selectedStyle,
      selectedPackage: selectedPackageData.label,
    });
    toast({
      title: 'Added to cart!',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount && product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const allImages = [product.image_url, ...product.images].filter(Boolean);
  const reviewCount = 8640;
  const rating = 4.9;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 左侧图片区域 - 固定 */}
          <div className="lg:sticky lg:top-8 lg:self-start lg:z-10 lg:bg-[#fdfbf7] lg:pb-8">
            <ProductImageGallery images={allImages} productName={product.name} />
          </div>

          {/* 右侧产品详情 */}
          <div className="relative lg:z-0">

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            🎄 Christmas Mega Sale – 49% OFF! 🔥 Instant Tire Plug Repair Kit 🚚BUY MORE SAVE MORE
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

           
              
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              <p className="text-xl font-bold text-gray-900 mb-4">
              📣 Fix a Flat in Minutes — No Mechanic Needed!
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span>Just clean the puncture ➝ push in the rubber nail ➝ trim ➝ inflate… and you’re back on the road! 🚗💨</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>Instant Seal: Stops air leaks on the spot—no waiting, no hassle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>Universal Fit: Works perfectly for cars, SUVs, motorcycles, and even large trucks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>Super Easy: Insert, trim, inflate. That’s literally it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✅</span>
                  <span>Safe & Non-Toxic: Stable under high pressure and high temperature, with zero harmful chemicals—safe for you and your tires.</span>
                </li>
              </ul>
            </div>
            <div className="mt-2 pt-3 "></div>

            <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-4">
              <span className="text-lg md:text-xl text-gray-500 line-through">
                ${selectedPackageData.comparePrice.toFixed(2)}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                ${selectedPackageData.price.toFixed(2)}
              </span>
              <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-bold">
                SAVE {Math.round(((selectedPackageData.comparePrice - selectedPackageData.price) / selectedPackageData.comparePrice) * 100)}%
              </Badge>
            </div>

            {/* BUY MORE SAVE MORE 模块 */}
            <div className="mb-6">
              <h3 className="text-center text-lg md:text-xl font-bold text-gray-900 mb-4">
                🔥 BUY MORE SAVE MORE 🔥
              </h3>
              
              <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage} className="space-y-3">
                {packageOptions.map((option) => (
                  <div key={option.id} className="relative">
                    <div
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPackage === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(option.id)}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="flex-shrink-0" />
                      <Label
                        htmlFor={option.id}
                        className="flex-1 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {option.emoji && <span>{option.emoji}</span>}
                          <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              ${option.price.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500 line-through">
                              ${option.comparePrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    {option.badge && (
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {option.badge}
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>

              {/* Free Bonus 部分 */}
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-700 text-center">
                  🎁 Free Bonus: - ❤Free Screwdriver Included❤
                </p>
                <Button
                  
                  className="w-full bg-black text-white hover:bg-gray-800 border-black"
                >
                  ❤Free Screwdriver Included❤
                </Button>
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
              <div className="mt-2 pt-3"></div>

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
                  price={selectedPackageData.price}
                  comparePrice={selectedPackageData.comparePrice}
                  quantity={quantity}
                  selectedStyle={selectedStyle}
                  selectedPackage={selectedPackageData.label}
                  image={allImages[0] || product.image_url}
                />
              );
            })()}

            <div className="mt-2 pt-3 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
              No need to disassemble tires, making tire repair easier and more efficient.
              </h2>
              <img 
              src="https://img-va.myshopline.com/image/store/1745202655941/349730051a2d47b5aab6370e4737e565.gif?w=300&h=300&_f=1"
               alt="application video" 
               className="w-full h-auto" 
               />

              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span className="font-bold">🔧 High-Quality, Durable Construction:</span>
                  <span> Made from premium rubber, our tire repair screws resist aging and withstand high temperatures. They provide a strong seal without damaging your tires—ensuring long-lasting. Crafted from high-quality rubber, these nails ensure a long-lasting repair, withstand various weather conditions.performance.</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1745202655941/c09b45678dbf41318ea319ce50d8925a.jpeg?w=1600&h=1600"
               alt="application photo" 
               className="w-full h-auto" 
               />
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span className="font-bold">⚙️ 【Fast Repair】: These tire repair rubber nails provide a quick and efficient solution to mend punctures, minimizing downtime. Tool-Free, Time-Saving Repair: </span>
                  <span>No need to remove the tire. Slim tail slides in easily, and the thick thread bites firmly. Fix punctures in minutes—without the shop visit</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1745202655941/2f3b59d87082473f9bd64a1f924d1a20.jpeg?w=800&h=800"
               alt="application video" 
               className="w-full h-auto" 
               />
               <img 
               src="https://img-va.myshopline.com/image/store/1745202655941/608d620dc6fb4e9c8abf338af2c1c8bf.jpeg?w=1600&h=1600"
               alt="application photo" 
               className="w-full h-auto" 
               />
                <ul className="space-y-2 text-gray-600">
                  <li className="gap-2">
                    <span className="font-bold"> 🚗 【Universal Application】: Designed to repair punctures for a vast array of tires, suitable for motorcycles, autos, and cars, enhancing versatility. Universal Fit for Multiple Vehicles: </span>
                    <span>Whether it's a car, motorcycle, mountain bike, truck, or tractor—our plugs are suitable for a wide range of tires. Perfect for both urban commutes and off-road adventures.</span>
                  </li>
                </ul>

                <img 
                src="https://img-va.myshopline.com/image/store/1739172715927/981586a3bfe648c2b60c295fc1aa4997.jpg?w=1464&h=600"
                alt="application photo" 
                className="w-full h-auto" 
                />
                <img 
                src="https://img-va.myshopline.com/image/store/1745202655941/d7c65c141c95442bb46b5c3b20276d1f.jpeg?w=1600&h=1600"
                alt="application photo" 
                className="w-full h-auto" 
                />
              <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span className="font-bold">💧 Excellent Sealing & Protection:</span>
                  <span>The repair nails ensure a secure seal that keeps water out, preventing rust or steel belt delamination—protecting your tire’s integrity.</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1739172715927/116d9514d18b48659059fcd1ef9fab42.jpg?w=1464&h=600"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>The simplest and the fastest way to repair tires. First observe the size of the puncture and choose the correct size nail for repairing. Then, screwdriver to screw the Tire Repair Rubber Nails into the tyre hole. Simply repair punctures without removing the tire from the rim.</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1745202655941/0a23c24c247747938e1b257d920681ef.jpeg?w=800&h=800"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>Self-service tire repair screws are made of premium rubber materials, No aging and can withstand high temperature, Can firmly fix your tires without damaging them. for cars, mountain bikes, electric bikes, motorcycles, trucks, agricultural tires, and other tubeless vehicles.</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1745202655941/014de94611c84e8f9b0c2c81336ce704.jpeg?w=1600&h=1600"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="font-bold gap-2">
                  <span>【User-Friendly】: No special tools required, enabling easy and straightforward application by individuals without professional skills.</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1739172715927/072f35189c4240849f3875749897547f.jpg?w=800&h=600"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="font-bold gap-2">
                  <span>The simplest way to repair tires</span>
                </li>
                <li className="gap-2">
                  <span>Step 1: Observe the size of the puncture and choose the correct size nail for repairing.</span>
                </li>
                <li className="gap-2">
                <span>Step 2: Use the provided screwdriver to screw the Tire Repair Rubber Nail into the tyre hole.</span>
                </li>
                <li className="gap-2">
                <span>The Small Size Screw can repair gap with 1~3mm while the Large Size Screw can repair gap with 3~5mm.</span>
                </li>

              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1739172715927/97a21e437de546a39312fa86f77266fe.jpg?w=1464&h=600"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <img 
              src="https://img-va.myshopline.com/image/store/1739172715927/0c513a2ea03c4c5580fde46c1d89ba21.jpg?w=1464&h=600"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>Tire plug is covered with sticky seal.If the tire is pierced by a steel nail and leaves a hole, the glue nail can be used with glue.Small tail design prevents secondary damageThicker center threads increase bite with tires.</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1745202655941/a444d40a6c43486ca01fc81fb90a3880.jpeg?w=800&h=800"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="gap-2">
                  <span>Easy And Quick Repairs: Puncture repair nail for repairing punctures for tubeless tire plug without removing them from the rim. This will easily save you time and money fixing your own tires straight from home.</span>
                </li>
                <li className="gap-2">
                  <span>Perfect Sealing Effect: Tire Repair Nails adhere firmly to the tire, have high connection strength, good sealing performance prevents water from entering the wound, so the steel belt will not rust or delamination.</span>
                </li>
                <li className="gap-2">
                  <span>High Temperature & Wear Resistance: Quick tire repair nails made of rubber material, high quality, and durable. High-temperature resistance, high hardness, and high wear resistance, perfect for tire repair.</span>
                </li>
                <li className="gap-2"> 
                  <span>We Provide 2 Sizes: This small tire repair screw is for repairing a 1mm to 3mm hole and the larger size screw is for repairing 3mm to 5mm holes. Use the small one if your car or motorcycle tire is punctured with a small & thin nail. If the nail is larger, then use the bigger size.</span>
                </li>
                <li className="gap-2">
                  <span>What you receive: 40/80/160 pieces of Vacuum Tire Repair Nail Kit, this tubeless tire repair kit is designed for emergency puncture repairs on can be used on cars, motorcycles, and agricultural tires.</span>
                </li>
              </ul>

              <img 
              src="https://img-va.myshopline.com/image/store/1745202655941/edf68f11d43c4d5892013271cffb4d95.jpeg?w=1600&h=1600"
               alt="application photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="font-bold gap-2">
                  <span>YOUR CONFIDENCE, OUR PRIORITY 🌟</span>
                </li>
                <li className="font-bold gap-2">
                  <span>🌍 Seamless Delivery Assurance</span> 
                </li>
                <li className="gap-2">
                  <span>Track every shipment in real-time with carrier partnerships (FedEx/DHL). Should delays occur, receive proactive updates.</span>
                </li>
                <li className="font-bold gap-2">
                  <span>⏳ Stress-Free Resolution Promise</span> 
                </li>
                <li className="gap-2">
                  <span>Items damaged during transit qualify for instant replacements. For any product concerns after delivery, our support team is here to make it right — quickly, kindly, and hassle-free.</span>
                </li>
                <li className="font-bold gap-2">
                  <span>🛡️ Identity Guardianship</span> 
                </li>
                <li className="gap-2">
                  <span>Multi-layered fraud detection + Visa® Secure and Mastercard® Identity Check integrations. We monitor your account security 24/7.</span>
                </li>
                <li className="font-bold gap-2">
                  <span>💬 Concierge-Style Assistance</span> 
                </li>
                <li className="gap-2">
                  <span>Priority phone line access for repeat customers. First-response guarantee: 90% of emails answered within 2 business hours.</span>
                </li>
                <li className="font-bold gap-2">
                  <span>🌿 Sustainable Protection</span> 
                </li>
                <li className="gap-2">
                  <span>Reusable packaging with tamper-proof seals. Every delivery plants a tree through our verified reforestation partners.</span>
                </li>
                <li className="font-bold gap-2 text-2xl">
                  <span>⚡️Stock Sells Fast!⚡️</span> 
                </li>
                <li className="font-bold gap-2">
                  <span>🔥Here comes our Last Day Hot Sale! We sell at the price of  $13.99 only today, will revert to the original price after hot sale, secure yours before sale ends.</span>
                </li>
              </ul>
              <img
              src="https://img0.fbtools.top/uploader/ab836018b391c0833ebc9bc6a1c8cb1a.gif?width=1920"
               alt="application video" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
                <li className="font-bold gap-2">
                <span>🎁This could also be a gift for your family, friends, and loved one.</span>
                </li>
                <li className="font-bold gap-2 text-2xl">
                  <span>❗Notes</span>
                </li>
                <li className="gap-2">
                  <span>Due to manual measurements, please allow slight measurement deviations.</span>
                </li>
                <li className="gap-2">
                  <span>Due to the different display and lighting effects, the actual color of the item may be slightly different from the color displayed in the picture.</span>
                </li>
                <li className='font-bold gap-2 text-lg'>
                  <span>OUR GUARANTEE:</span>
                </li>
                <li className="gap-2">
                  <span>We believe we have some of the most innovative products in the world, and we want to make sure we back that up with a risk-free 30-day guarantee.</span>
                </li>
                <li className="gap-2"> 
                  <span>If for any reason you do not have a positive experience, we will make every effort to ensure that you are satisfied with your purchase.</span>
                </li>
                <li className="gap-2">
                  <span>We want you to rest assured that there is absolutely zero risk in buying and trying out products. If you don't like it and don't feel bad, we'll do it right.</span>
                </li>
                <li className="gap-2">
                  <span>We email support. If you need help, please contact us.</span>
                </li>
                <li className="font-bold gap-2">
                  <span>Our Warehouse:</span>

                </li>

               </ul>

               <img 
               src="https://img-va.myshopline.com/image/store/1718260308901/442f479ad4f5cbec4a958c4271bfff3f.jpeg?w=2400&h=1200"
               alt="warehouse photo" 
               className="w-full h-auto" 
               />
               <img
               src="https://img-va.myshopline.com/image/store/1745202655941/1816ad20aa674dc082001eb2b13b6ec9.jpg?w=624&h=206"
               alt="warehouse photo" 
               className="w-full h-auto" 
               />
               <img
               src="https://img-va.myshopline.com/image/store/1745202655941/22cd06e3347d43e28bbb7f59e00cec65.jpg?w=800&h=208"
               alt="warehouse photo" 
               className="w-full h-auto" 
               />
               <img
               src="https://img-va.myshopline.com/image/store/1718260308901/GIF-Priority-Shipping.gif?w=1200&h=200&_f=1"
               alt="warehouse photo" 
               className="w-full h-auto" 
               />
               <ul className="space-y-2 text-gray-600">
               <li className="font-bold gap-2">
                  <span>🚛Free Shipping Over$43.99</span>
               </li>
               <li className="font-bold gap-2">
                  <span>🌎 Worldwide Shipping ✈  </span>
               </li>
               <li className="gap-2">
                  <span className="font-bold">🚚 Insured Worldwide Shipping:</span>
                  <span>Each order includes real-time tracking details and insurance coverage in the unlikely event that a package gets lost or stolen in transit.</span>
               </li>
               <li className="gap-2">
                <span className="font-bold">🔔 24/7 Customer Support:</span>
                <span>We have a team of live reps ready to help and answer any questions you have within a 24-hour time frame, 7 days a week.</span>
               </li>
               <li className="gap-2">
                <span className="font-bold">🔒 Safe & Secure Checkouts:</span>
                <span>We use state-of-the-art SSL Secure encryption to keep your personal and financial information 100% protected.</span>
               </li>
               <li className="gap-2">
                <span className="font-bold">🔒 100% Risk-Free Purchase</span>
                <span>If you bought it and felt that it is not for you, don't worry. Just hit the Contact us button and send us a message, and we will make it right by offering you a replacement or refund. 100% Simple & Risk-Free process.</span>
               </li>

               </ul>
               <img
               src="https://img-va.myshopline.com/image/store/1718164618087/f60758897a40bb970a3d91a715d46bce7bc5af76.png?w=480&h=126"
               alt="secure payment" 
               className="w-full h-auto" 
               />
               <img
               src="https://img-va.myshopline.com/image/store/2006496158/1686710464435/df699d1c903530d0e9c5fc92a13ffac0.jpg?w=1000&h=663"
               alt="payment methods" 
               className="w-full h-auto" 
               />

            {/* 客户评价模块 */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              {/* 评价概览 */}
              <div className="mb-8">
                <div className="flex flex-col items-center mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="text-gray-600">
                    {totalReviews} reviews
                  </div>
                </div>

                {/* 星级分布 */}
                <div className="space-y-2 max-w-md mx-auto">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = ratingDistribution[stars as keyof typeof ratingDistribution];
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-16">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{stars}</span>
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 评价卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {review.image && (
                      <div className="mb-3">
                        <Image
                          src={review.image}
                          alt={review.userName}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-gray-700">
                          {review.userInitial}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {review.userName}
                          </span>
                          
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                          {review.verified && (
                            <Check className="h-3 w-3 text-green-500 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

