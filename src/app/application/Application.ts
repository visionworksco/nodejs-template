import { ExceptionHandler, Logger } from '@visionworksco/nodejs-middleware';
import 'reflect-metadata';
import { Environment } from '../environment/Environment';
import { Server } from '../server/express/Server';

export class Application {
  private name: string;
  private server: Server;

  constructor() {
    this.name = 'Application';
    new Environment();
    this.server = new Server();
  }

  async start(): Promise<void> {
    try {
      Logger.log(`[${this.name}] starting...`);
      await this.server.start();
      Logger.log(`[${this.name}] started`);
    } catch (error) {
      if (error instanceof Error) {
        ExceptionHandler.handle(error);
      }
    }
  }
}
