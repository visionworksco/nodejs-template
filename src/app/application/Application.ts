import { ExceptionHandler } from '@visionworksco/nodejs-middleware';
import 'reflect-metadata';
import { Environment } from '../environment/Environment';
import { Server } from '../server/express/Server';
const chalk = require('chalk');
const ora = require('ora');

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
      const consoleSpinner = ora();

      consoleSpinner.start(`[${this.name}] starting...`);
      await this.server.start();
      consoleSpinner.succeed(chalk.green(`[${this.name}] started`));
    } catch (error) {
      if (error instanceof Error) {
        ExceptionHandler.handle(error);
      }
    }
  }
}
