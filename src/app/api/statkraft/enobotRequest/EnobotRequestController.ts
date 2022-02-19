import { BaseRequest, PageRequest, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EnobotRequestEntity } from './EnobotRequestEntity';
import { EnobotRequestService } from './EnobotRequestService';

export class EnobotRequestController extends BaseApiCrudController<EnobotRequestEntity> {
  constructor(service: EnobotRequestService) {
    super(service, EnobotRequestEntity);
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
