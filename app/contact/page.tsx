import { Metadata } from 'next';
import Link from 'next/link';
import { EmailSubscribe } from '@/components/email-subscribe';

export const metadata: Metadata = {
  title: 'Contact Us - EconomicalKShop',
  description: 'Get in touch with our customer support team. We are here to help you 24/7.',
};

export default function ContactPage() {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-md px-4 md:px-6 py-6 md:py-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
          <p className="text-sm text-gray-700 mb-4">
            If you have any questions, you may check out our FAQ page first to see if your
            questions can be answered right away.
          </p>
          <p className="text-sm text-gray-700 mb-4">
            If you still require help, our team is ready to assist you. Please feel free to reach
            out through one of the methods below:
          </p>

          <ul className="list-disc list-inside text-sm text-gray-700 mb-6 space-y-2">
            <li>
              <strong>Email us:</strong> support@economicalkshop.com
            </li>
            <li>
              <strong>Call us:</strong> +1 (323) 417-6872
            </li>
          </ul>

          <p className="text-sm text-gray-600">We would be more than happy to answer your questions 😊</p>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-2xl md:text-4xl font-bold text-center mb-4">Subscribe to our emails</h3>
            <p className="text-sm text-gray-700 text-center max-w-xl mx-auto mb-4">
              Join our email list for exclusive offers and the latest news.
            </p>

            <div className="flex items-center justify-center">
              <EmailSubscribe
                className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
                inputClassName="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50"
                buttonClassName="w-full sm:w-auto bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#00a6ff] text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Quick links</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/about" className="opacity-90">About Us</Link>
                </li>
                <li>
                  <Link href="/faqs" className="opacity-90">FAQs</Link>
                </li>
                <li>
                  <Link href="/privacy" className="opacity-90">Privacy Notice</Link>
                </li>
                <li>
                  <Link href="/returns" className="opacity-90">Return Policy</Link>
                </li>
                <li>
                  <Link href="/shipping" className="opacity-90">Shipping Policy</Link>
                </li>
                <li>
                  <Link href="/contact" className="opacity-90">Contact us</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Subscribe to our emails</h4>
              <p className="text-sm opacity-90 mb-4">
                Stay updated on exclusive offers and latest arrivals — subscribe to our newsletter
                now for special discounts and insider deals!
              </p>

              <div className="max-w-sm">
                <EmailSubscribe
                  className="flex flex-col"
                  inputClassName="w-full px-3 py-2 rounded-md mb-3 text-gray-900 disabled:opacity-50"
                  buttonClassName="w-full bg-white text-[#00a6ff] font-semibold py-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
