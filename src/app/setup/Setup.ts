import { Commander } from '@visionworksco/nodejs-middleware';
import { Environment } from '../environment/Environment';
import { MongoDbStorageSetup } from '../repository/mongodb/MongoDbStorageSetup';
import { PsqlStorageSetup } from '../repository/postgresql/PsqlStorageSetup';

Environment.init();

const run = async () => {
  const arg = Commander.arg({
    action: { type: 'string', default: 'create' },
  });

  const psqlStorageSetup = new PsqlStorageSetup();
  const mongoDbStorageSetup = new MongoDbStorageSetup();

  switch (arg.action) {
    case 'create':
      await psqlStorageSetup.create();
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
