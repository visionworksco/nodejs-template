require('reflect-metadata');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const ENV_DEV_LOCAL = 'uat';

const getEnv = () => {
  return process.env.ENO_ENV || ENV_DEV_LOCAL;
};

const getEnvFilePath = () => {
  return './.env_' + getEnv();
};

const setup = () => {
  const env = dotenv.config({
    path: getEnvFilePath(),
  });

  const envParsed = dotenvExpand(env);
  if (envParsed.error) {
    throw new Error(500, 'Error parsing application environment');
  }
};

setup();
