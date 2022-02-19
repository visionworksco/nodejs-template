import { ApiEntity } from '@visionworksco/nodejs-middleware';

export type EnobotRequestDuration = '15min' | '1h';

export interface EnobotRequestSettings {
  grid?: string[];
  volumeMin?: number;
  volumeMax?: number;
  duration?: EnobotRequestDuration[];
  limitType?: string[];
}

export interface SettingsData {
  enobotRequest?: EnobotRequestSettings;
}

export interface Settings extends ApiEntity {
  data: SettingsData | null;
}
