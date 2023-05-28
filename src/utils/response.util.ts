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

  static paginated(
    res: Response,
    data: any[],
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }
  ): void {
    res.status(200).json({
      success: true,
      data,
      pagination
    });
  }
}
