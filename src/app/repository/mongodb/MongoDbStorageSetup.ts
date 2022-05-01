import { BaseDbStorageSetup, Logger } from '@visionworksco/nodejs-middleware';
import Products from '../../api/product/data/Products.json';
import { ProductModel } from '../../api/product/mongodb/ProductModel';
import { MongoDbStorage } from './MongoDbStorage';
import { MongoDbStorageConnection } from './MongoDbStorageConnection';

export class MongoDbStorageSetup extends BaseDbStorageSetup {
  constructor() {
    super(new MongoDbStorageConnection());
  }

  async create(): Promise<void> {
    try {
      await this.connect();

      await this.deleteAll();

      await ProductModel.insertMany(Products);

      await this.done();
    } catch (error) {
      Logger.error(error);
      await this.exit(1);
    }
  }

  async delete(): Promise<void> {
    try {
      await this.connect();

      await this.deleteAll();

      await this.done();
    } catch (error) {
      Logger.error(error);
      await this.exit(1);
    }
  }

  private async connect(): Promise<void> {
    try {
      this.dbStorage = new MongoDbStorage(this.dbStorageConnection);
      await this.dbStorage.connect();
    } catch (error) {
      Logger.error(error);
      await this.exit(1);
    }
  }

  private async deleteAll(): Promise<void> {
    try {
      await ProductModel.deleteMany({});
    } catch (error) {
      Logger.error(error);
      await this.exit(1);
    }
  }
}
