'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface GooglePayCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    google?: {
      pay: {
        api: {
          PaymentsClient: new (config: any) => any;
        };
      };
    };
  }
}

export function GooglePayCheckout({ amount, onSuccess, onError }: GooglePayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 检查Google Pay是否可用
    const checkGooglePay = async () => {
      if (typeof window === 'undefined' || !window.google) {
        // 加载Google Pay API
        const script = document.createElement('script');
        script.src = 'https://pay.google.com/gp/p/pay.js';
        script.async = true;
        script.onload = () => {
          initGooglePay();
        };
        document.body.appendChild(script);
      } else {
        initGooglePay();
      }
    };

    const initGooglePay = () => {
      if (!window.google?.pay) {
        setIsAvailable(false);
        return;
      }

      try {
        const paymentsClient = new window.google.pay.api.PaymentsClient({
          environment: 'TEST', // 或 'PRODUCTION'
        });

        const isReadyToPayRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'your_payment_gateway', // 替换为您的支付网关
                  gatewayMerchantId: 'your_merchant_id', // 替换为您的商户ID
                },
              },
            },
          ],
        };

        paymentsClient.isReadyToPay(isReadyToPayRequest).then((response: any) => {
          setIsAvailable(response.result);
        });
      } catch (error) {
        console.error('Google Pay initialization error:', error);
        setIsAvailable(false);
      }
    };

    checkGooglePay();
  }, []);

  const handleGooglePay = async () => {
    if (!window.google?.pay) {
      onError('Google Pay is not available');
      return;
    }

    setLoading(true);

    try {
      const paymentsClient = new window.google.pay.api.PaymentsClient({
        environment: 'TEST', // 或 'PRODUCTION'
      });

      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
          merchantId: 'your_merchant_id', // 替换为您的商户ID
          merchantName: 'Your Store Name', // 替换为您的商店名称
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: amount.toFixed(2),
          currencyCode: 'USD',
        },
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['VISA', 'MASTERCARD'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'your_payment_gateway', // 替换为您的支付网关
                gatewayMerchantId: 'your_merchant_id', // 替换为您的商户ID
              },
            },
          },
        ],
      };

      paymentsClient.loadPaymentData(paymentDataRequest).then(async (paymentData: any) => {
        try {
          // 处理支付数据
          const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: Math.round(amount * 100),
              currency: 'USD',
              paymentMethod: 'googlepay',
              paymentData: paymentData,
            }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.error || 'Payment failed');
          }

          onSuccess();
        } catch (err: any) {
          onError(err.message || 'Payment processing failed');
        } finally {
          setLoading(false);
        }
      }).catch((error: any) => {
        setLoading(false);
        if (error.statusCode !== 'CANCELED') {
          onError(error.message || 'Google Pay payment failed');
        }
      });
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
      ref={buttonRef}
      onClick={handleGooglePay}
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
          <img src="/Googlepay.png" alt="Google Pay" className="h-6 w-auto" />
          Google Pay
        </>
      )}
    </Button>
  );
}

