/* istanbul ignore file */

import { BooleanUtils } from '@visionworksco/expressjs-middleware';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class BaseQueryEntity {
  @Expose()
  @Transform((value: string) => {
    return BooleanUtils.fromString(value);
  })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  byUserId?: boolean;
}
