import { Request, Response, NextFunction } from 'express';

export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
  const { name, price } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({ success: false, error: 'Product name is required' });
    return;
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    res.status(400).json({ success: false, error: 'Valid price is required' });
    return;
  }

  next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({ success: false, error: 'User name is required' });
    return;
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ success: false, error: 'Valid email is required' });
    return;
  }

  next();
};

