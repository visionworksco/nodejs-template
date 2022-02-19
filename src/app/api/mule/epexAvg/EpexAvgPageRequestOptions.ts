/* istanbul ignore file */

import { Expose } from 'class-transformer';

export class EpexAvgPageRequestOptions {
  @Expose()
  seriesname?: string;

  @Expose()
  longname?: string;
}
