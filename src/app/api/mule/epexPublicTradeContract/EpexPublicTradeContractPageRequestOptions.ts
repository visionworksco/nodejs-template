/* istanbul ignore file */

import { Expose } from 'class-transformer';

export class EpexPublicTradeContractPageRequestOptions {
  @Expose()
  seriesname?: string;

  @Expose()
  longname?: string;
}
