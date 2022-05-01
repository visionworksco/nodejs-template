import { ExceptionHandler, Logger } from '@visionworksco/nodejs-middleware';
import 'reflect-metadata';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore:next-line
import packageJson from '../../../package.json';
import { Environment } from '../environment/Environment';
import { Server } from '../server/express/Server';

export class Application {
  private name: string;
  private server: Server;

  constructor() {
    this.name = 'Application';
    Environment.init();
    this.server = new Server();
  }

  async start(): Promise<void> {
    try {
      Logger.log(`[${this.name}] starting...`);
      await this.server.start();
      Logger.log(`[${this.name}] started ${packageJson.name}:${packageJson.version}`);
    } catch (error) {
      if (error instanceof Error) {
        ExceptionHandler.handle(error);
      }
    }
  }
}
