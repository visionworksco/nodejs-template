import { BaseRequest, PageRequest, StatusCode } from '@visionworksco/expressjs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { EnobotTimeSerieEntity } from '../../../type/EnobotTimeSerieEntity';
import { GapiSearchService } from './GapiSearchService';

export class GapiSearchController extends BaseApiCrudController<EnobotTimeSerieEntity> {
  constructor(service: GapiSearchService) {
    super(service, EnobotTimeSerieEntity);
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
