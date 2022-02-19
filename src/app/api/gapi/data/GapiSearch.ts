import { ApiEntity } from '@visionworksco/nodejs-middleware';
import { EnobotTimeSerie } from '../../types/EnobotTimeSerie';
import { GapiSearchType } from './GapiSearchType';

export interface GapiSearch extends ApiEntity {
  type: GapiSearchType | null;
  unit: string | null;
  interval: number | null;
  userdata: string | null;
  values: EnobotTimeSerie[];
}
