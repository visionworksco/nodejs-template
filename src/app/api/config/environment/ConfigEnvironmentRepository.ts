import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { Config } from '../../../config/Config';
import { ConfigEntity } from '../ConfigEntity';

export class ConfigEnvironmentRepository implements Repository<ConfigEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<ConfigEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<ConfigEntity> {
    try {
      let entity = {};

      const key = 'payPalClientId';
      if (id === key) {
        entity = {
          ...entity,
          [key]: Config.get('PAYPAL_CLIENT_ID'),
        };
      }

      const configEntity = this.normalize(entity);
      return Promise.resolve(configEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(query: Object): Promise<ConfigEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: ConfigEntity): Promise<ConfigEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Object): Promise<ConfigEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<ConfigEntity> {
    throw ServerException.NotImplementedException();
  }

  private normalize(entity: Object | null): ConfigEntity {
    const resultNotExcluded = ClassTransformer.fromPlain(ConfigEntity, entity, false);
    return ClassTransformer.fromPlain(ConfigEntity, resultNotExcluded, true);
  }
}
