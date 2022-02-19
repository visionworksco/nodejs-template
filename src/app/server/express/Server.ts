import {
  AppException,
  CookieParser,
  Cors,
  ExceptionHandler,
  HttpLogger,
  JsonParser,
  Logger,
  ResponseHeaders,
  ServerExceptionHandler,
  StaticFolderRegister,
  StatusCode,
  UrlEncoder,
} from '@visionworksco/nodejs-middleware';
import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import apiDocs from '../../../docs';
import { AmpqCmdExchangeService } from '../../api/ampq/ampqCmdExchange/AmpqCmdExchangeService';
import { AmpqEnobotHbExchangeService } from '../../api/ampq/ampqEnobotHbExchange/AmpqEnobotHbExchangeService';
import { Config } from '../../config/Config';
import { EnvironmentUtils } from '../../environment/EnvironmentUtils';
import { AmpqServices } from './AmpqServices';
import { Routes } from './Routes';
import { Storages } from './Storages';

export class Server {
  private name: string;
  private port: number;
  private app: Application;
  private storages: Storages;
  private ampqServices: AmpqServices;
  private routes: Routes;
  private fileUploadsPath: string;
  private apiDocsPath: string;

  constructor() {
    this.app = express();
    this.name = 'Express server';
    this.port = Number(process.env.PORT) || 3000;

    this.fileUploadsPath = EnvironmentUtils.getFileUploadsPath();
    this.apiDocsPath = EnvironmentUtils.getApiDocsPaths();

    this.storages = new Storages();
    this.ampqServices = new AmpqServices(
      new AmpqCmdExchangeService(),
      new AmpqEnobotHbExchangeService(),
    );
    this.routes = new Routes(this.app);

    try {
      this.app.use(
        ResponseHeaders(
          Config.get('AppConfig').ACCESS_CONTROL_ALLOW_ORIGIN,
          Config.get('AppConfig').ACCESS_CONTROL_ALLOW_HEADERS,
          Config.get('AppConfig').ACCESS_CONTROL_ALLOW_METHODS,
        ),
      );
      this.app.use(JsonParser());
      this.app.use(UrlEncoder());
      this.app.use(CookieParser());
      this.app.use(Cors());
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development.local') {
        this.app.use(HttpLogger());
      }
      this.app.use(this.fileUploadsPath, StaticFolderRegister(this.fileUploadsPath));
      this.app.use(this.apiDocsPath, swaggerUI.serve, swaggerUI.setup(apiDocs));

      this.routes.connect();

      this.onStop();

      this.app.use(ServerExceptionHandler);
    } catch (error) {
      if (error instanceof Error) {
        const appError = new AppException(StatusCode.INTERNAL_SERVER_ERROR, error.message);
        ExceptionHandler.handle(appError);
      }
    }
  }

  async start(): Promise<void> {
    try {
      // Express server
      this.app.listen(this.port, () => {
        Logger.log(
          `${this.name}: started on port ${this.port} in environment ${EnvironmentUtils.getEnv()}`,
        );
      });

      // data storages
      await this.storages.connect();

      // RabbitMQ services
      await this.ampqServices.start();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private onStop() {
    process.on('SIGINT', async () => {
      try {
        await this.storages.disconnect();
        this.ampqServices.stop();

        Logger.log(`${this.name}: stopped`);
        process.exit(0);
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
}
