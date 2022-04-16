import { DbStorageConnection } from '@visionworksco/nodejs-middleware';
import { Config } from '../../config/Config';

export class MongoDbStorageConnection implements DbStorageConnection {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;

  constructor() {
    this.host = Config.get('MONGODB_HOST');
    this.port = Number(Config.get('MONGODB_PORT'));
    this.database = Config.get('MONGODB_DATABASE');
    this.user = Config.get('MONGODB_USER');
    this.password = Config.get('MONGODB_PASSWORD');
  }

  getInfo(): string {
    return `${this.host}:${this.port}/${this.database}`;
  }
}
