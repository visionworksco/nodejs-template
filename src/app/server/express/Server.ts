import {
  AmpqServices,
  ApplicationException,
  CookieParser,
  CorsHandler,
  ExceptionHandler,
  HttpLogger,
  JsonParser,
  Logger,
  ResponseHeadersHandler,
  ServerExceptionHandler,
  StaticFolderRegister,
  StatusCode,
  Storages,
  UrlEncoder,
} from '@visionworksco/nodejs-middleware';
import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import apiDocs from '../../../docs';
import { AmpqCmdExchangeService } from '../../api/ampq/ampqCmdExchange/AmpqCmdExchangeService';
import { Config } from '../../config/Config';
import { EnvironmentUtils } from '../../environment/EnvironmentUtils';
import { MongoDbStorage } from '../../repository/mongodb/MongoDbStorage';
import { MongoDbStorageConnection } from '../../repository/mongodb/MongoDbStorageConnection';
import { PsqlStorage } from '../../repository/postgresql/PsqlStorage';
import { PsqlStorageConnection } from '../../repository/postgresql/PsqlStorageConnection';
import { Routes } from './Routes';

export class Server {
  private name: string;
  private port: number;
  private app: Application;
  private storages: Storages;
  private psqlStorage: PsqlStorage | null;
  private mongoDbStorage: MongoDbStorage | null;
  private ampqServices: AmpqServices;
  private routes: Routes;
  private fileUploadPath: string;
  private apiDocPath: string;

  constructor() {
    this.app = express();
    this.name = 'Express.js';
    this.port = Number(Config.get('PORT'));

    this.apiDocPath = Config.get('API_DOC_PATH');

    this.fileUploadPath = Config.get('FILE_UPLOAD_PATH');

    this.psqlStorage = Config.get('SERVICE_POSTGRESQL')
      ? new PsqlStorage(new PsqlStorageConnection())
      : null;
    this.mongoDbStorage = Config.get('SERVICE_MONGODB')
      ? new MongoDbStorage(new MongoDbStorageConnection())
      : null;
    this.storages = new Storages(this.psqlStorage, this.mongoDbStorage);

    const rabbitMQService = Config.get('SERVICE_RABBITMQ') ? new AmpqCmdExchangeService() : null;
    this.ampqServices = new AmpqServices(rabbitMQService);

    this.routes = new Routes(this.app);

    try {
      this.app.use(
        ResponseHeadersHandler(
          Config.get('ACCESS_CONTROL_ALLOW_ORIGIN'),
          Config.get('ACCESS_CONTROL_ALLOW_HEADERS'),
          Config.get('ACCESS_CONTROL_ALLOW_METHODS'),
        ),
      );
      this.app.use(JsonParser());
      this.app.use(UrlEncoder());
      this.app.use(CookieParser());
      this.app.use(CorsHandler());

      if (['development', 'development.local'].includes(Config.get('NODE_ENV'))) {
        this.app.use(HttpLogger());
      }
      this.app.use(this.fileUploadPath, StaticFolderRegister(this.fileUploadPath));
      this.app.use(this.apiDocPath, swaggerUI.serve, swaggerUI.setup(apiDocs));

      this.onStop();

      this.app.use(ServerExceptionHandler);
    } catch (error) {
      if (error instanceof Error) {
        const appError = new ApplicationException(StatusCode.INTERNAL_SERVER_ERROR, error.message);
        ExceptionHandler.handle(appError);
      }
    }
  }

  async start(): Promise<void> {
    try {
      // data storage
      if (this.storages.size > 0) {
        Logger.log(`[${this.name}] connecting data storage...`);
        await this.storages.connect();
      }

      // routes
      await this.routes.register(this.psqlStorage);

      // server
      Logger.log(`[${this.name}] starting server...`);
      this.app.listen(this.port, () => {
        Logger.log(
          `[${this.name}] started at http://localhost:${
            this.port
          } in environment ${EnvironmentUtils.getEnv()}`,
        );
      });

      // message broker
      if (this.ampqServices.size > 0) {
        Logger.log(`[${this.name}] starting message broker...`);
        await this.ampqServices.start();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private onStop() {
    process.on('SIGINT', async () => {
      try {
        await this.storages.disconnect();
        this.ampqServices.stop();

        Logger.log(`[${this.name}] stopped`);
        process.exit(0);
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
}
