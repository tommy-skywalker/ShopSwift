import { Request, Response, NextFunction } from 'express';
import { SecurityUtil } from '../utils/security.util';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    res.status(401).json({
      success: false,
      error: 'API key is required'
    });
    return;
  }

  if (!SecurityUtil.validateApiKey(apiKey)) {
    res.status(401).json({
      success: false,
      error: 'Invalid API key'
    });
    return;
  }

  next();
};

