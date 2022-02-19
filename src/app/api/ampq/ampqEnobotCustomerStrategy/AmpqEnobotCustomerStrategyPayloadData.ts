import { EnobotDeleted } from '../../../type/EnobotDeleted';
import { EnobotSide } from '../../../type/EnobotSide';

export class AmpqEnobotCustomerStrategyPayloadData {
  id: string | null = null;
  customer = '';
  side: EnobotSide = 'BUY';
  dlvryAreaId = '';
  strategyID = '';
  author = '';
  saveDate = 0;
  deleted: EnobotDeleted = 0;
  note: string | null = null;
}
