import { FileQuery } from '@visionworksco/nodejs-middleware';
import { Expose, Type } from 'class-transformer';

export class FileQueryEntity implements FileQuery {
  @Expose()
  field = '';

  @Expose()
  @Type(() => Number)
  limitFileSize?: number;
}
