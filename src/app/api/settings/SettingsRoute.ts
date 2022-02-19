import { BaseCrudRoute } from '@visionworksco/nodejs-middleware';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Authenticate } from '../../server/express/middleware/Authenticate';
import { SettingsController } from './SettingsController';
import { SettingsEntity } from './SettingsEntity';

export class SettingsRoute extends BaseCrudRoute<SettingsEntity> {
  private settingsController: SettingsController;

  constructor(settingsController: SettingsController) {
    super(settingsController);
    this.settingsController = settingsController;
    this.registerCustomRoutes();
  }

  getBaseUrl(): string {
    return '/settings';
  }

  protected allMutateHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(),
    this.allMutate,
  ];

  private registerCustomRoutes() {
    this.router.get(`${this.getBaseUrl()}/default`, [this.findDefault]);
  }

  /* istanbul ignore next */
  private findDefault = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.settingsController.findDefault(req, res);
    } catch (error) {
      next(error);
    }
  };
}
