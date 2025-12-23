'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Order number copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">订单支付成功！</h1>
          
          {orderNumber && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">您的订单号：</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
                <button
                  onClick={handleCopyOrderNumber}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="复制订单号"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            感谢您的购买！订单确认邮件已发送到您的邮箱，订单详情也会发送到我们的邮箱。
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/products">继续购物</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

