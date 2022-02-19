import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { EpexMetaController } from './EpexMetaController';
import { EpexMetaEntity } from './EpexMetaEntity';

export class EpexMetaRoute extends BaseCrudRoute<EpexMetaEntity> {
  constructor(controller: EpexMetaController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/mule/epexMeta';
  }
}
