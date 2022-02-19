import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { HeartbeatsController } from './HeartbeatsController';
import { HeartbeatsEntity } from './HeartbeatsEntity';

export class HeartbeatsRoute extends BaseCrudRoute<HeartbeatsEntity> {
  constructor(controller: HeartbeatsController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/heartbeats';
  }
}
