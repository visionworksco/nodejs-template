/* istanbul ignore file */

import { Expose, Type } from 'class-transformer';
import { EnobotLimitType } from '../../types/EnobotLimitType';
import { AmpqEnobotOrder } from './AmpqEnobotOrder';
import { AmpqEnobotOrderAddPayload } from './AmpqEnobotOrderAddPayload';
import { AmpqEnobotOrderLimit } from './AmpqEnobotOrderLimit';
import { AmpqEnobotOrderLimitInfo } from './AmpqEnobotOrderLimitInfo';

class AmpqEnobotOrderEntity implements AmpqEnobotOrder {
  @Expose()
  id = '';

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
  strategy: string | null = '';
}

class AmpqEnobotOrderLimitInfoEntity implements AmpqEnobotOrderLimitInfo {
  @Expose()
  ts = '';

  @Expose()
  duration = 0;

  @Expose()
  grid = '';

  @Expose()
  minBuyPrice?: number;

  @Expose()
  maxBuyPrice?: number;
}

class AmpqEnobotOrderLimitEntity implements AmpqEnobotOrderLimit {
  @Expose()
  id: string | null = null;

  @Expose()
  type: EnobotLimitType = 'MinPrice';

  @Expose()
  @Type(() => AmpqEnobotOrderLimitInfoEntity)
  info: AmpqEnobotOrderLimitInfoEntity | null = null;

  @Expose()
  author = '';

  @Expose()
  savedDate = 0;

  @Expose()
  expirationDate = 0;

  @Expose()
  activationDate = '';

  @Expose()
  activationUser = '';

  @Expose()
  orders: AmpqEnobotOrder[] = [];

  @Expose()
  deleted = 0;
}

export class AmpqEnobotOrderAddPayloadEntity implements AmpqEnobotOrderAddPayload {
  @Expose()
  @Type(() => AmpqEnobotOrderEntity)
  orders: AmpqEnobotOrderEntity[] | null = null;

  @Expose()
  @Type(() => AmpqEnobotOrderLimitEntity)
  limit: AmpqEnobotOrderLimitEntity[] | null = null;
}
