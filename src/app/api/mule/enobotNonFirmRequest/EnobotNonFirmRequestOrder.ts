export interface EnobotNonFirmRequestOrder {
  id: string;
  requestID: string | null;
  customer: string | null;
  grid: string | null;
  volume: number | null;
  priceCent: number | null;
  duration: number | null;
  localReqDate: string | null;
  strategy: string | null;
}
