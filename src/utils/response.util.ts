import { Response } from 'express';

export class ResponseUtil {
  static success(res: Response, data: any, statusCode: number = 200): void {
    res.status(statusCode).json({
      success: true,
      data
    });
  }

  static error(res: Response, message: string, statusCode: number = 400): void {
    res.status(statusCode).json({
      success: false,
      error: message
    });
  }
}

