import {
  AppException,
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
        throw new AppException(StatusCode.INTERNAL_SERVER_ERROR, error);
      });

      const connectionOptions: ConnectOptions = {
        dbName: this.connection.database,
        user: this.connection.user,
        pass: this.connection.password,
      };

      await mongoose.connect(this.connection.host, connectionOptions);
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
