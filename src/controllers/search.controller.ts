import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class SearchController {
  searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { q, category, minPrice, maxPrice } = req.query;

      const filters: any = {};
      
      if (q && typeof q === 'string') {
        filters.search = q;
      }
      
      if (category && typeof category === 'string') {
        filters.category = category;
      }
      
      if (minPrice) {
        filters.minPrice = parseFloat(minPrice as string);
      }
      
      if (maxPrice) {
        filters.maxPrice = parseFloat(maxPrice as string);
      }

      const products = await productService.getAllProducts(filters);

      res.status(200).json({
        success: true,
        data: products,
        count: products.length,
        filters
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Search failed'
      });
    }
  };
}

