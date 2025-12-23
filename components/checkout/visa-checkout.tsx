'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface VisaCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function VisaCheckout({ amount, onSuccess, onError }: VisaCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 格式化卡号（每4位添加空格）
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.replace(/\s/g, '').length <= 16) {
        setCardData(prev => ({ ...prev, [name]: formatted }));
      }
    }
    // 格式化过期日期（MM/YY）
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
      setCardData(prev => ({ ...prev, [name]: formatted }));
    }
    // CVV（最多3位）
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 3);
      setCardData(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setCardData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证表单
    if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName) {
      onError('Please fill in all fields');
      return;
    }

    // 验证卡号（移除空格）
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      onError('Invalid card number');
      return;
    }

    // 验证过期日期
    const [month, year] = cardData.expiryDate.split('/');
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      onError('Invalid expiry date');
      return;
    }

    // 验证CVV
    if (cardData.cvv.length < 3) {
      onError('Invalid CVV');
      return;
    }

    setLoading(true);

    try {
      // 调用自定义支付API
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // 转换为分
          currency: 'USD',
          paymentMethod: 'visa',
          cardData: {
            cardNumber: cardNumber,
            expiryMonth: month,
            expiryYear: '20' + year,
            cvv: cardData.cvv,
            cardholderName: cardData.cardholderName,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Payment failed');
      }

      if (result.success) {
        onSuccess();
      } else {
        throw new Error(result.error || 'Payment was not successful');
      }
    } catch (err: any) {
      onError(err.message || 'An error occurred during payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              value={cardData.cardholderName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={handleInputChange}
                className="pl-10"
                maxLength={19}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                maxLength={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                type="password"
                value={cardData.cvv}
                onChange={handleInputChange}
                maxLength={3}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            PAY WITH VISA
          </>
        )}
      </Button>
    </form>
  );
}

