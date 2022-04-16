import { ServerException, StatusCode } from '@visionworksco/nodejs-middleware';
import dotenvExpand from 'dotenv-expand';
import dotenvFlow from 'dotenv-flow';
import envalid from 'envalid';
import { EnvironmentUtils } from './EnvironmentUtils';

const { cleanEnv, str } = envalid;

export class Environment {
  constructor() {
    const env = dotenvFlow.config({
      path: EnvironmentUtils.getEnvFilePath(),
    });

    const envParsed = dotenvExpand(env);
    if (envParsed.error) {
      throw ServerException.create(
        StatusCode.INTERNAL_SERVER_ERROR,
        'Error parsing application environment',
      );
    }

    if (envParsed.parsed) {
      this.validate();
    }
  }

  private validate(): void {
    cleanEnv(process.env, {
      APP_NAME: str(),
    });
  }
}
