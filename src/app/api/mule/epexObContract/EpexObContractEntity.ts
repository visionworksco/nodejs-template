/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EpexObContract } from './EpexObContract';

export class EpexObContractEntity extends BaseApiEntity implements EpexObContract {
  @Expose()
  seriesname: string | null = null;

  @Expose()
  longname: string | null = null;

  @Expose()
  prod: string | null = null;

  @Expose()
  grid: string | null = null;

  @Expose()
  dlvryend: string | null = null;

  @Expose()
  contractid: number | null = null;

  @Expose()
  ask: number | null = null;

  @Expose()
  dlvrystart: string | null = null;

  @Expose()
  bid: number | null = null;

  @Expose()
  ts: string | null = null;
}
