import { BaseRequest, PageRequest, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EpexAvgEntity } from './EpexAvgEntity';
import { EpexAvgService } from './EpexAvgService';

export class EpexAvgController extends BaseApiCrudController<EpexAvgEntity> {
  constructor(service: EpexAvgService) {
    super(service, EpexAvgEntity);
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
