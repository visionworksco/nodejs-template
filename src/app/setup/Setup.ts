import { PsqlStorageSetup } from '../repository/postgresql/PsqlStorageSetup';

const run = async () => {
  const psqlStorageSetup = new PsqlStorageSetup();
  await psqlStorageSetup.run();
};

run();
