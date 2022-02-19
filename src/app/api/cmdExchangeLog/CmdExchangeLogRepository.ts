import { ServerException } from '@visionworksco/nodejs-middleware';
import { Pool } from 'pg';
import { BaseApiPsqlRepository } from '../../repository/postgresql/BaseApiPsqlRepository';
import { SqlTable } from '../../repository/postgresql/SqlTable';
import { CmdExchangeLogEntity } from './CmdExchangeLogEntity';

export class CmdExchangeLogRepository extends BaseApiPsqlRepository<CmdExchangeLogEntity> {
  constructor(psql: Pool) {
    super(psql, SqlTable.CMD_ECHANGE_LOG, CmdExchangeLogEntity);
  }

  async findById(id: string): Promise<CmdExchangeLogEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: CmdExchangeLogEntity): Promise<CmdExchangeLogEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<CmdExchangeLogEntity>,
  ): Promise<CmdExchangeLogEntity> {
    throw ServerException.NotImplementedException();
  }
}
