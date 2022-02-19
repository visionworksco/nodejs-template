import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { EnobotStrategyController } from './EnobotStrategyController';
import { EnobotStrategyEntity } from './EnobotStrategyEntity';

export class EnobotStrategyRoute extends BaseCrudRoute<EnobotStrategyEntity> {
  constructor(controller: EnobotStrategyController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/mule/enobotStrategies';
  }
}
