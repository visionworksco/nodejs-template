import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { NextFunction, Request, Response } from 'express';
import { Authenticate } from '../../../server/express/middleware/Authenticate';
import { AmpqEnobotStrategyController } from './AmpqEnobotStrategyController';
import { AmpqEnobotStrategyEntity } from './AmpqEnobotStrategyEntity';

export class AmpqEnobotStrategyRoute extends BaseCrudRoute<AmpqEnobotStrategyEntity> {
  private ampqEnobotStrategyController: AmpqEnobotStrategyController;

  constructor(controller: AmpqEnobotStrategyController) {
    super(controller);
    this.ampqEnobotStrategyController = controller;
    this.registerCustomRoutes();
  }

  getBaseUrl(): string {
    return '/ampq/enobotStrategies';
  }

  private registerCustomRoutes() {
    this.router.post(`${this.getBaseUrl()}`, [Authenticate(), this.addStrategy]);
  }

  private addStrategy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.ampqEnobotStrategyController.addStrategy(req, res);
    } catch (error) {
      next(error);
    }
  };
}
