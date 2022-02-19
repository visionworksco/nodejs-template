import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { AmpqEnobotCustomerStrategyEntity } from './AmpqEnobotCustomerStrategyEntity';

export class AmpqEnobotCustomerStrategyRepository
  implements Repository<AmpqEnobotCustomerStrategyEntity>
{
  async findAll(pageRequest: PageRequest): Promise<PageResult<AmpqEnobotCustomerStrategyEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<AmpqEnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: Object): Promise<AmpqEnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: AmpqEnobotCustomerStrategyEntity): Promise<AmpqEnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Object): Promise<AmpqEnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<AmpqEnobotCustomerStrategyEntity> {
    throw ServerException.NotImplementedException();
  }
}
