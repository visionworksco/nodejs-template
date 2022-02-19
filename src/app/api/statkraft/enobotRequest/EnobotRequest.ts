import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface EnobotRequest extends ApiEntity {
  ts: string | null;
  customer: string | null;
  requestid: string | null;
  grid: string | null;
  volume: number | null;
  saved: string | null;
}
