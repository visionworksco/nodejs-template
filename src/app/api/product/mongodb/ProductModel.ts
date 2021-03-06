import mongoose from 'mongoose';
import { MongoDbEntity } from '../../../repository/mongodb/MongoDbEntity';

const { model, Schema } = mongoose;

export const ProductSchema = new Schema(
  {
    ...MongoDbEntity.obj,
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0.0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0.0 },
    numReviews: { type: Number, required: true, default: 0 },
    user: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
    reviews: [{ type: Schema.Types.ObjectId, required: false, ref: 'Review' }],
  },
  { timestamps: true },
);

export const ProductModel = model('Product', ProductSchema);
