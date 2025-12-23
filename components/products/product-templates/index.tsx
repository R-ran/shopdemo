import { Product1Template } from './product-1';
import { Product2Template } from './product-2';
import { Product3Template } from './product-3';
import { Product4Template } from './product-4';
import { Product5Template } from './product-5';
import { Product6Template } from './product-6';
import { Product7Template } from './product-7';
import { Product8Template } from './product-8';
import { Product9Template } from './product-9';

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
    category_id?: string | null;
    categories?: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
}

// 根据产品ID返回对应的模板组件
export function getProductTemplate(productId: string) {
  const templates: Record<string, React.ComponentType<ProductTemplateProps>> = {
    '1': Product1Template,
    '2': Product2Template,
    '3': Product3Template,
    '4': Product4Template,
    '5': Product5Template,
    '6': Product6Template,
    '7': Product7Template,
    '8': Product8Template,
    '9': Product9Template,
  };

  return templates[productId] || Product1Template; // 默认使用第一个模板
}

// 导出所有模板供直接使用
export {
  Product1Template,
  Product2Template,
  Product3Template,
  Product4Template,
  Product5Template,
  Product6Template,
  Product7Template,
  Product8Template,
  Product9Template,
};

