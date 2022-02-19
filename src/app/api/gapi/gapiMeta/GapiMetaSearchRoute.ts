import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { GapiMetaEntity } from './GapiMetaEntity';
import { GapiMetaSearchController } from './GapiMetaSearchController';

export class GapiMetaSearchRoute extends BaseCrudRoute<GapiMetaEntity> {
  constructor(controller: GapiMetaSearchController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/gapi/search/meta';
  }
}
