import { ApiEntity } from '@visionworksco/expressjs-middleware';

export interface EpexAvg extends ApiEntity {
  longname: string | null;
  seriesname: string | null;
  grid: string | null;
  price: number | null;
  ts: string | null;
}
