/* istanbul ignore file */

import { Expose } from 'class-transformer';

export class EnobotRequestPageRequestOptions {
  @Expose()
  delivery_start = '';

  @Expose()
  delivery_stop = '';

  @Expose()
  customer?: string;
}
