import { Repository } from '@visionworksco/nodejs-middleware';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { ProductEntity } from './ProductEntity';

export class ProductService extends BaseApiCrudService<ProductEntity> {
  constructor(repository: Repository<ProductEntity>) {
    super(repository);
  }
}
