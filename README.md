# ShopSwift

A fast and efficient e-commerce backend API built with TypeScript and Express.

## Features

- RESTful API for products, users, and orders
- TypeScript for type safety
- Express.js framework
- Security middleware (Helmet, CORS)
- Request logging (Morgan)
- Clean architecture with separation of concerns

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

### Health Check
- `GET /health` - Check API status

## Project Structure

```
src/
├── controllers/    # Request handlers
├── models/         # TypeScript interfaces
├── routes/         # Route definitions
└── index.ts        # Application entry point
```

## Development

### Code Style
- Follow TypeScript best practices
- Use ESLint for code quality
- Run `npm run lint:fix` before committing

## License

MIT

