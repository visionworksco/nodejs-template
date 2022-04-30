import { ServerException, StatusCode } from '@visionworksco/nodejs-middleware';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { EnvironmentUtils } from './EnvironmentUtils';

export class Environment {
  static init() {
    const dotenvResult = dotenv.config({ path: EnvironmentUtils.getEnvFilePath() });

    const result = dotenvExpand.expand(dotenvResult);
    if (result.error) {
      throw ServerException.create(StatusCode.INTERNAL_SERVER_ERROR, result.error.message);
    }
  }
}
