/* istanbul ignore file */

import { Expose } from 'class-transformer';

export class EpexObContractPageRequestOptions {
  @Expose()
  seriesname?: string;

  @Expose()
  longname?: string;
}
