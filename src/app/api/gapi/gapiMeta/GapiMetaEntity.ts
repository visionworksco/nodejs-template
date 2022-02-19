/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { GapiMeta } from './GapiMeta';

export class GapiMetaEntity extends BaseApiEntity implements GapiMeta {
  @Expose()
  source: string | null = null;

  @Expose()
  name: string | null = null;

  @Expose()
  'bucket-size': number | null = null;

  @Expose()
  table: string | null = null;

  @Expose()
  description: string | null = null;

  @Expose()
  unit: number | null = null;

  @Expose()
  interval: number | null = null;
}
