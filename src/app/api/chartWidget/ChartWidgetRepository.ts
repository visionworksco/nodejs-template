import {
  PageRequest,
  PageResult,
  Paginator,
  PsqlUtils,
  ServerException,
  StatusCode,
  StatusCodeReason,
} from '@visionworksco/nodejs-middleware';
import { Pool } from 'pg';
import { BaseApiPsqlRepository } from '../../repository/postgresql/BaseApiPsqlRepository';
import { SqlTable } from '../../repository/postgresql/SqlTable';
import { ChartWidgetAllFieldsEntity } from './ChartWidgetAllFieldsEntity';
import { ChartWidgetEntity } from './ChartWidgetEntity';

export class ChartWidgetRepository extends BaseApiPsqlRepository<ChartWidgetEntity> {
  constructor(psql: Pool) {
    super(psql, SqlTable.CHART_WIDGET, ChartWidgetEntity);
  }

  async findOne(query: ChartWidgetEntity): Promise<ChartWidgetEntity> {
    throw ServerException.NotImplementedException();
  }

  async findAllByAccountId(
    id: string,
    pageRequest: PageRequest,
  ): Promise<PageResult<ChartWidgetEntity>> {
    try {
      const { query, sort, page, pageLimit } = pageRequest;

      const currentTable = this.tableName;
      const keysFromCurrentTable = PsqlUtils.getKeysFromTable(
        new ChartWidgetAllFieldsEntity(),
        currentTable,
        false,
      );
      const refTable = 'accountChartWidget';

      const sqlQueryForCount = `
      select count(*) from ${currentTable} 
      inner join ${refTable} on ${currentTable}."id" = ${refTable}."chartWidgetId"
      where ${refTable}."accountId" = $1
      `;

      const responseCount = await this.psql.query<{ count: string }>(sqlQueryForCount, [id]);
      const rowsCount = responseCount.rows;
      if (rowsCount.length === 0) {
        throw ServerException.create(
          StatusCode.INTERNAL_SERVER_ERROR,
          StatusCodeReason.INTERNAL_SERVER_ERROR,
        );
      }
      const rowCount = rowsCount[0];
      const collectionSize = Number(rowCount.count);

      const paginator = new Paginator(page, pageLimit, collectionSize);

      let sqlQuery = `
      select ${keysFromCurrentTable} from ${currentTable} 
      inner join ${refTable} on ${currentTable}."id" = ${refTable}."chartWidgetId"
      where ${refTable}."accountId" = $1
      `;
      // TODO: add sort, order
      // sqlQuery += sort ? ` order by "${sort}"` : ``;
      sqlQuery += ` order by ${currentTable}."created_at" asc`;
      sqlQuery += ` limit ${paginator.pageSizeLimit} OFFSET ${paginator.getSkipCount()}`;
      const response = await this.psql.query<ChartWidgetEntity>(sqlQuery, [id]);

      const rows = response.rows;

      paginator.pageSize = rows.length;

      const rowsUpdated = this.normalize(rows) as ChartWidgetEntity[];
      const result = new PageResult(rowsUpdated, paginator);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
