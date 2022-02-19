import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface ChartWidget extends ApiEntity {
  name: string;
  data: string;
}
