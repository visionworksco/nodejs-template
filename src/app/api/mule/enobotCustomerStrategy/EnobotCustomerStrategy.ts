import { ApiEntity } from '@visionworksco/nodejs-middleware';
import { EnobotDeleted } from '../../../type/EnobotDeleted';
import { EnobotSide } from '../../../type/EnobotSide';
import { EnobotStrategyData } from '../enobotStrategyData/EnobotStrategyData';

export interface EnobotCustomerStrategy extends ApiEntity {
  customer: string | null;
  side: EnobotSide | null;
  dlvryAreaId: string | null;
  strategyID: string | null;
  strategy: EnobotStrategyData | null;
  name: string | null;
  strategyNote: string | null;
  deleted: EnobotDeleted;
  author: string | null;
  saveDate: string | null;
  MappingNote: string | null;
}
