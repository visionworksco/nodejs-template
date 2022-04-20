import {
  RootRoute,
  Route,
  StaticFolderRegister,
  UndefinedRoute,
} from '@visionworksco/nodejs-middleware';
import { Application, Request, Response } from 'express';
import path from 'path';
import { Pool } from 'pg';
import { AccountController } from '../../api/account/AccountController';
import { AccountRepository } from '../../api/account/AccountRepository';
import { AccountRoute } from '../../api/account/AccountRoute';
import { AccountService } from '../../api/account/AccountService';
import { JwtAuthController } from '../../api/auth/JwtAuthController';
import { JwtAuthRoute } from '../../api/auth/JwtAuthRoute';
import { JwtAuthService } from '../../api/auth/JwtAuthService';
import { ConfigController } from '../../api/config/ConfigController';
import { ConfigRoute } from '../../api/config/ConfigRoute';
import { ConfigService } from '../../api/config/ConfigService';
import { ConfigEnvironmentRepository } from '../../api/config/environment/ConfigEnvironmentRepository';
import { FileController } from '../../api/file/FileController';
import { FileRoute } from '../../api/file/FileRoute';
import { ProductMongoDbRepository } from '../../api/product/mongodb/ProductMongoDbRepository';
import { ProductController } from '../../api/product/ProductController';
import { ProductRoute } from '../../api/product/ProductRoute';
import { ProductService } from '../../api/product/ProductService';
import { UserMongoDbRepository } from '../../api/user/mongodb/UserMongoDbRepository';
import { UserController } from '../../api/user/UserController';
import { UserRoute } from '../../api/user/UserRoute';
import { UserService } from '../../api/user/UserService';
import { Config } from '../../config/Config';
import { PsqlStorage } from '../../repository/postgresql/PsqlStorage';

export class Routes {
  private app: Application;
  private apiVersion: string;
  private baseUrl: string;
  private routes: Route[] = [];
  private psqlPool: Pool | null = null;

  private userRepository: UserMongoDbRepository | null = null;
  private userService: UserService | null = null;
  private userController: UserController | null = null;
  private userRoute: UserRoute | null = null;

  private authService: JwtAuthService | null = null;
  private authController: JwtAuthController | null = null;
  private authRoute: JwtAuthRoute | null = null;

  private configRepository: ConfigEnvironmentRepository | null = null;
  private configService: ConfigService | null = null;
  private configController: ConfigController | null = null;
  private configRoute: ConfigRoute | null = null;

  private fileController: FileController | null = null;
  private fileRoute: FileRoute | null = null;

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
    this.apiVersion = Config.get('API_VERSION');
    this.baseUrl = `/${this.apiVersion}/api`;
  }

  async register(psqlStorage: PsqlStorage | null): Promise<void> {
    try {
      // PostgreSQL pool object
      if (psqlStorage) {
        this.psqlPool = psqlStorage.psql;
      }

      if (this.psqlPool) {
        this.accountRepository = new AccountRepository(this.psqlPool);
        this.accountService = new AccountService(this.accountRepository);
        this.accountController = new AccountController(this.accountService);
        this.accountRoute = new AccountRoute(this.accountController);
        this.registerRoute(this.accountRoute);
      }

      this.fileController = new FileController();
      this.fileRoute = new FileRoute(this.fileController);
      this.registerRoute(this.fileRoute);

      this.configRepository = new ConfigEnvironmentRepository();
      this.configService = new ConfigService(this.configRepository);
      this.configController = new ConfigController(this.configService);
      this.configRoute = new ConfigRoute(this.configController);
      this.registerRoute(this.configRoute);

      this.userRepository = new UserMongoDbRepository();

      this.authService = new JwtAuthService(this.userRepository);
      this.authController = new JwtAuthController(this.authService);
      this.authRoute = new JwtAuthRoute(this.authController);
      this.registerRoute(this.authRoute);

      this.userService = new UserService(this.userRepository);
      this.userController = new UserController(this.userService);
      this.userRoute = new UserRoute(this.userController, this.authService);
      this.registerRoute(this.userRoute);

      this.productRepository = new ProductMongoDbRepository();
      this.productService = new ProductService(this.productRepository);
      this.productController = new ProductController(this.productService);
      this.productRoute = new ProductRoute(
        this.productController,
        this.fileController,
        this.authService,
      );
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
    if (Config.get('NODE_ENV') !== 'production') {
      return;
    }

    const clientBuildPath = Config.get('CLIENT_BUILD_PATH');
    this.app.use(StaticFolderRegister(`${clientBuildPath}`));

    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(path.resolve(), clientBuildPath, 'index.html'));
    });
  };
}
