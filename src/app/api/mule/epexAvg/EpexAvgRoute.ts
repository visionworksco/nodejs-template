import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { EpexAvgController } from './EpexAvgController';
import { EpexAvgEntity } from './EpexAvgEntity';

export class EpexAvgRoute extends BaseCrudRoute<EpexAvgEntity> {
  constructor(controller: EpexAvgController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/mule/epexAvg';
  }
}
