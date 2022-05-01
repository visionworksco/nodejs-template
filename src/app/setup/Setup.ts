import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { Environment } from '../environment/Environment';
import { MongoDbStorageSetup } from '../repository/mongodb/MongoDbStorageSetup';
import { PsqlStorageSetup } from '../repository/postgresql/PsqlStorageSetup';

Environment.init();

const run = async () => {
  const argv = yargs(hideBin(process.argv))
    .options({
      action: { type: 'string', default: 'create' },
    })
    .parseSync();

  const psqlStorageSetup = new PsqlStorageSetup();
  const mongoDbStorageSetup = new MongoDbStorageSetup();

  switch (argv.action) {
    case 'create':
      // await psqlStorageSetup.create();
      await mongoDbStorageSetup.create();
      break;
    case 'delete':
      await psqlStorageSetup.delete();
      await mongoDbStorageSetup.delete();
      break;
    default:
      break;
  }
};

run();
