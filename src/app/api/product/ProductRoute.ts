import { BaseCrudController, BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { ProductEntity } from './ProductEntity';

export class ProductRoute extends BaseCrudRoute<ProductEntity> {
  constructor(controller: BaseCrudController<ProductEntity>) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/products';
  }
}
