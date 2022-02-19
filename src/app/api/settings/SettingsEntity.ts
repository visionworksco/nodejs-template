/* istanbul ignore file */

import { Expose, Type } from 'class-transformer';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { EnobotRequestDuration, EnobotRequestSettings, Settings, SettingsData } from './Settings';

class EnobotRequestSettingsEntity implements EnobotRequestSettings {
  @Expose()
  grid?: string[];

  @Expose()
  volumeMin?: number;

  @Expose()
  volumeMax?: number;

  @Expose()
  duration?: EnobotRequestDuration[];

  @Expose()
  limitType?: string[];
}

class SettingsDataEntity implements SettingsData {
  @Expose()
  @Type(() => EnobotRequestSettingsEntity)
  enobotRequest?: EnobotRequestSettingsEntity;
}

export class SettingsEntity extends BaseApiEntity implements Settings {
  @Expose()
  @Type(() => SettingsDataEntity)
  data: SettingsDataEntity | null = null;
}
