const ENV_DEVELOPMENT = 'development';
const ENV_DEVELOPMENT_LOCAL = 'development.local';

const getFileUploadsPath = (): string => {
  return process.env.FILE_UPLOADS_PATH ?? '/';
};

const getApiDocsPaths = (): string => {
  return process.env.API_DOC_PATH ?? '/api-doc';
};

const getEnv = (): string => {
  return process.env.NODE_ENV || ENV_DEVELOPMENT_LOCAL;
};

const getEnvFilePath = (): string => {
  return './.env.' + getEnv();
};

const isEnvDevelopmentLocal = (): boolean => {
  return getEnv() === ENV_DEVELOPMENT_LOCAL;
};

const isEnvDevelopment = (): boolean => {
  return getEnv() === ENV_DEVELOPMENT;
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
  isEnvDevelopmentLocal,
  isEnvDevelopment,
  isMockData,
  isDebug,
};
