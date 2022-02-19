import { BaseRequest, StatusCode } from '@visionworksco/expressjs-middleware';
import { Response } from 'express';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { ControllerUtils } from '../../../controller/ControllerUtils';
import { AmpqEnobotCustomerStrategyAssignPayloadEntity } from './AmpqEnobotCustomerStrategyAssignPayloadEntity';
import { AmpqEnobotCustomerStrategyEntity } from './AmpqEnobotCustomerStrategyEntity';
import { AmpqEnobotCustomerStrategyService } from './AmpqEnobotCustomerStrategyService';

export class AmpqEnobotCustomerStrategyController extends BaseApiCrudController<AmpqEnobotCustomerStrategyEntity> {
  protected ampqEnobotCustomerStrategyService: AmpqEnobotCustomerStrategyService;

  constructor(service: AmpqEnobotCustomerStrategyService) {
    super(service, AmpqEnobotCustomerStrategyEntity);
    this.ampqEnobotCustomerStrategyService = service;
  }

  async editStrategy(req: BaseRequest, res: Response): Promise<void> {
    try {
      const payloadTransformed = ClassTransformer.fromPlain(
        AmpqEnobotCustomerStrategyAssignPayloadEntity,
        req.body,
      );
      const userEmail = ControllerUtils.getUserEmail(req);

      await this.ampqEnobotCustomerStrategyService.editStrategy(payloadTransformed, userEmail);

      res.status(StatusCode.CREATED).json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
