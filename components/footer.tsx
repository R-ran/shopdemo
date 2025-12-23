'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'subscribe',
          subscribeEmail: email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#00a6ff] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 左侧：Quick links */}
          <div className="flex flex-col text-3xl items-center">
            <h4 className="font-semibold mb-4 text-white">Quick links</h4>
            <ul className="text-base space-y-2">
              <li>
                <Link href="/about" className="hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline transition-colors">
                  FAQS
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline transition-colors">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/policy" className="hover:underline transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:underline transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/top" className="hover:underline transition-colors">
                  Terms of Purchase
                </Link>
              </li>
              <li>
                <Link href="/tou" className="hover:underline transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* 右侧：Subscribe to our emails */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-3xl">Subscribe to our emails</h4>
            <p className="text-sm opacity-90 mb-4">
              Stay updated on exclusive offers and latest arrivals - subscribe to our newsletter
              now for special discounts and insider deals!
            </p>

            <form onSubmit={handleSubscribe} className="max-w-sm">
              <input
                aria-label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 rounded-md mb-3 text-gray-900 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#00a6ff] font-semibold py-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>

        {/* 底部：版权信息和支付方式 */}
        <div className="border-t border-blue-300 pt-8 mt-8">
          <div className="flex flex-col items-center gap-4">
            {/* 支付方式图标 */}
            <div className="flex items-center gap-3 justify-center">
              {/* Visa */}
              <div className="bg-white rounded px-4 py-2.5 flex items-center justify-center">
                <img 
                src="/visa.png" 
                alt="VISA" 
                className="w-15 h-6" />
              </div>
              {/* Google Pay */}
              <div className="bg-white rounded px-4 py-2.5 flex items-center justify-center">
                <img 
                src="/Googlepay.png" 
                alt="Google Pay" 
                className="w-15 h-6" />
              </div>
              {/* Apple Pay */}
              <div className="bg-white rounded px-4 py-2.5 flex items-center justify-center">
                <img 
                src="/apple.png" 
                alt="Apple Pay" 
                className="w-15 h-6" />
              </div>
              {/* PayPal */}
              <div className="bg-white rounded px-4 py-2.5 flex items-center justify-center">
                <img 
                src="/paypal.png" 
                alt="PayPal" 
                className="w-15 h-6" />
              </div>
            </div>

            {/* 版权信息 */}
            <p className="text-sm text-gray-200 text-center">
              © {new Date().getFullYear()}, economicalkshop Powered by Shrine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
