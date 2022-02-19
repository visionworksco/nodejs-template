const ENV_DEV = 'dev';
const ENV_DEV_LOCAL = 'dev.local';

const getFileUploadsPath = (): string => {
  return process.env.FILE_UPLOADS_PATH ?? '/';
};

const getApiDocsPaths = (): string => {
  return process.env.FILE_UPLOADS_PATH ?? '/api-docs';
};

// ENO_ENV is set at the OS level: dev || production
const getEnv = (): string => {
  return process.env.ENO_ENV || ENV_DEV_LOCAL;
};

const getEnvFilePath = (): string => {
  return './.env_' + getEnv();
};

const isEnvDevLocal = (): boolean => {
  return getEnv() === ENV_DEV_LOCAL;
};

const isEnvDev = (): boolean => {
  return getEnv() === ENV_DEV;
};

const isMockData = (): boolean => {
  return process.env.MOCK_DATA === 'true';
};

const isDebug = (): boolean => {
  return process.env.DEBUG === 'true';
};

export const EnvironmentUtils = {
  getFileUploadsPath,
  getApiDocsPaths,
  getEnv,
  getEnvFilePath,
  isEnvDevLocal,
  isEnvDev,
  isMockData,
  isDebug,
};
