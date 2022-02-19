import { Storage } from '@visionworksco/expressjs-middleware';

// TODO: refactor to Mongodb + PSQL or MongodbStorages or remove
export class Storages {
  private storages: Storage[] = [];

  // TODO: not used?
  private register(storage: Storage) {
    this.storages.push(storage);
  }

  async connect(): Promise<void> {
    try {
      for (const storage of this.storages) {
        await storage.connect();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      for (const storage of this.storages) {
        await storage.disconnect();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
