import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { InfoController } from './InfoController';
import { InfoEntity } from './InfoEntity';

export class InfoRoute extends BaseCrudRoute<InfoEntity> {
  constructor(controller: InfoController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/info';
  }
}