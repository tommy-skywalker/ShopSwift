import { Request, Response } from 'express';
import { Product } from '../models/product.model';

export class ProductController {
  private products: Product[] = [];

  getAllProducts = (req: Request, res: Response): void => {
    res.status(200).json({
      success: true,
      data: this.products,
      count: this.products.length
    });
  };

  getProductById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const product = this.products.find(p => p.id === id);

    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    res.status(200).json({ success: true, data: product });
  };

  createProduct = (req: Request, res: Response): void => {
    const { name, description, price, stock, category } = req.body;

    if (!name || !price) {
      res.status(400).json({ success: false, error: 'Name and price are required' });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description: description || '',
      price: parseFloat(price),
      stock: stock ? parseInt(stock) : 0,
      category: category || 'general',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.products.push(newProduct);
    res.status(201).json({ success: true, data: newProduct });
  };

  updateProduct = (req: Request, res: Response): void => {
    const { id } = req.params;
    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    const updatedProduct = {
      ...this.products[productIndex],
      ...req.body,
      id,
      updatedAt: new Date()
    };

    this.products[productIndex] = updatedProduct;
    res.status(200).json({ success: true, data: updatedProduct });
  };

  deleteProduct = (req: Request, res: Response): void => {
    const { id } = req.params;
    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    this.products.splice(productIndex, 1);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  };
}

