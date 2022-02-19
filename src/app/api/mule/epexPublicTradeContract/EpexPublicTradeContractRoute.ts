import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { EpexPublicTradeContractController } from './EpexPublicTradeContractController';
import { EpexPublicTradeContractEntity } from './EpexPublicTradeContractEntity';

export class EpexPublicTradeContractRoute extends BaseCrudRoute<EpexPublicTradeContractEntity> {
  constructor(controller: EpexPublicTradeContractController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/mule/epexPublicTradeContracts';
  }
}
