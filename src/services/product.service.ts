import { Product } from '../models/product.model';
import { ProductModel } from '../models/product.schema';

export class ProductService {
  async getAllProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }): Promise<Product[]> {
    let query: any = {};

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.minPrice || filters?.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    if (filters?.search) {
      query.$text = { $search: filters.search };
    }

    const products = await ProductModel.find(query).sort({ createdAt: -1 });
    return products.map(p => this.toProduct(p));
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    return product ? this.toProduct(product) : null;
  }

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const product = new ProductModel(productData);
    await product.save();
    return this.toProduct(product);
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return product ? this.toProduct(product) : null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }

  async searchProducts(searchTerm: string): Promise<Product[]> {
    const products = await ProductModel.find({
      $text: { $search: searchTerm }
    }).sort({ score: { $meta: 'textScore' } });
    
    return products.map(p => this.toProduct(p));
  }

  private toProduct(doc: any): Product {
    return {
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      price: doc.price,
      stock: doc.stock,
      category: doc.category,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}

