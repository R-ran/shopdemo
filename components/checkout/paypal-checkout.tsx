'use client';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface PayPalCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function PayPalCheckout({ amount, onSuccess, onError }: PayPalCheckoutProps) {
  const router = useRouter();
  const { toast } = useToast();

  const createOrder = async () => {
    try {
      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount.toFixed(2),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.orderId) {
        throw new Error('No order ID received from server');
      }

      return data.orderId;
    } catch (error: any) {
      console.error('PayPal createOrder error:', error);
      onError(error.message || 'Failed to create PayPal order');
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      if (!data.orderID) {
        throw new Error('No order ID in PayPal approval data');
      }

      const response = await fetch('/api/capture-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // 检查订单状态
      if (result.status === 'COMPLETED' || result.status === 'APPROVED') {
        onSuccess();
      } else {
        console.error('PayPal order status:', result.status);
        onError(`Payment status: ${result.status || 'UNKNOWN'}`);
      }
    } catch (error: any) {
      console.error('PayPal capture error:', error);
      onError(error.message || 'Failed to capture PayPal payment');
    }
  };

  // 检查PayPal Client ID是否配置
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!paypalClientId || paypalClientId === 'your-paypal-client-id') {
    return (
      <div className="p-4 border border-yellow-300 rounded-md bg-yellow-50">
        <p className="text-sm text-yellow-800">
          PayPal is not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your environment variables.
        </p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: paypalClientId,
        currency: 'USD',
        disableFunding: 'paylater,venmo,credit',
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err: any) => {
          console.error('PayPal error:', err);
          onError(err?.message || 'PayPal payment error');
        }}
        onCancel={(data) => {
          console.log('PayPal payment cancelled:', data);
        }}
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        }}
        fundingSource="paypal"
      />
    </PayPalScriptProvider>
  );
}

