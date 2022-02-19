import { ServerException, StatusCode } from '@visionworksco/expressjs-middleware';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { EnvironmentUtils } from './EnvironmentUtils';

export class Environment {
  constructor() {
    const env = dotenv.config({
      path: EnvironmentUtils.getEnvFilePath(),
    });

    const envParsed = dotenvExpand(env);
    if (envParsed.error) {
      throw ServerException.create(
        StatusCode.INTERNAL_SERVER_ERROR,
        'Error parsing application environment',
      );
    }
  }
}
