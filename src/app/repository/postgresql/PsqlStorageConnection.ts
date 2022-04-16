import { DbStorageConnection } from '@visionworksco/nodejs-middleware';

export class PsqlStorageConnection implements DbStorageConnection {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;

  constructor(database?: string) {
    const {
      POSTGRESQL_HOST = '',
      POSTGRESQL_PORT = 5432,
      POSTGRESQL_DATABASE = '',
      POSTGRESQL_USER = '',
      POSTGRESQL_PASSWORD = '',
    } = process.env;

    this.host = POSTGRESQL_HOST;
    this.port = Number(POSTGRESQL_PORT);
    this.database = POSTGRESQL_DATABASE;
    this.user = POSTGRESQL_USER;
    this.password = POSTGRESQL_PASSWORD;
  }

  getInfo(): string {
    return `${this.host}:${this.port}/${this.database}`;
  }
}
