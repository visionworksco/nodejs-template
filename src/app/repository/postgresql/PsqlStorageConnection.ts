import { DbStorageConnection } from '@visionworksco/nodejs-middleware';

export class PsqlStorageConnection implements DbStorageConnection {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;

  constructor(database?: string) {
    const {
      POSTGRES_HOST = '',
      POSTGRES_PORT = 5432,
      POSTGRES_DATABASE = '',
      POSTGRES_USER = '',
      POSTGRES_PASSWORD = '',
    } = process.env;

    this.host = POSTGRES_HOST;
    this.port = Number(POSTGRES_PORT);
    this.database = database ?? POSTGRES_DATABASE;
    this.user = POSTGRES_USER;
    this.password = POSTGRES_PASSWORD;
  }

  getInfo(): string {
    return `${this.host}:${this.port}/${this.database}`;
  }
}
