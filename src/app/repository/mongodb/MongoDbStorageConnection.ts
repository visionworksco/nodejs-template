import { DbStorageConnection } from '@visionworksco/nodejs-middleware';

export class MongoDbStorageConnection implements DbStorageConnection {
  host: string;
  database: string;
  port: number;
  user: string;
  password: string;

  constructor() {
    const {
      MONGODB_HOST = '',
      MONGODB_NAME = '',
      MONGODB_USER = '',
      MONGODB_USER_PASSWORD = '',
    } = process.env;

    this.host = MONGODB_HOST;
    this.database = MONGODB_NAME;
    this.port = 27017;
    this.user = MONGODB_USER;
    this.password = MONGODB_USER_PASSWORD;
  }

  getInfo(): string {
    return `${this.host}/${this.database}`;
  }
}
