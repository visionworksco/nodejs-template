import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { EnobotCustomerStrategyController } from './EnobotCustomerStrategyController';
import { EnobotCustomerStrategyEntity } from './EnobotCustomerStrategyEntity';

export class EnobotCustomerStrategyRoute extends BaseCrudRoute<EnobotCustomerStrategyEntity> {
  constructor(controller: EnobotCustomerStrategyController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/mule/enobotCustomerStrategies';
  }
}
