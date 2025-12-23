import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    // 验证金额
    if (!amount || parseFloat(amount) <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // 检查PayPal配置
    const paypalClientId = process.env.PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    const paypalApiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

    if (!paypalClientId || !paypalSecret) {
      console.error('PayPal credentials missing:', {
        hasClientId: !!paypalClientId,
        hasSecret: !!paypalSecret,
      });
      return NextResponse.json(
        { error: 'PayPal configuration is missing. Please check your environment variables.' },
        { status: 500 }
      );
    }

    // 创建PayPal订单
    const response = await fetch(`${paypalApiUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(
          `${paypalClientId}:${paypalSecret}`
        ).toString('base64')}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('PayPal API error:', order);
      return NextResponse.json(
        { 
          error: order.message || order.error_description || 'Failed to create PayPal order',
          details: order
        },
        { status: response.status }
      );
    }

    if (order.id) {
      return NextResponse.json({ orderId: order.id });
    } else {
      console.error('PayPal order response missing ID:', order);
      return NextResponse.json(
        { error: 'Failed to create PayPal order: No order ID in response', details: order },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}

