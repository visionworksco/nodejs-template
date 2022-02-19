/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { AccountChartWidget } from './AccountChartWidget';

export class AccountChartWidgetEntity extends BaseApiEntity implements AccountChartWidget {
  @Expose()
  @IsNumber()
  accountId;

  @Expose()
  @IsNumber()
  chartWidgetId;

  constructor(accountId: number, chartWidgetId: number) {
    super();

    this.accountId = accountId;
    this.chartWidgetId = chartWidgetId;
  }
}
