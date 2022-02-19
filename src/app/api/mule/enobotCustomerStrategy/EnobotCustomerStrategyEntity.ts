/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EnobotDeleted } from '../../../type/EnobotDeleted';
import { EnobotSide } from '../../../type/EnobotSide';
import { EnobotStrategyDataEntity } from '../enobotStrategyData/EnobotStrategyDataEntity';
import { EnobotCustomerStrategy } from './EnobotCustomerStrategy';

export class EnobotCustomerStrategyEntity extends BaseApiEntity implements EnobotCustomerStrategy {
  @Expose()
  customer: string | null = null;

  @Expose()
  side: EnobotSide | null = null;

  @Expose()
  dlvryAreaId: string | null = null;

  @Expose()
  strategyID: string | null = null;

  @Expose()
  strategy: EnobotStrategyDataEntity | null = null;

  @Expose()
  name: string | null = null;

  @Expose()
  strategyNote: string | null = null;

  @Expose()
  deleted: EnobotDeleted = 0;

  @Expose()
  author: string | null = null;

  @Expose()
  saveDate: string | null = null;

  @Expose()
  MappingNote: string | null = null;
}
