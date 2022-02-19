import { EnobotCustomerStrategyEntity } from '../../mule/enobotCustomerStrategy/EnobotCustomerStrategyEntity';
import { AmpqEnobotCustomerStrategy } from './AmpqEnobotCustomerStrategy';

export class AmpqEnobotCustomerStrategyEntity
  extends EnobotCustomerStrategyEntity
  implements AmpqEnobotCustomerStrategy {}
