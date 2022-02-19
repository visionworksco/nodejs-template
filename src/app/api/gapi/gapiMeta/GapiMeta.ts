import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface GapiMeta extends ApiEntity {
  source: string | null;
  name: string | null;
  'bucket-size': number | null;
  table: string | null;
  description: string | null;
  unit: number | null;
  interval: number | null;
}
