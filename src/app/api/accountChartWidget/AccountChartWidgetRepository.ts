import {
  PageRequest,
  PageResult,
  ServerException,
  StatusCode,
  StatusCodeReason,
} from '@visionworksco/expressjs-middleware';
import { Pool } from 'pg';
import { BaseApiPsqlRepository } from '../../repository/postgresql/BaseApiPsqlRepository';
import { SqlTable } from '../../repository/postgresql/SqlTable';
import { AccountChartWidgetEntity } from './AccountChartWidgetEntity';

export class AccountChartWidgetRepository extends BaseApiPsqlRepository<AccountChartWidgetEntity> {
  constructor(psql: Pool) {
    super(psql, SqlTable.ACCOUNT_CHART_WIDGET, AccountChartWidgetEntity);
  }
  async findAll(pageRequest: PageRequest): Promise<PageResult<AccountChartWidgetEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<AccountChartWidgetEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: AccountChartWidgetEntity): Promise<AccountChartWidgetEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<AccountChartWidgetEntity>,
  ): Promise<AccountChartWidgetEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteByChartWidgetId(id: string): Promise<AccountChartWidgetEntity> {
    try {
      const response = await this.psql.query<AccountChartWidgetEntity>(
        `DELETE FROM ${this.tableName} WHERE "chartWidgetId" = $1 RETURNING *`,
        [id],
      );

      const rows = response.rows;
      if (rows.length === 0) {
        throw ServerException.create(
          StatusCode.INTERNAL_SERVER_ERROR,
          StatusCodeReason.INTERNAL_SERVER_ERROR,
        );
      }

      const row = rows[0];
      const rowUpdated = this.normalize(row) as AccountChartWidgetEntity;
      return Promise.resolve(rowUpdated);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
