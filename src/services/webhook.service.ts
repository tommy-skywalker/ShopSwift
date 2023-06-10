import axios from 'axios';

export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: Date;
}

export class WebhookService {
  async sendWebhook(url: string, payload: WebhookPayload): Promise<boolean> {
    try {
      await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'ShopSwift-Webhook/1.0'
        },
        timeout: 5000
      });
      return true;
    } catch (error) {
      console.error(`Webhook failed for ${url}:`, error);
      return false;
    }
  }

  async sendOrderWebhook(orderId: string, orderData: any): Promise<void> {
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) return;

    const payload: WebhookPayload = {
      event: 'order.created',
      data: {
        orderId,
        ...orderData
      },
      timestamp: new Date()
    };

    await this.sendWebhook(webhookUrl, payload);
  }
}

