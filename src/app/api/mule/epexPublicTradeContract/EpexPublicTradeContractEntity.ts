/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { BaseApiEntity } from '../../../entity/BaseApiEntity';
import { EpexPublicTradeContract } from './EpexPublicTradeContract';

export class EpexPublicTradeContractEntity
  extends BaseApiEntity
  implements EpexPublicTradeContract
{
  @Expose()
  longname: string | null = null;

  @Expose()
  prod: string | null = null;

  @Expose()
  selftrade: string | null = null;

  @Expose()
  buydlvryareaid: string | null = null;

  @Expose()
  dlvrystart: string | null = null;

  @Expose()
  px: number | null = null;

  @Expose()
  clghsecode: string | null = null;

  @Expose()
  seriesname: string | null = null;

  @Expose()
  selldlvryareaid: string | null = null;

  @Expose()
  tradeexectime: string | null = null;

  @Expose()
  dlvryend: string | null = null;

  @Expose()
  qty: number | null = null;

  @Expose()
  contractid: number | null = null;

  @Expose()
  revisionno: number | null = null;

  @Expose()
  state: string | null = null;

  @Expose()
  tradeid: number | null = null;
}
