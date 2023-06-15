import { Router, Request, Response } from 'express';
import { Metrics } from '../utils/metrics.util';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get(
  '/',
  authenticate,
  authorize('admin'),
  (req: Request, res: Response): void => {
    const stats = Metrics.getStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  }
);

export default router;

