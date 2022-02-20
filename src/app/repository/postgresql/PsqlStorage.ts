import {
  DbStorageConnection,
  Logger,
  ServerException,
  StatusCode,
  Storage,
} from '@visionworksco/nodejs-middleware';
import { Pool } from 'pg';

export class PsqlStorage implements Storage {
  private name: string;
  private connection: DbStorageConnection;
  private _pool: Pool | null;

  constructor(connection: DbStorageConnection) {
    this.name = 'PostgreSQL';
    this.connection = connection;
    this._pool = null;
  }

  get pool() {
    return this._pool;
  }

  async connect(): Promise<void> {
    try {
      const { host, database, port, user, password } = this.connection;

      const psqlConfig = {
        host,
        database,
        port,
        user,
        password,
      };

      this._pool = new Pool(psqlConfig);

      this._pool.on('error', (error, client) => {
        throw ServerException.create(StatusCode.INTERNAL_SERVER_ERROR, error.message);
      });

      Logger.log(`[${this.name}] connected to ${this.connection.getInfo()}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (!this._pool) {
        return;
      }

      await this._pool.end();
      Logger.log(`[${this.name}] disconnected`);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
