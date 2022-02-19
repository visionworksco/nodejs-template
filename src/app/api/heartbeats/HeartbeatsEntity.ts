/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { AmpqEnobotHbExchangeMessageModule } from '../ampq/ampqEnobotHbExchange/AmpqEnobotHbExchangeMessageModule';
import { Heartbeats } from './Heartbeats';

export class HeartbeatsEntity extends BaseApiEntity implements Heartbeats {
  @Expose()
  module: AmpqEnobotHbExchangeMessageModule | null = null;

  @Expose()
  server: string | null = null;

  @Expose()
  timeStamp: string | null = null;
}
