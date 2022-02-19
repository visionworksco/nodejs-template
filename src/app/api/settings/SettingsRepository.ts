import { PageRequest, PageResult, ServerException } from '@visionworksco/expressjs-middleware';
import { Pool } from 'pg';
import { BaseApiPsqlRepository } from '../../repository/postgresql/BaseApiPsqlRepository';
import { SqlTable } from '../../repository/postgresql/SqlTable';
import { SettingsEntity } from './SettingsEntity';

export class SettingsRepository extends BaseApiPsqlRepository<SettingsEntity> {
  constructor(psql: Pool) {
    super(psql, SqlTable.SETTINGS, SettingsEntity);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<SettingsEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: SettingsEntity): Promise<SettingsEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: SettingsEntity): Promise<SettingsEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<SettingsEntity> {
    throw ServerException.NotImplementedException();
  }
}
