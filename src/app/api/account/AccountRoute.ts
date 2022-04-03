import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AccountController } from './AccountController';
import { AccountEntity } from './AccountEntity';

export class AccountRoute extends BaseCrudRoute<AccountEntity> {
  private accountController: AccountController;

  constructor(accountController: AccountController) {
    super(accountController);
    this.accountController = accountController;
    this.registerCustomRoutes();
  }

  getBaseUrl(): string {
    return '/accounts';
  }

  protected allMutateHandlers = (handlerId?: string): RequestHandler[] => [this.allMutate];

  private registerCustomRoutes() {
    this.router.get(`${this.getBaseUrl()}/email/:email`, [this.findByEmail]);
  }

  private findByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.accountController.findByEmail(req, res);
    } catch (error) {
      next(error);
    }
  };
}
