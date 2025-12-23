'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'featured';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="bestselling">Best selling</SelectItem>
          <SelectItem value="title-asc">Alphabetically, A-Z</SelectItem>
          <SelectItem value="title-desc">Alphabetically, Z-A</SelectItem>
          <SelectItem value="price-asc">Price, low to high</SelectItem>
          <SelectItem value="price-desc">Price, high to low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
