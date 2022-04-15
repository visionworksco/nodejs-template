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
import { ProductMongoDbRepository } from '../../api/product/mongodb/ProductMongoDbRepository';
import { ProductController } from '../../api/product/ProductController';
import { ProductRoute } from '../../api/product/ProductRoute';
import { ProductService } from '../../api/product/ProductService';
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

  private productRepository: ProductMongoDbRepository | null = null;
  private productService: ProductService | null = null;
  private productController: ProductController | null = null;
  private productRoute: ProductRoute | null = null;

  constructor(app: Application) {
    this.app = app;
    this.apiVersion = Config.get('AppConfig').API_VERSION;
    this.baseUrl = `/${this.apiVersion}/api`;
  }

  async register(storage: Storage): Promise<void> {
    try {
      // PostgreSQL pool object
      if (storage instanceof PsqlStorage) {
        this.psqlPool = storage.psql;
      }

      if (this.psqlPool) {
        this.accountRepository = new AccountRepository(this.psqlPool);
        this.accountService = new AccountService(this.accountRepository);
        this.accountController = new AccountController(this.accountService);
        this.accountRoute = new AccountRoute(this.accountController);
        this.registerRoute(this.accountRoute);
      }

      this.productRepository = new ProductMongoDbRepository();
      this.productService = new ProductService(this.productRepository);
      this.productController = new ProductController(this.productService);
      this.productRoute = new ProductRoute(this.productController);
      this.registerRoute(this.productRoute);

      this.afterRegister();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private afterRegister(): void {
    this.routes.forEach((route) => this.app.use(`${this.baseUrl}`, route.registerRoutes()));
    this.registerStatusRoute();
    this.registerProductionClientRoute();
    this.app.use(RootRoute.registerRoutes());
    this.app.use(UndefinedRoute);
  }

  private registerRoute(route: Route): void {
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
