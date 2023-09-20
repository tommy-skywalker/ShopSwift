export const appConfig = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'v1',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }
};

