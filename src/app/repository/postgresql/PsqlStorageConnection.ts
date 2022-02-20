import { DbStorageConnection } from '@visionworksco/nodejs-middleware';

export class PsqlStorageConnection implements DbStorageConnection {
  host: string;
  database: string;
  port: number;
  user: string;
  password: string;

  constructor() {
    const {
      POSTGRES_HOST = '',
      POSTGRES_DATABASE = '',
      POSTGRES_PORT = 5432,
      POSTGRES_USER = '',
      POSTGRES_PASSWORD = '',
    } = process.env;

    this.host = POSTGRES_HOST;
    this.database = POSTGRES_DATABASE;
    this.port = Number(POSTGRES_PORT);
    this.user = POSTGRES_USER;
    this.password = POSTGRES_PASSWORD;
  }

  getInfo(): string {
    return `${this.host}:${this.port}/${this.database}`;
  }
}
