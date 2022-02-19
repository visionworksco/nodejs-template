import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EnobotCustomerStrategyEntity } from './EnobotCustomerStrategyEntity';
import { EnobotCustomerStrategyService } from './EnobotCustomerStrategyService';

export class EnobotCustomerStrategyController extends BaseApiCrudController<EnobotCustomerStrategyEntity> {
  constructor(service: EnobotCustomerStrategyService) {
    super(service, EnobotCustomerStrategyEntity);
  }
}
