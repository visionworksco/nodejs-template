import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface Info extends ApiEntity {
  name: string;
  version: string;
}
