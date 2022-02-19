/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { GapiMetaEntity } from './GapiMetaEntity';
import { GapiMetaSearch } from './GapiMetaSearch';

export class GapiMetaSearchEntity extends BaseApiEntity implements GapiMetaSearch {
  @Expose()
  api_url = '';

  @Expose()
  keyspace = '';

  @Expose()
  metas: GapiMetaEntity[] = [];
}
