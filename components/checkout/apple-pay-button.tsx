'use client';

import { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51...');

interface ApplePayButtonProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function ApplePayButton({ amount, onSuccess, onError }: ApplePayButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const paymentRequestRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const initApplePay = async () => {
      const stripe = await stripePromise;
      if (!stripe || !buttonRef.current || !mounted) return;

      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: Math.round(amount * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      paymentRequestRef.current = paymentRequest;

      const canMakePayment = await paymentRequest.canMakePayment();
      
      if (canMakePayment && canMakePayment.applePay && buttonRef.current && mounted) {
        const elements = stripe.elements();
        const prButton = elements.create('paymentRequestButton', {
          paymentRequest,
          style: {
            paymentRequestButton: {
              theme: 'dark',
              height: '48px',
            },
          },
        });

        prButton.mount(buttonRef.current);

        paymentRequest.on('paymentmethod', async (ev: any) => {
          try {
            const response = await fetch('/api/create-payment-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount: Math.round(amount * 100) }),
            });

            if (!response.ok) {
              throw new Error('Failed to create payment intent');
            }

            const data = await response.json();
            const { clientSecret } = data;

            if (!clientSecret) {
              throw new Error('No client secret received');
            }

            const { error: confirmError } = await stripe.confirmCardPayment(
              clientSecret,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            );

            if (confirmError) {
              ev.complete('fail');
              onError(confirmError.message || 'Payment failed');
            } else {
              ev.complete('success');
              onSuccess();
            }
          } catch (err: any) {
            ev.complete('fail');
            onError(err.message || 'An error occurred');
          }
        });
      } else if (buttonRef.current && mounted) {
        buttonRef.current.style.display = 'none';
      }
    };

    initApplePay();

    return () => {
      mounted = false;
      if (buttonRef.current) {
        buttonRef.current.innerHTML = '';
      }
    };
  }, [amount, onSuccess, onError]);

  return <div ref={buttonRef} id="apple-pay-button" />;
}

