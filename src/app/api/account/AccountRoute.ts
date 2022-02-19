import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Authenticate } from '../../server/express/middleware/Authenticate';
import { ChartWidgetController } from '../chartWidget/ChartWidgetController';
import { AccountController } from './AccountController';
import { AccountEntity } from './AccountEntity';

export class AccountRoute extends BaseCrudRoute<AccountEntity> {
  private accountController: AccountController;
  private chartWidgetController: ChartWidgetController;

  constructor(accountController: AccountController, chartWidgetController: ChartWidgetController) {
    super(accountController);
    this.accountController = accountController;
    this.chartWidgetController = chartWidgetController;
    this.registerCustomRoutes();
  }

  getBaseUrl(): string {
    return '/accounts';
  }

  protected allMutateHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(),
    this.allMutate,
  ];

  private registerCustomRoutes() {
    this.router.get(`${this.getBaseUrl()}/email/:email`, [this.findByEmail]);
    this.router.get(`${this.getBaseUrl()}/email/:email/chartWidgets`, [this.findAllChartWidgets]);
  }

  private findByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.accountController.findByEmail(req, res);
    } catch (error) {
      next(error);
    }
  };

  private findAllChartWidgets = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.chartWidgetController.findAllByAccountEmail(req, res);
    } catch (error) {
      next(error);
    }
  };
}
