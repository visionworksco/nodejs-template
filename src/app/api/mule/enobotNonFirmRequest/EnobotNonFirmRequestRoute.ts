import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { EnobotNonFirmRequestController } from './EnobotNonFirmRequestController';
import { EnobotNonFirmRequestEntity } from './EnobotNonFirmRequestEntity';

export class EnobotNonFirmRequestRoute extends BaseCrudRoute<EnobotNonFirmRequestEntity> {
  constructor(controller: EnobotNonFirmRequestController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/mule/enobotRequests';
  }
}
