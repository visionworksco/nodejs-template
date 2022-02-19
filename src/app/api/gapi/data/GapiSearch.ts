import { ApiEntity } from '@visionworksco/expressjs-middleware';
import { EnobotTimeSerie } from '../../../type/EnobotTimeSerie';
import { GapiSearchType } from './GapiSearchType';

export interface GapiSearch extends ApiEntity {
  type: GapiSearchType | null;
  unit: string | null;
  interval: number | null;
  userdata: string | null;
  values: EnobotTimeSerie[];
}
