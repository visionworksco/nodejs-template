import { ApiEntity } from '@visionworksco/expressjs-middleware';

export interface EpexMeta extends ApiEntity {
  seriesname: string | null;
  table: string | null;
}
