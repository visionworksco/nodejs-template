import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface AccountChartWidget extends ApiEntity {
  accountId: number;
  chartWidgetId: number;
}
