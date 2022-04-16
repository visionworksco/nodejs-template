import dotenv from 'dotenv';
import { EnvironmentUtils } from './EnvironmentUtils';

export class Environment {
  static init() {
    dotenv.config({
      path: EnvironmentUtils.getEnvFilePath(),
    });
  }
}
