import { BaseRequest, StatusCode } from '@visionworksco/expressjs-middleware';
import { Response } from 'express';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { ControllerUtils } from '../../../controller/ControllerUtils';
import { AmpqEnobotAddStrategyPayloadEntity } from './AmpqEnobotStrategyAddPayloadEntity';
import { AmpqEnobotStrategyEntity } from './AmpqEnobotStrategyEntity';
import { AmpqEnobotStrategyService } from './AmpqEnobotStrategyService';

export class AmpqEnobotStrategyController extends BaseApiCrudController<AmpqEnobotStrategyEntity> {
  protected ampqEnobotStrategyService: AmpqEnobotStrategyService;

  constructor(service: AmpqEnobotStrategyService) {
    super(service, AmpqEnobotStrategyEntity);
    this.ampqEnobotStrategyService = service;
  }

  async addStrategy(req: BaseRequest, res: Response): Promise<void> {
    try {
      const payloadTransformed = ClassTransformer.fromPlain(
        AmpqEnobotAddStrategyPayloadEntity,
        req.body,
      );
      const userEmail = ControllerUtils.getUserEmail(req);

      await this.ampqEnobotStrategyService.addStrategy(payloadTransformed, userEmail);

      res.status(StatusCode.CREATED).json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
