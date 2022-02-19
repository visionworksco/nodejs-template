import { EnobotDeleted } from '../../types/EnobotDeleted';
import { EnobotSide } from '../../types/EnobotSide';

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
