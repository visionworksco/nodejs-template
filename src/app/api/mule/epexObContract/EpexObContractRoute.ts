import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { EpexObContractController } from './EpexObContractController';
import { EpexObContractEntity } from './EpexObContractEntity';

export class EpexObContractRoute extends BaseCrudRoute<EpexObContractEntity> {
  constructor(controller: EpexObContractController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/mule/epexObContracts';
  }
}