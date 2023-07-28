import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export interface RequestWithId extends Request {
  id?: string;
}

export const requestIdMiddleware = (
  req: RequestWithId,
  res: Response,
  next: NextFunction
): void => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
};

