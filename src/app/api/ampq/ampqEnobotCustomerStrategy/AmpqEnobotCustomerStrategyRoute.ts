import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { NextFunction, Request, Response } from 'express';
import { Authenticate } from '../../../server/express/middleware/Authenticate';
import { AmpqEnobotCustomerStrategyController } from './AmpqEnobotCustomerStrategyController';
import { AmpqEnobotCustomerStrategyEntity } from './AmpqEnobotCustomerStrategyEntity';

export class AmpqEnobotCustomerStrategyRoute extends BaseCrudRoute<AmpqEnobotCustomerStrategyEntity> {
  private ampqEnobotCustomerStrategyController: AmpqEnobotCustomerStrategyController;

  constructor(controller: AmpqEnobotCustomerStrategyController) {
    super(controller);
    this.ampqEnobotCustomerStrategyController = controller;
    this.registerCustomRoutes();
  }

  getBaseUrl(): string {
    return '/ampq/enobotCustomerStrategies';
  }

  private registerCustomRoutes() {
    this.router.post(`${this.getBaseUrl()}/editStrategy`, [Authenticate(), this.editStrategy]);
  }

  private editStrategy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.ampqEnobotCustomerStrategyController.editStrategy(req, res);
    } catch (error) {
      next(error);
    }
  };
}
