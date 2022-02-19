import { ExceptionHandler, Logger } from '@visionworksco/nodejs-middleware';
import 'reflect-metadata';
import { Environment } from '../environment/Environment';
import { Server } from '../server/express/Server';

export class Application {
  private server: Server;

  constructor() {
    new Environment();
    this.server = new Server();
  }

  async start(): Promise<void> {
    try {
      await this.server.start();

      Logger.log('App: started');
    } catch (error) {
      if (error instanceof Error) {
        ExceptionHandler.handle(error);
      }
    }
  }
}
