import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // 检查PayPal配置
    const paypalClientId = process.env.PAYPAL_CLIENT_ID;
    const paypalSecret = process.env.PAYPAL_SECRET;
    const paypalApiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

    if (!paypalClientId || !paypalSecret) {
      return NextResponse.json(
        { error: 'PayPal configuration is missing' },
        { status: 500 }
      );
    }

    // 捕获PayPal订单
    const response = await fetch(
      `${paypalApiUrl}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(
            `${paypalClientId}:${paypalSecret}`
          ).toString('base64')}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('PayPal capture error:', result);
      return NextResponse.json(
        { 
          error: result.message || result.error_description || 'Failed to capture PayPal order',
          details: result
        },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}

