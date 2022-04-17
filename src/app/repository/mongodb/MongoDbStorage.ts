import {
  ApplicationException,
  DbStorageConnection,
  Logger,
  StatusCode,
  Storage,
} from '@visionworksco/nodejs-middleware';
import mongoose, { ConnectOptions } from 'mongoose';

export class MongoDbStorage implements Storage {
  private name: string;
  private connection: DbStorageConnection;

  constructor(connection: DbStorageConnection) {
    this.name = 'MongoDB';
    this.connection = connection;
  }

  async connect(): Promise<void> {
    try {
      if (mongoose.connection.readyState === 1) {
        return Promise.resolve();
      }

      mongoose.connection.on('connected', () => {
        Logger.log(`[${this.name}] connected to ${this.connection.getInfo()}`);
      });

      mongoose.connection.on('disconnected', () => {
        Logger.log(`[${this.name}] disconnected`);
      });

      mongoose.connection.on('error', (error) => {
        throw new ApplicationException(StatusCode.INTERNAL_SERVER_ERROR, error);
      });

      const { host, port, database, user, password } = this.connection;
      const connectionUrl = `mongodb://${host}:${port}`;

      const connectionOptions: ConnectOptions = {
        dbName: database,
        user,
        pass: password,
      };

      await mongoose.connect(connectionUrl, connectionOptions);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
    } catch (error) {
      Promise.reject(error);
    }
  }
}
