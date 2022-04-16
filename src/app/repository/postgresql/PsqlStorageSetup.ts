import { Logger } from '@visionworksco/nodejs-middleware';
import { Environment } from '../../environment/Environment';
import { PsqlStorage } from './PsqlStorage';
import { PsqlStorageConnection } from './PsqlStorageConnection';
import { PsqlTable } from './PsqlTable';

Environment.init();

const SQL_QUERY_BASE_API_ENTITY = `"id" SERIAL PRIMARY KEY,
        "_createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "createdAt" TEXT,
        "createdBy" TEXT,
        "updatedAt" TEXT,
        "updatedBy" TEXT,`;

export class PsqlStorageSetup {
  async run(): Promise<void> {
    try {
      const psqlConnection = new PsqlStorageConnection();
      let psqlStorage = null;
      let psql = null;
      let sqlQuery = '';

      // postgres db (system db), we need this to obtain a connection to create other db's
      try {
        const psqlConnectionSystem = new PsqlStorageConnection('postgres');
        psqlStorage = new PsqlStorage(psqlConnectionSystem);
        psql = await psqlStorage.connect();

        sqlQuery = `CREATE DATABASE ${psqlConnection.database};`;
        await psql.query(sqlQuery);
      } catch (error) {
        // skipping create database error,
        // this is a workaround as 'CREATE DATABASE IF NOT EXISTS' is not supported by PostgreSQL
      }

      // defined db
      psqlStorage = new PsqlStorage(psqlConnection);
      psql = await psqlStorage.connect();

      // Account table
      sqlQuery = `
      CREATE TABLE IF NOT EXISTS ${PsqlTable.ACCOUNT}(
        ${SQL_QUERY_BASE_API_ENTITY}
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "roles" TEXT[],
        "name" TEXT NOT NULL,
        "groups" TEXT[],
        "permissions" TEXT[]
      );
      `;
      await psql.query(sqlQuery);

      await psqlStorage.disconnect();

      Logger.log(`[${psqlStorage.name}] setup done`);

      return Promise.resolve();
    } catch (error) {
      Logger.error(error);
    }
  }
}
