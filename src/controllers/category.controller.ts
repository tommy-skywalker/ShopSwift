import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class CategoryController {
  getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await productService.getAllProducts();
      const categories = [...new Set(products.map(p => p.category))];
      
      res.status(200).json({
        success: true,
        data: categories,
        count: categories.length
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch categories'
      });
    }
  };

  getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.params;
      const products = await productService.getAllProducts({ category });
      
      res.status(200).json({
        success: true,
        data: products,
        count: products.length
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch products'
      });
    }
  };
}

