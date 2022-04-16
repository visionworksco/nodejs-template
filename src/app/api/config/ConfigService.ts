import { Repository } from '@visionworksco/nodejs-middleware';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { ConfigEntity } from './ConfigEntity';

export class ConfigService extends BaseApiCrudService<ConfigEntity> {
  constructor(repository: Repository<ConfigEntity>) {
    super(repository);
  }
}
