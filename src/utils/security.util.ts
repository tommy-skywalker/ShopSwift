import crypto from 'crypto';

export class SecurityUtil {
  static generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  static hashData(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  static generateApiKey(): string {
    return `sk_${this.generateToken(24)}`;
  }

  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  }

  static validateApiKey(apiKey: string): boolean {
    return /^sk_[a-f0-9]{48}$/.test(apiKey);
  }
}

