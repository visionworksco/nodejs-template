import { CrudService } from '@visionworksco/nodejs-middleware';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { ConfigEntity } from './ConfigEntity';

export class ConfigController extends BaseApiCrudController<ConfigEntity> {
  constructor(service: CrudService<ConfigEntity>) {
    super(service, ConfigEntity);
  }
}
