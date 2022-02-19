import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { SettingsEntity } from './SettingsEntity';
import { SettingsRepository } from './SettingsRepository';

const SettingsDefault = require('./data/SettingsDefault.json');

export class SettingsService extends BaseApiCrudService<SettingsEntity> {
  constructor(repository: SettingsRepository) {
    super(repository);
  }

  async findDefault(): Promise<SettingsEntity> {
    try {
      const entity: SettingsEntity = SettingsDefault;
      return Promise.resolve(this.normalize(entity) as SettingsEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
