/* istanbul ignore file */

import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { BaseApiEntity } from '../../entity/BaseApiEntity';

export class MongoDbApiEntity extends BaseApiEntity {
  @Expose({ name: '_id' })
  @Exclude()
  @Type(() => ObjectId)
  @Transform(
    (value, obj) => {
      return value ? value.toString() : obj.id;
    },
    { toClassOnly: true },
  )
  id = '';

  @Expose({ name: 'id' })
  getId = (): string => this.id;
}
