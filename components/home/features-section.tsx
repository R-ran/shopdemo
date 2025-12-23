import { Shield, Lock, Globe, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'Quality Verified',
    description: 'All products undergo strict quality control to ensure excellence',
  },
  {
    icon: Lock,
    title: 'Secure Shopping',
    description: 'Your personal information is protected with advanced encryption',
  },
  {
    icon: Globe,
    title: 'Global Satisfaction',
    description: 'Trusted by customers worldwide with thousands of positive reviews',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated team is always ready to help you with any questions',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-blue-600 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
