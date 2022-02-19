import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { NextFunction, Request, Response } from 'express';
import { Authenticate } from '../../../server/express/middleware/Authenticate';
import { AmpqEnobotOrderController } from './AmpqEnobotOrderController';
import { AmpqEnobotOrderEntity } from './AmpqEnobotOrderEntity';

export class AmpqEnobotOrderRoute extends BaseCrudRoute<AmpqEnobotOrderEntity> {
  private ampqEnobotOrderController: AmpqEnobotOrderController;

  constructor(controller: AmpqEnobotOrderController) {
    super(controller);
    this.ampqEnobotOrderController = controller;
    this.registerCustomRoutes();
  }

  getBaseUrl(): string {
    return '/ampq/enobotOrders';
  }

  private registerCustomRoutes() {
    this.router.post(`${this.getBaseUrl()}/addOrder`, [Authenticate(), this.addOrder]);
    this.router.post(`${this.getBaseUrl()}/deleteOrder`, [Authenticate(), this.deleteOrder]);
  }

  private addOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.ampqEnobotOrderController.addOrder(req, res);
    } catch (error) {
      next(error);
    }
  };

  private deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.ampqEnobotOrderController.deleteOrder(req, res);
    } catch (error) {
      next(error);
    }
  };
}
