import { BaseRequest, PageRequest, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { HeartbeatsEntity } from './HeartbeatsEntity';
import { HeartbeatsService } from './HeartbeatsService';

export class HeartbeatsController extends BaseApiCrudController<HeartbeatsEntity> {
  constructor(service: HeartbeatsService) {
    super(service, HeartbeatsEntity);
  }

  async findAll(req: BaseRequest, res: Response): Promise<void> {
    try {
      const pageRequest = new PageRequest({});
      const response = await this.service.findAll(pageRequest);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
