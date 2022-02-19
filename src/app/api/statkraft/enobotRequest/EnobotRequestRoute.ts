import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { EnobotRequestController } from './EnobotRequestController';
import { EnobotRequestEntity } from './EnobotRequestEntity';

export class EnobotRequestRoute extends BaseCrudRoute<EnobotRequestEntity> {
  constructor(controller: EnobotRequestController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/statkraft/enobotRequests';
  }
}
