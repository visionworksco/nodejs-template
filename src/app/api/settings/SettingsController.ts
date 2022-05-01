import { BaseRequest, BaseResult, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express-serve-static-core';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { SettingsEntity } from './SettingsEntity';
import { SettingsService } from './SettingsService';

export class SettingsController extends BaseApiCrudController<SettingsEntity> {
  private settingsService: SettingsService;

  constructor(settingsService: SettingsService) {
    super(settingsService, SettingsEntity);
    this.settingsService = settingsService;
  }

  async findDefault(req: BaseRequest, res: Response): Promise<void> {
    try {
      const entity = await this.settingsService.findDefault();

      const response = new BaseResult(entity);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
