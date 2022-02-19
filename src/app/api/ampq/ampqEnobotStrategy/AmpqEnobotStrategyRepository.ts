import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { AmpqEnobotStrategyEntity } from './AmpqEnobotStrategyEntity';

export class AmpqEnobotStrategyRepository implements Repository<AmpqEnobotStrategyEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<AmpqEnobotStrategyEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<AmpqEnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: Object): Promise<AmpqEnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: AmpqEnobotStrategyEntity): Promise<AmpqEnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Object): Promise<AmpqEnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<AmpqEnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }
}
