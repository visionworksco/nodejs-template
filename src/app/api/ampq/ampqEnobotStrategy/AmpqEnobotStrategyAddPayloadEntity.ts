/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { AmpqEnobotStrategyAddPayloadEntity } from './AmpqEnobotStrategyAddPayload';
import { AmpqEnobotStrategyEntity } from './AmpqEnobotStrategyEntity';

export class AmpqEnobotAddStrategyPayloadEntity implements AmpqEnobotStrategyAddPayloadEntity {
  @Expose()
  data: AmpqEnobotStrategyEntity[] = [];
}
