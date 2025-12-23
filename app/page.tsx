import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { ContactSection } from '@/components/home/contact-section';
import { getFeaturedProducts } from '@/lib/mock-data';

export default function Home() {
  const products = getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts products={products} />
      <ContactSection />
    </>
  );
}
