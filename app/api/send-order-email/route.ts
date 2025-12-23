import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * 发送订单确认邮件API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNumber, orderData } = body;

    if (!orderNumber || !orderData) {
      return NextResponse.json(
        { error: 'Order number and order data are required' },
        { status: 400 }
      );
    }

    // 从环境变量获取邮箱配置
    const emailConfig = {
      host: process.env.SMTP_HOST || 'smtp.qq.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // 验证邮箱配置
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      return NextResponse.json(
        { error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransport(emailConfig);

    // 收件人邮箱（您的QQ邮箱）
    const recipientEmail = process.env.RECIPIENT_EMAIL || emailConfig.auth.user;

    // 格式化订单商品列表
    const itemsHtml = orderData.items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" />
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br/>
          ${item.selectedColor ? `<span style="color: #666; font-size: 12px;">颜色: ${item.selectedColor}</span><br/>` : ''}
          ${item.selectedSize ? `<span style="color: #666; font-size: 12px;">尺寸: ${item.selectedSize}</span><br/>` : ''}
          ${item.selectedPackage ? `<span style="color: #666; font-size: 12px;">规格: ${item.selectedPackage}</span><br/>` : ''}
          <span style="color: #666; font-size: 12px;">数量: ${item.quantity}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join('');

    // 计算总价
    const subtotal = orderData.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shippingProtectionFee = orderData.shippingProtection ? 3.99 : 0;
    const total = subtotal + shippingProtectionFee;

    // 邮件内容
    const mailOptions = {
      from: `"EconomicalKShop" <${emailConfig.auth.user}>`,
      to: recipientEmail,
      subject: `新订单 #${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #00a6ff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .order-number { font-size: 24px; font-weight: bold; color: #00a6ff; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; background: white; margin: 20px 0; }
            .total-row { font-weight: bold; font-size: 18px; }
            .info-section { background: white; padding: 15px; margin: 15px 0; border-radius: 4px; }
            .info-label { color: #666; font-size: 12px; }
            .info-value { font-weight: bold; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>新订单通知</h1>
            </div>
            <div class="content">
              <div class="order-number">订单号: #${orderNumber}</div>
              
              <div class="info-section">
                <div class="info-label">支付方式</div>
                <div class="info-value">${orderData.paymentMethod === 'paypal' ? 'PayPal' : orderData.paymentMethod === 'visa' ? 'Visa' : orderData.paymentMethod === 'googlepay' ? 'Google Pay' : orderData.paymentMethod === 'applepay' ? 'Apple Pay' : orderData.paymentMethod}</div>
              </div>

              <div class="info-section">
                <div class="info-label">配送信息</div>
                <div class="info-value">
                  ${orderData.shippingInfo.firstName} ${orderData.shippingInfo.lastName}<br/>
                  ${orderData.shippingInfo.email}<br/>
                  ${orderData.shippingInfo.phone ? `${orderData.shippingInfo.phone}<br/>` : ''}
                  ${orderData.shippingInfo.address}<br/>
                  ${orderData.shippingInfo.city}, ${orderData.shippingInfo.state} ${orderData.shippingInfo.zipCode}<br/>
                  ${orderData.shippingInfo.country}
                </div>
              </div>

              <h3 style="margin-top: 30px;">订单商品</h3>
              <table>
                <thead>
                  <tr style="background: #f5f5f5;">
                    <th style="padding: 10px; text-align: left;">商品</th>
                    <th style="padding: 10px; text-align: left;">详情</th>
                    <th style="padding: 10px; text-align: right;">小计</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right;"><strong>小计:</strong></td>
                    <td style="padding: 10px; text-align: right;">$${subtotal.toFixed(2)}</td>
                  </tr>
                  ${orderData.shippingProtection ? `
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right;"><strong>配送保护:</strong></td>
                    <td style="padding: 10px; text-align: right;">$${shippingProtectionFee.toFixed(2)}</td>
                  </tr>
                  ` : ''}
                  <tr class="total-row">
                    <td colspan="2" style="padding: 10px; text-align: right;"><strong>总计:</strong></td>
                    <td style="padding: 10px; text-align: right;">$${total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <p style="margin-top: 30px; color: #666; font-size: 12px;">
                订单时间: ${new Date().toLocaleString('zh-CN')}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        新订单通知
        
        订单号: #${orderNumber}
        
        支付方式: ${orderData.paymentMethod}
        
        配送信息:
        ${orderData.shippingInfo.firstName} ${orderData.shippingInfo.lastName}
        ${orderData.shippingInfo.email}
        ${orderData.shippingInfo.phone || ''}
        ${orderData.shippingInfo.address}
        ${orderData.shippingInfo.city}, ${orderData.shippingInfo.state} ${orderData.shippingInfo.zipCode}
        ${orderData.shippingInfo.country}
        
        订单商品:
        ${orderData.items.map((item: any) => `
          - ${item.name} (${item.selectedColor || ''} ${item.selectedSize || ''} ${item.selectedPackage || ''})
            数量: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}
        `).join('')}
        
        小计: $${subtotal.toFixed(2)}
        ${orderData.shippingProtection ? `配送保护: $${shippingProtectionFee.toFixed(2)}\n` : ''}
        总计: $${total.toFixed(2)}
        
        订单时间: ${new Date().toLocaleString('zh-CN')}
      `,
    };

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Order confirmation email sent successfully',
    });
  } catch (error: any) {
    console.error('Order email sending error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send order email',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

