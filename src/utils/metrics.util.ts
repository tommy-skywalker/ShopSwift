export class Metrics {
  private static requestCount = 0;
  private static errorCount = 0;
  private static responseTimes: number[] = [];

  static incrementRequest(): void {
    this.requestCount++;
  }

  static incrementError(): void {
    this.errorCount++;
  }

  static recordResponseTime(time: number): void {
    this.responseTimes.push(time);
    // Keep only last 1000 response times
    if (this.responseTimes.length > 1000) {
      this.responseTimes.shift();
    }
  }

  static getStats(): {
    totalRequests: number;
    totalErrors: number;
    averageResponseTime: number;
    errorRate: number;
  } {
    const avgResponseTime = this.responseTimes.length > 0
      ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
      : 0;

    const errorRate = this.requestCount > 0
      ? (this.errorCount / this.requestCount) * 100
      : 0;

    return {
      totalRequests: this.requestCount,
      totalErrors: this.errorCount,
      averageResponseTime: Math.round(avgResponseTime * 100) / 100,
      errorRate: Math.round(errorRate * 100) / 100
    };
  }

  static reset(): void {
    this.requestCount = 0;
    this.errorCount = 0;
    this.responseTimes = [];
  }
}

