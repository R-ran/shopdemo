'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ApplePayCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function ApplePayCheckout({ amount, onSuccess, onError }: ApplePayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // 检查Apple Pay是否可用
    if (typeof window !== 'undefined' && (window as any).ApplePaySession) {
      const canMakePayments = (window as any).ApplePaySession.canMakePayments();
      setIsAvailable(canMakePayments);
    } else {
      setIsAvailable(false);
    }
  }, []);

  const handleApplePay = async () => {
    if (!(window as any).ApplePaySession) {
      onError('Apple Pay is not available');
      return;
    }

    setLoading(true);

    try {
      const request = {
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'Total',
          amount: amount.toFixed(2),
        },
      };

      const session = new (window as any).ApplePaySession(3, request);

      session.onvalidatemerchant = async (event: any) => {
        try {
          // 验证商户
          const response = await fetch('/api/apple-pay-validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              validationURL: event.validationURL,
            }),
          });

          const { merchantSession } = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (err: any) {
          session.abort();
          setLoading(false);
          onError(err.message || 'Merchant validation failed');
        }
      };

      session.onpaymentauthorized = async (event: any) => {
        try {
          // 处理支付
          const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: Math.round(amount * 100),
              currency: 'USD',
              paymentMethod: 'applepay',
              paymentData: event.payment,
            }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            session.completePayment((window as any).ApplePaySession.STATUS_FAILURE);
            throw new Error(result.error || 'Payment failed');
          }

          session.completePayment((window as any).ApplePaySession.STATUS_SUCCESS);
          onSuccess();
        } catch (err: any) {
          session.completePayment((window as any).ApplePaySession.STATUS_FAILURE);
          onError(err.message || 'Payment processing failed');
        } finally {
          setLoading(false);
        }
      };

      session.begin();
    } catch (err: any) {
      setLoading(false);
      onError(err.message || 'An error occurred');
    }
  };

  if (!isAvailable) {
    return null;
  }

  return (
    <Button
      onClick={handleApplePay}
      disabled={loading}
      className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-6 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <img src="/apple.png" alt="Apple Pay" className="h-6 w-auto" />
          Apple Pay
        </>
      )}
    </Button>
  );
}

