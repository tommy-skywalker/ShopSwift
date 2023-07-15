import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import { Database } from './database/connection';
import { CacheService } from './services/cache.service';
import { apiLimiter } from './middleware/rateLimit.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import authRoutes from './routes/auth.routes';
import searchRoutes from './routes/search.routes';
import metricsRoutes from './routes/metrics.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const database = Database.getInstance();
const cacheService = new CacheService();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/metrics', metricsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'ShopSwift API is running',
    timestamp: new Date().toISOString(),
    database: database.getConnectionStatus() ? 'connected' : 'disconnected'
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Initialize services
const initializeServices = async (): Promise<void> => {
  try {
    await database.connect();
    await cacheService.connect();
  } catch (error) {
    console.error('Failed to initialize services:', error);
  }
};

// Start server
const startServer = async (): Promise<void> => {
  await initializeServices();
  
  app.listen(PORT, () => {
    console.log(`🚀 ShopSwift server is running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  });
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await database.disconnect();
  await cacheService.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await database.disconnect();
  await cacheService.disconnect();
  process.exit(0);
});

startServer().catch(console.error);

export default app;

