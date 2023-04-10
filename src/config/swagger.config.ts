import swaggerJsdoc from 'swagger-jsdoc';
import { appConfig } from './app.config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShopSwift API',
      version: '1.0.0',
      description: 'A fast and efficient e-commerce backend API',
      contact: {
        name: 'API Support',
        email: 'support@shopswift.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${appConfig.port}`,
        description: 'Development server'
      },
      {
        url: 'https://api.shopswift.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);

