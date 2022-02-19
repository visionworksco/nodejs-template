import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { CmdExchangeLogEntity } from './CmdExchangeLogEntity';
import { CmdExchangeLogService } from './CmdExchangeLogService';

export class CmdExchangeLogController extends BaseApiCrudController<CmdExchangeLogEntity> {
  constructor(service: CmdExchangeLogService) {
    super(service, CmdExchangeLogEntity);
  }
}
