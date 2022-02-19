import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseMuleApi } from '../../../service/BaseMuleApi';
import { EnobotStrategyDataEntity } from '../enobotStrategyData/EnobotStrategyDataEntity';
import { EnobotCustomerStrategyEntity } from './EnobotCustomerStrategyEntity';
import { EnobotCustomerStrategyRepository } from './EnobotCustomerStrategyRepository';
import MockCustomerEnobotStrategy from './mock/MockCustomerEnobotStrategy.json';

export class EnobotCustomerStrategyService extends BaseApiCrudService<EnobotCustomerStrategyEntity> {
  constructor(repository: EnobotCustomerStrategyRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotCustomerStrategyEntity>> {
    try {
      const endpoint = '/enobot/strategies/customer-mapping';

      const response = await BaseMuleApi.http().get<EnobotCustomerStrategyEntity[]>(endpoint);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EnobotCustomerStrategyEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const dataTransformed = this.transformData(data);
      const collectionSize = dataTransformed.length;
      return Promise.resolve(
        new PageResult(dataTransformed, new Paginator('1', undefined, collectionSize)),
      );
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = MockCustomerEnobotStrategy as any as EnobotCustomerStrategyEntity[];
        const dataTransformed = this.transformData(data);
        const collectionSize = dataTransformed.length;
        return Promise.resolve(
          new PageResult(dataTransformed, new Paginator('1', undefined, collectionSize)),
        );
      } else {
        return Promise.reject(error);
      }
    }
  }

  private transformData(data: EnobotCustomerStrategyEntity[]): EnobotCustomerStrategyEntity[] {
    return data.map((entity) => {
      const entityTransfomed: EnobotCustomerStrategyEntity = {
        ...entity,
      };

      const strategyPayload = (entityTransfomed.strategy ?? '') as string;
      if (strategyPayload.length > 0) {
        const strategy = ClassTransformer.fromPlain(
          EnobotStrategyDataEntity,
          JSON.parse(strategyPayload),
        );
        entityTransfomed.strategy = strategy;
      }

      return entityTransfomed;
    });
  }
}
