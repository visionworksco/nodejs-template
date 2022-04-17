/* istanbul ignore file */

import { Expose, Transform, Type } from 'class-transformer';
import { nanoid } from 'nanoid';
import { BaseApiEntity } from './BaseApiEntity';

export class PsqlApiEntity extends BaseApiEntity {
  @Expose()
  @Type(() => String)
  @Transform(
    (value) => {
      if (!value || value.length === 0) {
        return nanoid();
      }
      return value;
    },
    { toClassOnly: true },
  )
  id = '';
}
