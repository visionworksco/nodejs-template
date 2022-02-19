import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EnobotNonFirmRequestEntity } from './EnobotNonFirmRequestEntity';
import { EnobotNonFirmRequestService } from './EnobotNonFirmRequestService';

export class EnobotNonFirmRequestController extends BaseApiCrudController<EnobotNonFirmRequestEntity> {
  constructor(service: EnobotNonFirmRequestService) {
    super(service, EnobotNonFirmRequestEntity);
  }
}
