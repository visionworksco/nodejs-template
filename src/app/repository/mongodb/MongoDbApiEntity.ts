/* istanbul ignore file */

import { Exclude, Expose, Transform } from 'class-transformer';
import { BaseApiEntity } from '../../entity/BaseApiEntity';

export class MongoDbApiEntity extends BaseApiEntity {
  @Expose({ name: '_id' })
  @Exclude()
  @Transform(
    (value, obj) => {
      return value ?? obj.id;
    },
    { toClassOnly: true },
  )
  id = '';

  @Expose({ name: 'id' })
  getId = (): string => this.id;
}
