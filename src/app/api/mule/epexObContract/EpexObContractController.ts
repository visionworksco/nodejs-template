import { BaseRequest, PageRequest, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EpexObContractEntity } from './EpexObContractEntity';
import { EpexObContractService } from './EpexObContractService';

export class EpexObContractController extends BaseApiCrudController<EpexObContractEntity> {
  constructor(service: EpexObContractService) {
    super(service, EpexObContractEntity);
  }

  async findAll(req: BaseRequest, res: Response): Promise<void> {
    try {
      const pageRequest = new PageRequest(req.query);
      const response = await this.service.findAll(pageRequest);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
