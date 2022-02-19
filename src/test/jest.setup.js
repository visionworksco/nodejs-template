require('reflect-metadata');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const getEnv = () => {
  return process.env.NODE_ENV || 'test';
};

const getEnvFilePath = () => {
  return './.env.' + getEnv();
};

const setup = () => {
  const env = dotenv.config({
    path: getEnvFilePath(),
  });

  const envParsed = dotenvExpand(env);
  if (envParsed.error) {
    throw new Error('Error parsing application environment');
  }
};

setup();
