import { ClassTransformer } from '../../class/ClassTransformer';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import SettingsDefault from './data/SettingsDefault.json';
import { SettingsEntity } from './SettingsEntity';
import { SettingsRepository } from './SettingsRepository';

export class SettingsService extends BaseApiCrudService<SettingsEntity> {
  constructor(repository: SettingsRepository) {
    super(repository);
  }

  async findDefault(): Promise<SettingsEntity> {
    try {
      const entity = ClassTransformer.fromPlain(SettingsEntity, SettingsDefault);
      return Promise.resolve(this.normalize(entity) as SettingsEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
