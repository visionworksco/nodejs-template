/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EpexAvg } from './EpexAvg';

export class EpexAvgEntity extends BaseApiEntity implements EpexAvg {
  @Expose()
  longname: string | null = null;

  @Expose()
  seriesname: string | null = null;

  @Expose()
  grid: string | null = null;

  @Expose()
  price: number | null = null;

  @Expose()
  ts: string | null = null;
}
