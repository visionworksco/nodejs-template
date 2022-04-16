const getEnv = (): string => {
  return process.env.NODE_ENV || '';
};

const getEnvFilePath = (): string => {
  return './.env.' + getEnv();
};

const isMockData = (): boolean => {
  return process.env.MOCK_DATA === 'true';
};

const isDebug = (): boolean => {
  return process.env.DEBUG === 'true';
};

export const EnvironmentUtils = {
  getEnv,
  getEnvFilePath,
  isMockData,
  isDebug,
};
