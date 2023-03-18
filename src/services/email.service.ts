import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@shopswift.com',
        to,
        subject,
        html
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendOrderConfirmation(to: string, orderId: string, total: number): Promise<void> {
    const html = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      <p>We'll send you another email when your order ships.</p>
    `;

    await this.sendEmail(to, `Order Confirmation - ${orderId}`, html);
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = `
      <h2>Welcome to ShopSwift, ${name}!</h2>
      <p>Thank you for joining us. We're excited to have you on board.</p>
      <p>Start shopping now and enjoy our amazing products!</p>
    `;

    await this.sendEmail(to, 'Welcome to ShopSwift', html);
  }
}

