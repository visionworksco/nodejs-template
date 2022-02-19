/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { Info } from './Info';

export class InfoEntity extends BaseApiEntity implements Info {
  @Expose()
  name = '';

  @Expose()
  version = '';
}
