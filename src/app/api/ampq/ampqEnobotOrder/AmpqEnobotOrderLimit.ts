import { EnobotLimitType } from '../../../type/EnobotLimitType';
import { AmpqEnobotOrder } from './AmpqEnobotOrder';
import { AmpqEnobotOrderLimitInfo } from './AmpqEnobotOrderLimitInfo';

export interface AmpqEnobotOrderLimit {
  id: string | null; // uuid
  type: EnobotLimitType;
  info: AmpqEnobotOrderLimitInfo | null;
  author: string;
  savedDate: number;
  expirationDate: number;
  activationDate: string; // YYYY-MM-DD'T'hh:mm:ssXXX
  activationUser: string;
  orders: AmpqEnobotOrder[];
  deleted: number;
}
