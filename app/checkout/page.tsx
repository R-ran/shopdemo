'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { VisaCheckout } from '@/components/checkout/visa-checkout';
import { PayPalCheckout } from '@/components/checkout/paypal-checkout';
import { GooglePayCheckout } from '@/components/checkout/google-pay-checkout';
import { ApplePayCheckout } from '@/components/checkout/apple-pay-checkout';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Lock, Truck, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { items, getTotalPrice, getTotalSavings, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [shippingProtection, setShippingProtection] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });

  const paymentMethod = searchParams.get('payment') || 'card';
  const shippingProtectionPrice = 3.99;
  const subtotal = getTotalPrice();
  const savings = getTotalSavings();
  const shippingProtectionFee = shippingProtection ? shippingProtectionPrice : 0;
  const total = subtotal + shippingProtectionFee;

  useEffect(() => {
    if (items.length === 0) {
      router.push('/products');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 生成订单号
  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD${timestamp}${random}`;
  };

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);

      // 生成订单号
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);

      // 准备订单数据
      const orderData = {
        items,
        shippingInfo: formData,
        total,
        shippingProtection,
        paymentMethod,
      };

      // 发送订单邮件
      try {
        const emailResponse = await fetch('/api/send-order-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderNumber: newOrderNumber,
            orderData,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send order email');
        }
      } catch (emailError) {
        console.error('Error sending order email:', emailError);
        // 即使邮件发送失败，也不阻止订单完成
      }

      // 显示订单号对话框
      setShowOrderDialog(true);

      // 清空购物车
      clearCart();

      // 3秒后跳转到订单成功页面
      setTimeout(() => {
        setShowOrderDialog(false);
        router.push(`/order-success?order=${newOrderNumber}`);
      }, 5000);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: 'Error',
        description: error.message || 'Failed to process order. Please contact support.',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: 'Payment failed',
      description: error,
      variant: 'destructive',
    });
  };


  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* 订单号对话框 */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-2xl text-center">订单支付成功！</DialogTitle>
            <DialogDescription className="text-center mt-4">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">您的订单号：</p>
                <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
                <p className="text-sm text-gray-600 mt-4">
                  订单确认邮件已发送到您的邮箱
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  页面将在几秒后自动跳转...
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                setShowOrderDialog(false);
                if (orderNumber) {
                  router.push(`/order-success?order=${orderNumber}`);
                }
              }}
              className="w-full"
            >
              查看订单详情
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：订单详情 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 配送信息 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>

                    {/* Shipping Protection */}
                    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-start gap-3 flex-1">
                        <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            Shipping Protection
                          </h4>
                          <p className="text-xs text-gray-600">
                            Protect your shipment from damage, loss, or theft.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">$3.99</span>
                        <button
                          type="button"
                          onClick={() => setShippingProtection(!shippingProtection)}
                          className={`w-10 h-6 rounded-full relative transition-colors ${
                            shippingProtection ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                              shippingProtection ? 'translate-x-5' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* 支付按钮 */}
                    <div className="space-y-3 pt-4">
                      {/* Google Pay 按钮 */}
                      <GooglePayCheckout
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                      
                      {/* Apple Pay 按钮 */}
                      <ApplePayCheckout
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                      
                      {/* Visa 支付表单 */}
                      <VisaCheckout
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                      
                      {/* PayPal 支付 */}
                      <PayPalCheckout
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧：订单摘要 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 商品列表 */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {item.name}
                          </p>
                          {item.selectedPackage && (
                            <p className="text-xs text-gray-500">{item.selectedPackage}</p>
                          )}
                          {item.selectedColor && (
                            <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                          )}
                          {item.selectedSize && (
                            <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                          )}
                          <p className="text-sm text-gray-600 mt-1">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {savings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Savings</span>
                        <span className="text-blue-600 font-semibold">
                          -${savings.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    {shippingProtection && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping Protection</span>
                        <span className="text-gray-900 font-semibold">
                          ${shippingProtectionPrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-base pt-2 border-t font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* 支付图标 */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t">
                    <img src="/visa.png" alt="VISA" className="h-6 w-auto" />
                    <img src="/Googlepay.png" alt="Google Pay" className="h-6 w-auto" />
                    <img src="/apple.png" alt="Apple Pay" className="h-6 w-auto" />
                    <img src="/paypal.png" alt="PayPal" className="h-6 w-auto" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

