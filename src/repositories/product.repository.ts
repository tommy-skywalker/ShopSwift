import { Product } from '../models/product.model';
import { ProductModel } from '../models/product.schema';

export class ProductRepository {
  async findAll(filters?: any): Promise<Product[]> {
    const products = await ProductModel.find(filters || {});
    return products.map(p => this.toProduct(p));
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    return product ? this.toProduct(product) : null;
  }

  async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const product = new ProductModel(productData);
    await product.save();
    return this.toProduct(product);
  }

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return product ? this.toProduct(product) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByCategory(category: string): Promise<Product[]> {
    const products = await ProductModel.find({ category });
    return products.map(p => this.toProduct(p));
  }

  async search(searchTerm: string): Promise<Product[]> {
    const products = await ProductModel.find({
      $text: { $search: searchTerm }
    });
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

