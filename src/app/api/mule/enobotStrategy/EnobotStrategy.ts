import { ApiEntity } from '@visionworksco/expressjs-middleware';
import { EnobotStrategyData } from '../enobotStrategyData/EnobotStrategyData';

export interface EnobotStrategy extends ApiEntity {
  strategy: string | EnobotStrategyData | null;
  name: string | null;
  author: string | null;
  saveDate: string | number | null;
  note: string | null;
}
