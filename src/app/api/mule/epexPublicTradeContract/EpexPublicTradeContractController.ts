import { BaseRequest, PageRequest, StatusCode } from '@visionworksco/expressjs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EpexPublicTradeContractEntity } from './EpexPublicTradeContractEntity';
import { EpexPublicTradeContractService } from './EpexPublicTradeContractService';

export class EpexPublicTradeContractController extends BaseApiCrudController<EpexPublicTradeContractEntity> {
  constructor(service: EpexPublicTradeContractService) {
    super(service, EpexPublicTradeContractEntity);
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
