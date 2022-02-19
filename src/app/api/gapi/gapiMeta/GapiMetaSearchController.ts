import { BaseRequest, PageRequest, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { GapiMetaEntity } from './GapiMetaEntity';
import { GapiMetaSearchService } from './GapiMetaSearchService';

export class GapiMetaSearchController extends BaseApiCrudController<GapiMetaEntity> {
  constructor(service: GapiMetaSearchService) {
    super(service, GapiMetaEntity);
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
