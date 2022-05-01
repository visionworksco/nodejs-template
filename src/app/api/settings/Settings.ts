/* istanbul ignore file */

import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface EnobotRequestSettings {
  grid: string[];
  volumeMin: number;
  volumeMax: number;
  duration: string[];
  limitType: string[];
}

export interface CommandSettings {
  module: string[];
}

export interface SettingsData {
  enobotRequest: EnobotRequestSettings | null;
  command: CommandSettings | null;
}

export interface Settings extends ApiEntity {
  data: SettingsData | null;
}
