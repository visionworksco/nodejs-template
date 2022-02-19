import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { InfoEntity } from './InfoEntity';
import { InfoRepository } from './InfoRepository';
const packageJson = require('../../../../package.json');

export class InfoService extends BaseApiCrudService<InfoEntity> {
  constructor(repository: InfoRepository) {
    super(repository);
  }

  async findById(id: string): Promise<InfoEntity> {
    try {
      const { name, version } = packageJson;
      const info = { name, version } as InfoEntity;

      return Promise.resolve(this.normalize(info) as InfoEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
