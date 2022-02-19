import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
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
