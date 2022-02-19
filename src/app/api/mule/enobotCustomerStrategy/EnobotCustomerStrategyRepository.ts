import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnobotCustomerStrategyEntity } from './EnobotCustomerStrategyEntity';

export class EnobotCustomerStrategyRepository implements Repository<EnobotCustomerStrategyEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotCustomerStrategyEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EnobotCustomerStrategyEntity): Promise<EnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EnobotCustomerStrategyEntity): Promise<EnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<EnobotCustomerStrategyEntity>,
  ): Promise<EnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EnobotCustomerStrategyEntity | EnobotCustomerStrategyEntity[] | null,
  ): EnobotCustomerStrategyEntity | EnobotCustomerStrategyEntity[] {
    const result = ClassTransformer.fromPlain(
      EnobotCustomerStrategyEntity,
      repositoryResult,
      false,
    );
    return ClassTransformer.fromPlain(EnobotCustomerStrategyEntity, result, true);
  }
}
