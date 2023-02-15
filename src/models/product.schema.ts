import mongoose, { Schema, Document } from 'mongoose';
import { Product } from './product.model';

export interface ProductDocument extends Product, Document {}

const ProductSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    default: 'general',
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, price: 1 });

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);

