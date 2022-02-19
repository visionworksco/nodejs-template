import { ApiEntity } from '@visionworksco/expressjs-middleware';

export interface AccountChartWidget extends ApiEntity {
  accountId: number;
  chartWidgetId: number;
}
