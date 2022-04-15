import { Role } from '@visionworksco/nodejs-middleware';
import { ProductPermission } from '../api/product/ProductPermission';

export interface ApiRole extends Role {
  product: ProductPermission;
}
