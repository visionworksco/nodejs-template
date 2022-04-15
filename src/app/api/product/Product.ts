import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface Product extends ApiEntity {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
}
