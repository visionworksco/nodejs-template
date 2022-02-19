/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { AmpqEnobotOrder } from './AmpqEnobotOrder';

export class AmpqEnobotOrderEntity extends BaseApiEntity implements AmpqEnobotOrder {
  @Expose()
  customer = '';

  @Expose()
  requestID = '';

  @Expose()
  grid = '';

  @Expose()
  volume = 0;

  @Expose()
  priceCent: number | null = null;

  @Expose()
  duration = 0;

  @Expose()
  localDateTime = '';

  @Expose()
  strategy: string | null = null;
}
