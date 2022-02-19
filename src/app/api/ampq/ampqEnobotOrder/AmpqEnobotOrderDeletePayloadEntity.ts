/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { AmpqEnobotOrderDeletePayload } from './AmpqEnobotOrderDeletePayload';

export class AmpqEnobotOrderDeletePayloadEntity implements AmpqEnobotOrderDeletePayload {
  @Expose()
  orderIds: string[] = [];

  @Expose()
  user = '';
}
