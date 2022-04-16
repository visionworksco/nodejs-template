import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface Config extends ApiEntity {
  payPalClientId?: string;
}
