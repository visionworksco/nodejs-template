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
    App: {},
  })
  // 5. Required varaibles
  .required([]);

export { Config };
