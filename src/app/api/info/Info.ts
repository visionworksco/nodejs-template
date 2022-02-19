import { ApiEntity } from '@visionworksco/expressjs-middleware';

export interface Info extends ApiEntity {
  name: string;
  version: string;
}
