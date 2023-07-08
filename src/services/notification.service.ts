import { EmailService } from './email.service';
import { WebhookService } from './webhook.service';

export class NotificationService {
  private emailService: EmailService;
  private webhookService: WebhookService;

  constructor() {
    this.emailService = new EmailService();
    this.webhookService = new WebhookService();
  }

  async notifyOrderCreated(orderId: string, userEmail: string, orderData: any): Promise<void> {
    // Send email notification
    try {
      await this.emailService.sendOrderConfirmation(
        userEmail,
        orderId,
        orderData.total
      );
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
    }

    // Send webhook notification
    try {
      await this.webhookService.sendOrderWebhook(orderId, orderData);
    } catch (error) {
      console.error('Failed to send order webhook:', error);
    }
  }

  async notifyUserRegistered(userEmail: string, userName: string): Promise<void> {
    try {
      await this.emailService.sendWelcomeEmail(userEmail, userName);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }
}

