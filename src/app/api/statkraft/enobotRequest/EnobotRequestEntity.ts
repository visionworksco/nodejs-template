/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EnobotRequest } from './EnobotRequest';

export class EnobotRequestEntity extends BaseApiEntity implements EnobotRequest {
  @Expose()
  ts: string | null = null;

  @Expose()
  customer: string | null = null;

  @Expose()
  requestid: string | null = null;

  @Expose()
  grid: string | null = null;

  @Expose()
  volume: number | null = null;

  @Expose()
  saved: string | null = null;
}
