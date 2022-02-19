/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EnobotStrategyDataEntity } from '../enobotStrategyData/EnobotStrategyDataEntity';
import { EnobotStrategy } from './EnobotStrategy';

export class EnobotStrategyEntity extends BaseApiEntity implements EnobotStrategy {
  @Expose()
  strategy: string | EnobotStrategyDataEntity | null = null;

  @Expose()
  name: string | null = null;

  @Expose()
  author: string | null = null;

  @Expose()
  saveDate: string | number | null = null;

  @Expose()
  note: string | null = null;
}
