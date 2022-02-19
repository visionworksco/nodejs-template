const { Pool } = require('pg');
const SettingsDefault = require('../../../api/settings/data/SettingsDefault.json');

const ENO_ENV = process.env.ENO_ENV || 'dev';
const envFilePath = './.env_' + ENO_ENV;
require('dotenv').config({ path: envFilePath });

const psql = (database) => {
  const psqlConfig = () => {
    return {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    };
  };

  return new Pool(psqlConfig());
};

const dbSetup = async () => {
  try {
    // create database
    const dbName = process.env.POSTGRES_DATABASE || '';
    if (dbName.length === 0) {
      return;
    }

    let psqlInstance;
    let sqlQuery = '';
    try {
      psqlInstance = psql('postgres');
      sqlQuery = `CREATE DATABASE ${dbName};`;
      await psqlInstance.query(sqlQuery);
    } catch (error) {
      // skipping create database error,
      // this is a workaround as 'CREATE DATABASE IF NOT EXISTS' is not supported by PostgreSQL
    }

    // create tables
    psqlInstance = psql(process.env.POSTGRES_DATABASE);

    // account
    sqlQuery = `
    CREATE TABLE IF NOT EXISTS account(
      "id" SERIAL PRIMARY KEY,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "createdAt" TEXT,
      "createdBy" TEXT,
      "updatedAt" TEXT,
      "updatedBy" TEXT,
      "email" TEXT NOT NULL UNIQUE,
      "password" TEXT NOT NULL,
      "roles" TEXT[],
      "name" TEXT NOT NULL,
      "groups" TEXT[],
      "permissions" TEXT[]
    );
    `;
    await psqlInstance.query(sqlQuery);

    // chartWidget
    sqlQuery = `
    CREATE TABLE IF NOT EXISTS chartWidget(
      "id" SERIAL PRIMARY KEY,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "createdAt" TEXT,
      "createdBy" TEXT,
      "updatedAt" TEXT,
      "updatedBy" TEXT,
      "name" TEXT NOT NULL,
      "data" JSON NOT NULL
    );
    `;
    await psqlInstance.query(sqlQuery);

    // accountChartWidget
    sqlQuery = `
    CREATE TABLE IF NOT EXISTS accountChartWidget(
      "id" SERIAL PRIMARY KEY,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "createdAt" TEXT,
      "createdBy" TEXT,
      "updatedAt" TEXT,
      "updatedBy" TEXT,
      "accountId" INTEGER NOT NULL,
      "chartWidgetId" INTEGER NOT NULL,
      FOREIGN KEY ("accountId") REFERENCES account(id),
      FOREIGN KEY ("chartWidgetId") REFERENCES chartWidget(id),
      UNIQUE ("accountId", "chartWidgetId")
    );
    `;
    await psqlInstance.query(sqlQuery);

    // cmdExchangeLog
    sqlQuery = `
    CREATE TABLE IF NOT EXISTS cmdExchangeLog(
      "id" SERIAL PRIMARY KEY,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "createdAt" TEXT,
      "createdBy" TEXT,
      "updatedAt" TEXT,
      "updatedBy" TEXT,
      "data" JSON NOT NULL
    );
    `;
    await psqlInstance.query(sqlQuery);

    // settings
    sqlQuery = `
    CREATE TABLE IF NOT EXISTS settings(
      "id" SERIAL PRIMARY KEY,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "createdAt" TEXT,
      "createdBy" TEXT,
      "updatedAt" TEXT,
      "updatedBy" TEXT,
      "data" JSON NOT NULL
    );
    `;
    await psqlInstance.query(sqlQuery);

    // settings default values
    const createdAt = new Date().toJSON();
    const createdBy = 'server';
    const dataJson = SettingsDefault.data;

    sqlQuery = `
    INSERT INTO settings("createdAt", "createdBy", "data") 
    VALUES($1, $2, $3) 
    RETURNING *
    `;
    await psqlInstance.query(sqlQuery, [createdAt, createdBy, dataJson]);

    // eslint-disable-next-line no-console
    console.log('postgresql:', 'Setup done');

    return Promise.resolve();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  dbSetup,
};
