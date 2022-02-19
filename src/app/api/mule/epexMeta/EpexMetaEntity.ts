/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EpexMeta } from './EpexMeta';

export class EpexMetaEntity extends BaseApiEntity implements EpexMeta {
  @Expose()
  seriesname: string | null = null;

  @Expose()
  table: string | null = null;
}
