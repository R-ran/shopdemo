'use client';

import { useState } from 'react';

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
import { Minus, Plus, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { PaymentButtons } from '../payment-buttons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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

export function Product6Template({ product }: ProductTemplateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('large');
  const [selectedColor, setSelectedColor] = useState('white');
  const { toast } = useToast();
  const { addItem } = useCart();

  const sizeOptions = [
    { value: 'xs/6', label: 'XS/6' },
    { value: 's/8', label: 'S/8' },
    { value: 'm/10', label: 'M/10' },
    { value: 'l/12', label: 'L/12' },
    { value: 'xl/14', label: 'XL/14' },
  ];

  const colorOptions = [
    { value: 'Dark Grey', label: 'Dark Grey' },
  ];

  const getSizeLabel = (value: string) => {
    return sizeOptions.find(opt => opt.value === value)?.label || value.toUpperCase();
  };

  const getColorLabel = (value: string) => {
    return colorOptions.find(opt => opt.value === value)?.label || value.toUpperCase();
  };

  const handleAddToCart = () => {
    const allImages = [product.image_url, ...product.images].filter(Boolean);
    addItem({
      productId: product.id,
      name: product.name,
      image: allImages[0] || product.image_url,
      price: product.price,
      comparePrice: product.compare_at_price || undefined,
      quantity,
      selectedSize: getSizeLabel(selectedSize),
      selectedColor: getColorLabel(selectedColor),
    });
    toast({
      title: 'Added to cart!',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  const allImages = [product.image_url, ...product.images].filter(Boolean);
  const reviewCount = 12000;
  const rating = 4.5;
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePreviousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-8 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="lg:sticky lg:top-8 lg:self-start">
            {/* 自定义图片画廊 - 缩略图更大且居中 */}
            <div className="space-y-4">
              {/* 主图 */}
              <div className="relative aspect-square bg-white overflow-hidden group">
                <Image
                  src={allImages[selectedImage]}
                  alt={`${product.name} - Image ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  priority={selectedImage === 0}
                />

                {allImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handlePreviousImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>

              {/* 缩略图 - 更大且居中 */}
              {allImages.length > 1 && (
                <div className="flex justify-center gap-3 pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 w-28 h-28 bg-white border-2 overflow-hidden transition-all ${
                        selectedImage === index
                          ? 'border-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                20 + reviews
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="space-y-6 mb-6">
              {/* Size 选择器 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Size - {getSizeLabel(selectedSize)}
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedSize(option.value)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedSize === option.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-900 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color 选择器 */}
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base py-6 mb-4"
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
                  price={product.price}
                  comparePrice={product.compare_at_price || undefined}
                  quantity={quantity}
                  selectedSize={getSizeLabel(selectedSize)}
                  selectedColor={getColorLabel(selectedColor)}
                  image={allImages[0] || product.image_url}
                />
              );
            })()}

            <div className="mt-8 pt-6 border-t border-gray-200">
              
              <div className="prose prose-sm text-gray-600 leading-relaxed">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

