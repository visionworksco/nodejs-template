import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EpexMetaEntity } from './EpexMetaEntity';
import { EpexMetaService } from './EpexMetaService';

export class EpexMetaController extends BaseApiCrudController<EpexMetaEntity> {
  constructor(service: EpexMetaService) {
    super(service, EpexMetaEntity);
  }
}
