import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * 邮件发送API
 * 支持：
 * 1. 联系表单消息
 * 2. 邮箱订阅
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, message, subscribeEmail } = body;

    // 从环境变量获取邮箱配置
    const emailConfig = {
      host: process.env.SMTP_HOST || 'smtp.qq.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // QQ邮箱
        pass: process.env.SMTP_PASS, // QQ邮箱授权码
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

    let mailOptions;

    if (type === 'contact') {
      // 联系表单消息
      mailOptions = {
        from: `"${name || 'Website Contact'}" <${emailConfig.auth.user}>`,
        to: recipientEmail,
        subject: `新联系消息 - ${name || 'Unknown'}`,
        html: `
          <h2>新的联系消息</h2>
          <p><strong>姓名:</strong> ${name || '未提供'}</p>
          <p><strong>邮箱:</strong> ${email || '未提供'}</p>
          <p><strong>电话:</strong> ${phone || '未提供'}</p>
          <p><strong>消息:</strong></p>
          <p>${message || '无消息内容'}</p>
          <hr>
          <p style="color: #999; font-size: 12px;">此消息来自网站联系表单</p>
        `,
        text: `
          新的联系消息
          
          姓名: ${name || '未提供'}
          邮箱: ${email || '未提供'}
          电话: ${phone || '未提供'}
          
          消息:
          ${message || '无消息内容'}
        `,
      };
    } else if (type === 'subscribe') {
      // 邮箱订阅
      mailOptions = {
        from: `"Website Subscription" <${emailConfig.auth.user}>`,
        to: recipientEmail,
        subject: `新邮箱订阅 - ${subscribeEmail}`,
        html: `
          <h2>新的邮箱订阅</h2>
          <p><strong>订阅邮箱:</strong> ${subscribeEmail}</p>
          <p><strong>订阅时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
          <hr>
          <p style="color: #999; font-size: 12px;">此消息来自网站邮箱订阅表单</p>
        `,
        text: `
          新的邮箱订阅
          
          订阅邮箱: ${subscribeEmail}
          订阅时间: ${new Date().toLocaleString('zh-CN')}
        `,
      };
    } else {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      );
    }

    // 发送邮件
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully',
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

