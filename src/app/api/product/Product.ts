import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface Product extends ApiEntity {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  user?: string; // reference: Product MANY_TO_ONE User
  reviews?: string[]; // reference: Review MANY_TO_ONE Product
}
