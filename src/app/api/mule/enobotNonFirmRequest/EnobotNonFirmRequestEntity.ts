/* istanbul ignore file */

import { Expose, Transform, Type } from 'class-transformer';
import { nanoid } from 'nanoid';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EnobotDeleted } from '../../types/EnobotDeleted';
import { EnobotLimitType } from '../../types/EnobotLimitType';
import { EnobotNonFirmRequest } from './EnobotNonFirmRequest';
import { EnobotNonFirmRequestInfo } from './EnobotNonFirmRequestInfo';
import { EnobotNonFirmRequestOrder } from './EnobotNonFirmRequestOrder';

export class EnobotNonFirmRequestInfoEntity implements EnobotNonFirmRequestInfo {
  @Expose()
  ts: string | null = null;

  @Expose()
  duration: number | null = null;

  @Expose()
  grid: string | null = null;

  @Expose()
  minSellPrice: number | null = null;
}

export class EnobotNonFirmRequestOrderEntity implements EnobotNonFirmRequestOrder {
  @Expose()
  id = '';

  @Expose()
  requestID: string | null = null;

  @Expose()
  customer: string | null = null;

  @Expose()
  grid: string | null = null;

  @Expose()
  volume: number | null = null;

  @Expose()
  priceCent: number | null = null;

  @Expose()
  duration: number | null = null;

  @Expose()
  localReqDate: string | null = null;

  @Expose()
  strategy: string | null = null;
}

export class EnobotNonFirmRequestEntity extends BaseApiEntity implements EnobotNonFirmRequest {
  @Expose()
  type: EnobotLimitType | null = null;

  @Expose()
  activationDate: string | null = null;

  @Expose()
  activationUser: string | null = null;

  @Expose()
  expirationDate: number | null = null;

  @Expose()
  @Type(() => EnobotNonFirmRequestOrderEntity)
  @Transform(
    (value: string) => {
      if (!value) {
        return value;
      }

      const obj = JSON.parse(value) as EnobotNonFirmRequestOrderEntity[];
      const objUpdated = obj.map((entity) => {
        return {
          ...entity,
          id: nanoid(),
        };
      });
      return objUpdated;
    },
    { toClassOnly: true },
  )
  orders: EnobotNonFirmRequestOrder[] | string = [];

  @Expose()
  @Type(() => EnobotNonFirmRequestInfoEntity)
  @Transform(
    (value: string) => {
      return value ? JSON.parse(value) : value;
    },
    { toClassOnly: true },
  )
  info: EnobotNonFirmRequestInfo | string | null = null;

  @Expose()
  author: string | null = null;

  @Expose()
  saveDate: string | null = null;

  @Expose()
  deleted: EnobotDeleted | null = null;
}
