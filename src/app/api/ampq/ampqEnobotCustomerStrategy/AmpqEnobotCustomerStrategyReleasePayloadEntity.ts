/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { AmpqEnobotCustomerStrategyPayloadData } from './AmpqEnobotCustomerStrategyPayloadData';
import { AmpqEnobotCustomerStrategyReleasePayload } from './AmpqEnobotCustomerStrategyReleasePayload';

export class AmpqEnobotCustomerStrategyReleasePayloadEntity
  implements AmpqEnobotCustomerStrategyReleasePayload
{
  @Expose()
  data: AmpqEnobotCustomerStrategyPayloadData[] = [];
}
