import {
  PsqlPool,
  RootRoute,
  Route,
  StaticFolderRegister,
  UndefinedRoute,
} from '@visionworksco/nodejs-middleware';
import { Application, Request, Response } from 'express';
import path from 'path';
import { AccountController } from '../../api/account/AccountController';
import { AccountRepository } from '../../api/account/AccountRepository';
import { AccountRoute } from '../../api/account/AccountRoute';
import { AccountService } from '../../api/account/AccountService';
import { InfoController } from '../../api/info/InfoController';
import { InfoRepository } from '../../api/info/InfoRepository';
import { InfoRoute } from '../../api/info/InfoRoute';
import { InfoService } from '../../api/info/InfoService';
import { Config } from '../../config/Config';

export class Routes {
  private app: Application;

  private apiVersion: string;
  private baseUrl: string;
  private routes: Route[] = [];

  private accountRepository: AccountRepository;
  private accountService: AccountService;
  private accountController: AccountController;
  private accountRoute: AccountRoute;

  private infoRepository: InfoRepository;
  private infoService: InfoService;
  private infoController: InfoController;
  private infoRoute: InfoRoute;

  constructor(app: Application) {
    this.app = app;
    this.apiVersion = Config.get('AppConfig').API_VERSION;
    this.baseUrl = `/${this.apiVersion}/api`;

    // TODO: should it be here?
    const psqlPool = PsqlPool();

    this.accountRepository = new AccountRepository(psqlPool);
    this.accountService = new AccountService(this.accountRepository);
    this.accountController = new AccountController(this.accountService);
    this.accountRoute = new AccountRoute(this.accountController);
    this.register(this.accountRoute);

    this.infoRepository = new InfoRepository();
    this.infoService = new InfoService(this.infoRepository);
    this.infoController = new InfoController(this.infoService);
    this.infoRoute = new InfoRoute(this.infoController);
    this.register(this.infoRoute);
  }

  private register(route: Route): void {
    this.routes.push(route);
  }

  connect(): void {
    this.routes.forEach((route) => this.app.use(`${this.baseUrl}`, route.registerRoutes()));
    this.registerStatusRoute();
    this.registerProductionClientRoute();
    this.app.use(RootRoute.registerRoutes());
    this.app.use(UndefinedRoute);
  }

  registerStatusRoute = (): void => {
    this.app.get('/status', (req: Request, res: Response) => {
      res.contentType('text/html').end('active');
    });
  };

  registerProductionClientRoute = (): void => {
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
