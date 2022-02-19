import { AmpqEnobotOrder } from './AmpqEnobotOrder';
import { AmpqEnobotOrderLimit } from './AmpqEnobotOrderLimit';

export interface AmpqEnobotOrderAddPayload {
  orders: AmpqEnobotOrder[] | null;
  limit: AmpqEnobotOrderLimit[] | null;
}
