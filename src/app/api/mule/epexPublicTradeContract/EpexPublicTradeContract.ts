import { ApiEntity } from '@visionworksco/expressjs-middleware';

export interface EpexPublicTradeContract extends ApiEntity {
  longname: string | null;
  prod: string | null;
  selftrade: string | null;
  buydlvryareaid: string | null;
  dlvrystart: string | null;
  px: number | null;
  clghsecode: string | null;
  seriesname: string | null;
  selldlvryareaid: string | null;
  tradeexectime: string | null;
  dlvryend: string | null;
  qty: number | null;
  contractid: number | null;
  revisionno: number | null;
  state: string | null;
  tradeid: number | null;
}
