import {
  RootRoute,
  Route,
  StaticFolderRegister,
  Storage,
  UndefinedRoute,
} from '@visionworksco/nodejs-middleware';
import { Application, Request, Response } from 'express';
import path from 'path';
import { Pool } from 'pg';
import { AccountController } from '../../api/account/AccountController';
import { AccountRepository } from '../../api/account/AccountRepository';
import { AccountRoute } from '../../api/account/AccountRoute';
import { AccountService } from '../../api/account/AccountService';
import { InfoController } from '../../api/info/InfoController';
import { InfoRepository } from '../../api/info/InfoRepository';
import { InfoRoute } from '../../api/info/InfoRoute';
import { InfoService } from '../../api/info/InfoService';
import { Config } from '../../config/Config';
import { PsqlStorage } from '../../repository/postgresql/PsqlStorage';

export class Routes {
  private app: Application;

  private apiVersion: string;
  private baseUrl: string;
  private routes: Route[] = [];

  private psqlPool: Pool | null = null;

  private accountRepository: AccountRepository | null = null;
  private accountService: AccountService | null = null;
  private accountController: AccountController | null = null;
  private accountRoute: AccountRoute | null = null;

  private infoRepository: InfoRepository | null = null;
  private infoService: InfoService | null = null;
  private infoController: InfoController | null = null;
  private infoRoute: InfoRoute | null = null;

  constructor(app: Application) {
    this.app = app;
    this.apiVersion = Config.get('AppConfig').API_VERSION;
    this.baseUrl = `/${this.apiVersion}/api`;
  }

  async connect(storage: Storage): Promise<void> {
    try {
      // PostgreSQL pool object
      if (storage instanceof PsqlStorage) {
        this.psqlPool = storage.pool;
      }

      if (this.psqlPool) {
        this.accountRepository = new AccountRepository(this.psqlPool);
        this.accountService = new AccountService(this.accountRepository);
        this.accountController = new AccountController(this.accountService);
        this.accountRoute = new AccountRoute(this.accountController);
        this.register(this.accountRoute);
      }

      this.infoRepository = new InfoRepository();
      this.infoService = new InfoService(this.infoRepository);
      this.infoController = new InfoController(this.infoService);
      this.infoRoute = new InfoRoute(this.infoController);
      this.register(this.infoRoute);

      this.afterConnect();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private afterConnect(): void {
    this.routes.forEach((route) => this.app.use(`${this.baseUrl}`, route.registerRoutes()));
    this.registerStatusRoute();
    this.registerProductionClientRoute();
    this.app.use(RootRoute.registerRoutes());
    this.app.use(UndefinedRoute);
  }

  private register(route: Route): void {
    this.routes.push(route);
  }

  private registerStatusRoute = (): void => {
    this.app.get('/status', (req: Request, res: Response) => {
      res.contentType('text/html').end('active');
    });
  };

  private registerProductionClientRoute = (): void => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const clientBuildPath = process.env.CLIENT_BUILD_PATH || '/';
    this.app.use(StaticFolderRegister(`${clientBuildPath}`));

    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(path.resolve(), clientBuildPath, 'index.html'));
    });
  };
}
