import { DbStorageConnection } from '@visionworksco/nodejs-middleware';
import { Config } from '../../config/Config';

export class PsqlStorageConnection implements DbStorageConnection {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;

  constructor(database?: string) {
    this.host = Config.get('POSTGRESQL_HOST');
    this.port = Number(Config.get('POSTGRESQL_PORT'));
    this.database = database ?? Config.get('POSTGRESQL_DATABASE');
    this.user = Config.get('POSTGRESQL_USER');
    this.password = Config.get('POSTGRESQL_PASSWORD');
  }

  getInfo(): string {
    return `${this.host}:${this.port}/${this.database}`;
  }
}
