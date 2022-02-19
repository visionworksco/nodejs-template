import { PageRequest, PageResult, ServerException } from '@visionworksco/nodejs-middleware';
import { Pool } from 'pg';
import { BaseApiPsqlRepository } from '../../repository/postgresql/BaseApiPsqlRepository';
import { SqlTable } from '../../repository/postgresql/SqlTable';
import { AccountEntity } from './AccountEntity';

export class AccountRepository extends BaseApiPsqlRepository<AccountEntity> {
  constructor(psql: Pool) {
    super(psql, SqlTable.ACCOUNT, AccountEntity);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<AccountEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<AccountEntity> {
    throw ServerException.NotImplementedException();
  }

  async findByEmail(email: string): Promise<AccountEntity> {
    try {
      const query: Partial<AccountEntity> = { email };
      const entity = await this.findOne(query);
      return Promise.resolve(entity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteById(id: string): Promise<AccountEntity> {
    throw ServerException.NotImplementedException();
  }
}
