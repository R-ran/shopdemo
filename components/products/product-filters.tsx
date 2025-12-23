'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductFiltersProps {
  maxPrice: number;
}

export function ProductFilters({ maxPrice }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [showInStock, setShowInStock] = useState(
    searchParams.get('inStock') === 'true'
  );
  const [showOutOfStock, setShowOutOfStock] = useState(
    searchParams.get('outOfStock') === 'true'
  );

  

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    else params.delete('minPrice');

    if (priceRange[1] < maxPrice) params.set('maxPrice', priceRange[1].toString());
    else params.delete('maxPrice');

    if (showInStock) params.set('inStock', 'true');
    else params.delete('inStock');

    if (showOutOfStock) params.set('outOfStock', 'true');
    else params.delete('outOfStock');

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-700">
              Availability
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={showInStock}
                  onCheckedChange={(checked) => setShowInStock(checked as boolean)}
                />
                <Label
                  htmlFor="in-stock"
                  className="text-sm font-normal cursor-pointer"
                >
                  In stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="out-of-stock"
                  checked={showOutOfStock}
                  onCheckedChange={(checked) => setShowOutOfStock(checked as boolean)}
                />
                <Label
                  htmlFor="out-of-stock"
                  className="text-sm font-normal cursor-pointer"
                >
                  Out of stock
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-700">
              Price
            </h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={maxPrice}
                step={1}
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">From</Label>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="h-9"
                    min={0}
                    max={priceRange[1]}
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">To</Label>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="h-9"
                    min={priceRange[0]}
                    max={maxPrice}
                  />
                </div>
              </div>
              <Button
                onClick={handleApplyFilters}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
