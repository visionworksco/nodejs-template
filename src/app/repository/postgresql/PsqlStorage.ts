import {
  DbStorageConnection,
  Logger,
  ServerException,
  StatusCode,
  Storage,
} from '@visionworksco/nodejs-middleware';
import pg, { PoolConfig } from 'pg';

export class PsqlStorage implements Storage {
  private _name: string;
  private connection: DbStorageConnection;
  private pool: pg.Pool | null;

  constructor(connection: DbStorageConnection) {
    this._name = 'PostgreSQL';
    this.connection = connection;
    this.pool = null;
  }

  get psql(): pg.Pool | null {
    return this.pool;
  }

  get name(): string {
    return this._name;
  }

  async connect(): Promise<pg.Pool> {
    try {
      const { host, port, database, user, password } = this.connection;

      const psqlConfig: PoolConfig = {
        host,
        port,
        database,
        user,
        password,
      };

      this.pool = new pg.Pool(psqlConfig);
      if (!this.pool) {
        throw ServerException.create(
          StatusCode.INTERNAL_SERVER_ERROR,
          `Error connecting to ${this._name}`,
        );
      }

      this.pool.on('error', (error, client) => {
        throw ServerException.create(StatusCode.INTERNAL_SERVER_ERROR, error.message);
      });

      Logger.log(`[${this._name}] connected to ${this.connection.getInfo()}`);

      return Promise.resolve(this.pool);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (!this.pool) {
        return;
      }

      await this.pool.end();
      Logger.log(`[${this._name}] disconnected`);
    } catch (error) {
      Promise.reject(error);
    }
  }
}
