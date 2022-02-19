import { Options } from 'amqplib';
import fs from 'fs';
import { Config } from '../../config/Config';
import { EnvironmentUtils } from '../../environment/EnvironmentUtils';

const connectionOptions = (): Options.Connect => {
  let hostname = '';

  if (
    EnvironmentUtils.isEnvDevelopmentLocal() ||
    (EnvironmentUtils.isEnvDevelopment() && EnvironmentUtils.isDebug())
  ) {
    // start:dev, start:dev:mock, start:stage
    hostname = Config.get('RABBITMQ_HOSTS');
  } else {
    // TODO: get a hardcoded value as the value from .env_dev or .env_production file is not working due to a DevOps issue
    hostname = 'rmq01.dev.enocloud.eu';
  }

  return {
    ...Config.get('RabbitMQ'),
    hostname,
    username: Config.get('RABBITMQ_USER'),
    password: Config.get('RABBITMQ_PASS'),
  };
};

const socketOptions = (): any => {
  const certFile: string = Config.get('RABBITMQ_SSL_CERTFILE') || '';
  const keyFile: string = Config.get('RABBITMQ_SSL_KEYFILE') || '';
  const caFile: string = Config.get('RABBITMQ_SSL_CAFILE') || '';
  if (certFile.length === 0 || keyFile.length === 0 || caFile.length === 0) {
    return;
  }

  return {
    rejectUnauthorized: false,
    noDelay: true,
    cert: fs.readFileSync(certFile),
    key: fs.readFileSync(keyFile),
    ca: [fs.readFileSync(caFile)],
  };
};

export const AmpqConfig = {
  connectionOptions,
  socketOptions,
};
