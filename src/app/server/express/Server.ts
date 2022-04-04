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
  Storage,
  UrlEncoder,
} from '@visionworksco/nodejs-middleware';
import chalk from 'chalk';
import express, { Application } from 'express';
import ora from 'ora';
import swaggerUI from 'swagger-ui-express';
import apiDocs from '../../../docs';
import { AmpqCmdExchangeService } from '../../api/ampq/ampqCmdExchange/AmpqCmdExchangeService';
import { Config } from '../../config/Config';
import { EnvironmentUtils } from '../../environment/EnvironmentUtils';
import { MongoDbStorage } from '../../repository/mongodb/MongoDbStorage';
import { MongoDbStorageConnection } from '../../repository/mongodb/MongoDbStorageConnection';
import { PsqlStorage } from '../../repository/postgresql/PsqlStorage';
import { PsqlStorageConnection } from '../../repository/postgresql/PsqlStorageConnection';
import { AmpqServices } from './AmpqServices';
import { Routes } from './Routes';
import { Storages } from './Storages';

export class Server {
  private name: string;
  private port: number;
  private app: Application;
  private storages: Storages;
  private psqlStorage: Storage;
  private mongoDbStorage: Storage;
  private ampqServices: AmpqServices;
  private routes: Routes;
  private fileUploadsPath: string;
  private apiDocsPath: string;

  constructor() {
    this.app = express();
    this.name = 'Express.js';
    this.port = Number(process.env.PORT) || 3000;

    this.fileUploadsPath = EnvironmentUtils.getFileUploadsPath();
    this.apiDocsPath = EnvironmentUtils.getApiDocsPaths();

    this.psqlStorage = new PsqlStorage(new PsqlStorageConnection());
    this.mongoDbStorage = new MongoDbStorage(new MongoDbStorageConnection());
    this.storages = new Storages(this.psqlStorage, this.mongoDbStorage);

    this.ampqServices = new AmpqServices(new AmpqCmdExchangeService());

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
      const consoleSpinner = ora();

      // data storage
      consoleSpinner.start('Connecting data storage...');
      await this.storages.connect();

      // routes
      await this.routes.register(this.psqlStorage);

      // server
      consoleSpinner.start('Starting server...');
      this.app.listen(this.port, () => {
        consoleSpinner.succeed(
          chalk.green(
            `[${this.name}] started at http://localhost:${
              this.port
            } in environment ${EnvironmentUtils.getEnv()}`,
          ),
        );
      });

      // message broker
      consoleSpinner.start('Starting message broker...');
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

        Logger.log(`[${this.name}] stopped`);
        process.exit(0);
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
}
