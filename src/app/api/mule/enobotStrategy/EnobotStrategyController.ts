import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EnobotStrategyEntity } from './EnobotStrategyEntity';
import { EnobotStrategyService } from './EnobotStrategyService';

export class EnobotStrategyController extends BaseApiCrudController<EnobotStrategyEntity> {
  constructor(service: EnobotStrategyService) {
    super(service, EnobotStrategyEntity);
  }
}
