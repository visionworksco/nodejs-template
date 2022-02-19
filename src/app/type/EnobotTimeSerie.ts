import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface EnobotTimeSerie extends ApiEntity {
  ts: string | null;
  value: number | null;
  ts2?: string | null;
  value2?: number | null;
}
