export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

export class Logger {
  private static formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data })
    };
    return JSON.stringify(logEntry);
  }

  static error(message: string, error?: any): void {
    console.error(this.formatMessage(LogLevel.ERROR, message, error));
  }

  static warn(message: string, data?: any): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, data));
  }

  static info(message: string, data?: any): void {
    console.info(this.formatMessage(LogLevel.INFO, message, data));
  }

  static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, data));
    }
  }
}

