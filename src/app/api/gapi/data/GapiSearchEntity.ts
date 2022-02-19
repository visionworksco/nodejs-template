/* istanbul ignore file */

import { Expose, Type } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EnobotTimeSerieEntity } from '../../../type/EnobotTimeSerieEntity';
import { GapiSearch } from './GapiSearch';
import { GapiSearchType } from './GapiSearchType';

export class GapiSearchEntity extends BaseApiEntity implements GapiSearch {
  @Expose()
  type: GapiSearchType | null = null;

  @Expose()
  unit: string | null = null;

  @Expose()
  interval: number | null = null;

  @Expose()
  userdata: string | null = null;

  @Expose()
  @Type(() => EnobotTimeSerieEntity)
  values: EnobotTimeSerieEntity[] = [];
}
