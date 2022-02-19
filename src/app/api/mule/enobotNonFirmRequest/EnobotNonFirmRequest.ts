import { ApiEntity } from '@visionworksco/nodejs-middleware';
import { EnobotDeleted } from '../../types/EnobotDeleted';
import { EnobotLimitType } from '../../types/EnobotLimitType';
import { EnobotNonFirmRequestInfo } from './EnobotNonFirmRequestInfo';
import { EnobotNonFirmRequestOrder } from './EnobotNonFirmRequestOrder';

export interface EnobotNonFirmRequest extends ApiEntity {
  type: EnobotLimitType | null;
  activationDate: string | null;
  activationUser: string | null;
  expirationDate: number | null;
  orders: EnobotNonFirmRequestOrder[] | string;
  info: EnobotNonFirmRequestInfo | string | null;
  author: string | null;
  saveDate: string | null;
  deleted: EnobotDeleted | null;
}
