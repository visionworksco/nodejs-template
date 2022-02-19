import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { CmdExchangeLogController } from './CmdExchangeLogController';
import { CmdExchangeLogEntity } from './CmdExchangeLogEntity';

export class CmdExchangeLogRoute extends BaseCrudRoute<CmdExchangeLogEntity> {
  constructor(controller: CmdExchangeLogController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/cmdExchangeLogs';
  }
}
