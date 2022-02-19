import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnobotStrategyEntity } from './EnobotStrategyEntity';

export class EnobotStrategyRepository implements Repository<EnobotStrategyEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotStrategyEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EnobotStrategyEntity): Promise<EnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EnobotStrategyEntity): Promise<EnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<EnobotStrategyEntity>,
  ): Promise<EnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EnobotStrategyEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EnobotStrategyEntity | EnobotStrategyEntity[] | null,
  ): EnobotStrategyEntity | EnobotStrategyEntity[] {
    const result = ClassTransformer.fromPlain(EnobotStrategyEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(EnobotStrategyEntity, result, true);
  }
}
