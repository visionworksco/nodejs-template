/**
 * @group unit
 */

import { ServerException } from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../../../class/ClassTransformer';
import { EnobotRequestEntity } from '../EnobotRequestEntity';
import { EnobotRequestRepository } from '../EnobotRequestRepository';

const repositoryResult: any = {};
class MockEnobotRequestRepository extends EnobotRequestRepository {
  constructor() {
    super();

    this.normalize(repositoryResult);
  }
}

describe('EnobotRequestRepository', () => {
  let repository: EnobotRequestRepository;

  beforeEach(() => {
    repository = new EnobotRequestRepository();
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

  test('should throw when findById', async () => {
    const id = '';
    await expect(repository.findById(id)).rejects.toThrow(
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

  test('should throw when updateById', async () => {
    const id = '';
    const query: any = {};
    await expect(repository.updateById(id, query)).rejects.toThrow(
      ServerException.NotImplementedException(),
    );
  });

  test('should throw when deleteById', async () => {
    const id = '';
    await expect(repository.deleteById(id)).rejects.toThrow(
      ServerException.NotImplementedException(),
    );
  });

  test('should normalize', () => {
    const spyFromPlain = jest.spyOn(ClassTransformer, 'fromPlain').mockName('fromPlain');

    new MockEnobotRequestRepository();

    expect(spyFromPlain).toHaveBeenCalledTimes(2);
    expect(spyFromPlain).toHaveBeenNthCalledWith(1, EnobotRequestEntity, repositoryResult, false);
    expect(spyFromPlain).toHaveBeenNthCalledWith(2, EnobotRequestEntity, repositoryResult, true);

    expect(spyFromPlain).toHaveReturnedTimes(2);
    expect(spyFromPlain).toHaveNthReturnedWith(1, repositoryResult);
    expect(spyFromPlain).toHaveNthReturnedWith(2, repositoryResult);
  });
});
