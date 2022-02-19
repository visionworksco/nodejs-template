import { BaseRequest, BaseResult, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { InfoEntity } from './InfoEntity';
import { InfoService } from './InfoService';

export class InfoController extends BaseApiCrudController<InfoEntity> {
  constructor(service: InfoService) {
    super(service, InfoEntity);
  }

  async findById(req: BaseRequest, res: Response): Promise<void> {
    try {
      const entity = await this.service.findById('');

      const response = new BaseResult(entity);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
