export class CurrencyUtil {
  static format(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  static convert(amount: number, fromCurrency: string, toCurrency: string): number {
    // Simplified conversion - in production, use real exchange rates
    const exchangeRates: Record<string, number> = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110
    };

    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;

    return (amount / fromRate) * toRate;
  }

  static calculateTax(amount: number, taxRate: number = 0.1): number {
    return amount * taxRate;
  }

  static calculateDiscount(amount: number, discountPercent: number): number {
    return amount * (discountPercent / 100);
  }
}

