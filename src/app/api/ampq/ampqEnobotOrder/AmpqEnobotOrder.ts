import { ApiEntity } from '@visionworksco/nodejs-middleware';

export interface AmpqEnobotOrder extends ApiEntity {
  customer: string;
  requestID: string;
  grid: string;
  volume: number; // Mw
  priceCent: number | null; // in cents
  duration: number;
  localDateTime: string; // YYYY-MM-DD'T'hh:mm:ssXXX
  strategy: string | null;
}
