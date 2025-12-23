import { notFound } from 'next/navigation';
import { RelatedProducts } from '@/components/products/related-products';
import { getProductBySlug, getRelatedProducts } from '@/lib/mock-data';
import { getProductTemplate } from '@/components/products/product-templates';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.category_id, product.id);
  const ProductTemplate = getProductTemplate(product.id);

  return (
    <>
      <ProductTemplate product={product} />
      {relatedProducts.length > 0 && (
        <div className="bg-[#fdfbf7] py-12">
          <div className="container mx-auto px-4">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      )}
    </>
  );
}
