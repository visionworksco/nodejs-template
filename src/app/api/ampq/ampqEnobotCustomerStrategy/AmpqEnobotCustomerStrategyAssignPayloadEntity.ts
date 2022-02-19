/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { AmpqEnobotCustomerStrategyEditPayload } from './AmpqEnobotCustomerStrategyEditPayload';
import { AmpqEnobotCustomerStrategyPayloadData } from './AmpqEnobotCustomerStrategyPayloadData';

export class AmpqEnobotCustomerStrategyAssignPayloadEntity
  implements AmpqEnobotCustomerStrategyEditPayload
{
  @Expose()
  data: AmpqEnobotCustomerStrategyPayloadData[] = [];
}
