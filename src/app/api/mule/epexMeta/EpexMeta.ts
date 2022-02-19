import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface EpexMeta extends ApiEntity {
  seriesname: string | null;
  table: string | null;
}
