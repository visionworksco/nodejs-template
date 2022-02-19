/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { EnobotTimeSerie } from './EnobotTimeSerie';

export class EnobotTimeSerieEntity extends BaseApiEntity implements EnobotTimeSerie {
  @Expose()
  ts: string | null = null;

  @Expose()
  value: number | null = null;

  @Expose()
  ts2: string | null = null;

  @Expose()
  value2: number | null = null;
}
