import { CrudService } from '@visionworksco/nodejs-middleware';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { ProductEntity } from './ProductEntity';

export class ProductController extends BaseApiCrudController<ProductEntity> {
  constructor(service: CrudService<ProductEntity>) {
    super(service, ProductEntity);
  }
}
