import { Schema } from 'mongoose';

export const MongoDbEntity = new Schema({
  createdAt: String,
  createdBy: String,
  updatedAt: String,
  updatedBy: String,
});
