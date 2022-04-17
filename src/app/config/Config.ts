import Config from 'nconf';
import path from 'path';
import { Environment } from '../environment/Environment';

Environment.init();

Config
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env()
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    API_VERSION: 'v1',
    ACCESS_CONTROL_ALLOW_ORIGIN: '*',
    ACCESS_CONTROL_ALLOW_HEADERS:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,Cookie',
    ACCESS_CONTROL_ALLOW_METHODS: 'HEAD, GET, POST, PATCH, DELETE, OPTIONS',
    HTTP_TIMEOUT: 10000,
    API_DOC_PATH: '/api-doc',
    JWT_SECRET: 'JWT_SECRET',
    FILE_UPLOAD_PATH: '/',
    CLIENT_BUILD_PATH: '/',
    SERVICE_MONGODB: true,
    SERVICE_POSTGRESQL: false,
    SERVICE_RABBITMQ: false,
  })
  // 5. Required varaibles
  .required([]);

export { Config };
