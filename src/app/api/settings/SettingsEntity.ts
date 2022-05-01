/* istanbul ignore file */

import { Expose, Type } from 'class-transformer';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { CommandSettings, EnobotRequestSettings, Settings, SettingsData } from './Settings';

class EnobotRequestSettingsEntity implements EnobotRequestSettings {
  @Expose()
  grid = [];

  @Expose()
  volumeMin = 0;

  @Expose()
  volumeMax = 0;

  @Expose()
  duration = [];

  @Expose()
  limitType = [];
}

class CommandSettingsEntity implements CommandSettings {
  @Expose()
  module = [];
}

class SettingsDataEntity implements SettingsData {
  @Expose()
  @Type(() => EnobotRequestSettingsEntity)
  enobotRequest = null;

  @Expose()
  @Type(() => CommandSettingsEntity)
  command = null;
}

export class SettingsEntity extends BaseApiEntity implements Settings {
  @Expose()
  @Type(() => SettingsDataEntity)
  data = null;
}
