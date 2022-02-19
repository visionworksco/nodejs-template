import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { EnobotTimeSerieEntity } from '../../types/EnobotTimeSerieEntity';
import { GapiSearchController } from './GapiSearchController';

export class GapiSearchRoute extends BaseCrudRoute<EnobotTimeSerieEntity> {
  constructor(controller: GapiSearchController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/gapi/search';
  }
}
