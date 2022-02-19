import { ApiEntity } from '@visionworksco/expressjs-middleware';
import { GapiMeta } from './GapiMeta';

export interface GapiMetaSearch extends ApiEntity {
  api_url: string;
  keyspace: string;
  metas: GapiMeta[];
}
