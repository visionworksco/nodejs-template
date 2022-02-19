/**
 * @group unit
 */

import { ServerException } from '@visionworksco/expressjs-middleware';
import { SettingsRepository } from '../SettingsRepository';

jest.mock('pg');

describe('SettingsRepository', () => {
  let repository: SettingsRepository;

  beforeEach(() => {
    const pg: any = {};
    repository = new SettingsRepository(pg);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should throw when findAll', async () => {
    const pageRequest: any = {};
    await expect(repository.findAll(pageRequest)).rejects.toThrow(
      ServerException.NotImplementedException(),
    );
  });

  test('should throw when findOne', async () => {
    const query: any = {};
    await expect(repository.findOne(query)).rejects.toThrow(
      ServerException.NotImplementedException(),
    );
  });

  test('should throw when save', async () => {
    const entity: any = {};
    await expect(repository.save(entity)).rejects.toThrow(
      ServerException.NotImplementedException(),
    );
  });

  test('should throw when deleteById', async () => {
    const id = '';
    await expect(repository.deleteById(id)).rejects.toThrow(
      ServerException.NotImplementedException(),
    );
  });
});
