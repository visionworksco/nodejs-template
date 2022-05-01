import {
  AuthData,
  Authenticate,
  AuthService,
  BaseCrudRoute,
} from '@visionworksco/nodejs-middleware';
import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import { UserEntity } from '../user/UserEntity';
import { SettingsController } from './SettingsController';
import { SettingsEntity } from './SettingsEntity';

export class SettingsRoute extends BaseCrudRoute<SettingsEntity> {
  private authService: AuthService<UserEntity, AuthData>;
  private settingsController: SettingsController;

  constructor(
    settingsController: SettingsController,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(settingsController);
    this.settingsController = settingsController;
    this.authService = authService;
    this.registerCustomRoutes();
  }

  getBaseUrl(): string {
    return '/settings';
  }

  protected allMutateHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(this.authService),
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
