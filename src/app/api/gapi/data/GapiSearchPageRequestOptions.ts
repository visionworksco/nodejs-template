/* istanbul ignore file */

import { Expose } from 'class-transformer';

export class GapiSearchPageRequestOptions {
  @Expose()
  source?: string;

  @Expose()
  name?: string;

  @Expose()
  ts_start?: string;

  @Expose()
  ts_end?: string;

  @Expose()
  time?: string;
}
