import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface EpexObContract extends ApiEntity {
  seriesname: string | null;
  longname: string | null;
  prod: string | null;
  grid: string | null;
  dlvryend: string | null;
  contractid: number | null;
  ask: number | null;
  dlvrystart: string | null;
  bid: number | null;
  ts: string | null;
}
