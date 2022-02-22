import dotenv from 'dotenv';
import Config from 'nconf';
import path from 'path';
import { EnvironmentUtils } from '../environment/EnvironmentUtils';

dotenv.config({
  path: EnvironmentUtils.getEnvFilePath(),
});

Config
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env()
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    AppConfig: {
      API_VERSION: 'v1',
      ACCESS_CONTROL_ALLOW_ORIGIN: '*',
      ACCESS_CONTROL_ALLOW_HEADERS:
        'Origin,X-Requested-With,Content-Type,Accept,Authorization,Cookie',
      ACCESS_CONTROL_ALLOW_METHODS: 'HEAD, GET, POST, PATCH, DELETE, OPTIONS',
      HTTP_TIMEOUT: 10000,
      GAPI_HOST_PREFIX: 'https://gapi.',
      STATKRAFT_HOST_PREFIX: 'https://statkraft.',
      MULE_API_URL: '/api',
      MULE_API_VERSION: 'v1',
    },
    RabbitMQ: {
      protocol: 'amqps',
      port: 5671,
      vhost: EnvironmentUtils.isEnvDevelopmentLocal() ? 'vxdqrvec' : 'enobot',
      heartbeat: 30,
    },
    // TODO: remove MULE_HOST, MULE_USER, MULE_PASS when Thilo add to env file
    MULE_HOST: 'https://enovos-intraday-ops-ux-api-dev.de-c1.cloudhub.io',
    MULE_USER: '146b00f7a43d45249f1d25632b028a20',
    MULE_PASS: '6F63dA4F23E14650Af8BfA0847f54115',
  });

export { Config };
