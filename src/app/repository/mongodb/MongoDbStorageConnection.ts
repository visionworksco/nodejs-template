import { DbStorageConnection } from '@visionworksco/nodejs-middleware';

export class MongoDbStorageConnection implements DbStorageConnection {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;

  constructor() {
    const {
      MONGODB_HOST = '',
      MONGODB_PORT = 27017,
      MONGODB_DATABASE = '',
      MONGODB_USER = '',
      MONGODB_PASSWORD = '',
    } = process.env;

    this.host = MONGODB_HOST;
    this.port = Number(MONGODB_PORT);
    this.database = MONGODB_DATABASE;
    this.user = MONGODB_USER;
    this.password = MONGODB_PASSWORD;
  }

  getInfo(): string {
    return `${this.host}:${this.port}/${this.database}`;
  }
}
