/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { EnobotStrategyData } from './EnobotStrategyData';

export class EnobotStrategyDataEntity implements EnobotStrategyData {
  @Expose()
  pr: number[] | null = null;

  @Expose()
  steps: number | null = null;

  @Expose()
  enoEnd: number | null = null;

  @Expose()
  volumes: number[] | null = null;

  @Expose()
  timeSteps: number[] | null = null;

  @Expose()
  enoStart: number | null = null;
}
