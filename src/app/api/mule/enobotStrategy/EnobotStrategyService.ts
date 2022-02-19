import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseMuleApi } from '../../../service/BaseMuleApi';
import { EnobotStrategyEntity } from './EnobotStrategyEntity';
import { EnobotStrategyRepository } from './EnobotStrategyRepository';
import MockEnobotStrategy from './mock/MockEnobotStrategy.json';

export class EnobotStrategyService extends BaseApiCrudService<EnobotStrategyEntity> {
  constructor(repository: EnobotStrategyRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotStrategyEntity>> {
    try {
      const endpoint = '/enobot/strategies';

      const response = await BaseMuleApi.http().get<EnobotStrategyEntity[]>(endpoint);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EnobotStrategyEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const collectionSize = data.length;
      return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = MockEnobotStrategy as any as EnobotStrategyEntity[];
        const collectionSize = data.length;
        return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
      } else {
        return Promise.reject(error);
      }
    }
  }
}
