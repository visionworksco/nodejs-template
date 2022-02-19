import { BaseRequest, StatusCode } from '@visionworksco/expressjs-middleware';
import { Response } from 'express';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { BaseApiCrudController } from '../../../controller/BaseApiCrudController';
import { ControllerUtils } from '../../../controller/ControllerUtils';
import { AmpqEnobotOrderAddPayloadEntity } from './AmpqEnobotOrderAddPayloadEntity';
import { AmpqEnobotOrderDeletePayloadEntity } from './AmpqEnobotOrderDeletePayloadEntity';
import { AmpqEnobotOrderEntity } from './AmpqEnobotOrderEntity';
import { AmpqEnobotOrderService } from './AmpqEnobotOrderService';

export class AmpqEnobotOrderController extends BaseApiCrudController<AmpqEnobotOrderEntity> {
  protected ampqEnobotOrderService: AmpqEnobotOrderService;

  constructor(service: AmpqEnobotOrderService) {
    super(service, AmpqEnobotOrderEntity);
    this.ampqEnobotOrderService = service;
  }

  async addOrder(req: BaseRequest, res: Response): Promise<void> {
    try {
      const payloadTransformed = ClassTransformer.fromPlain(
        AmpqEnobotOrderAddPayloadEntity,
        req.body,
      );
      const userEmail = ControllerUtils.getUserEmail(req);

      await this.ampqEnobotOrderService.addOrder(payloadTransformed, userEmail);

      res.status(StatusCode.CREATED).json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOrder(req: BaseRequest, res: Response): Promise<void> {
    try {
      const payloadTransformed = ClassTransformer.fromPlain(
        AmpqEnobotOrderDeletePayloadEntity,
        req.body,
      );
      const userEmail = ControllerUtils.getUserEmail(req);

      await this.ampqEnobotOrderService.deleteOrder(payloadTransformed, userEmail);

      res.status(StatusCode.CREATED).json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
