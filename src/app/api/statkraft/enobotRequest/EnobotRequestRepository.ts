import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnobotRequestEntity } from './EnobotRequestEntity';

export class EnobotRequestRepository implements Repository<EnobotRequestEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotRequestEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EnobotRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EnobotRequestEntity): Promise<EnobotRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EnobotRequestEntity): Promise<EnobotRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Partial<EnobotRequestEntity>): Promise<EnobotRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EnobotRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EnobotRequestEntity | EnobotRequestEntity[] | null,
  ): EnobotRequestEntity | EnobotRequestEntity[] {
    const result = ClassTransformer.fromPlain(EnobotRequestEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(EnobotRequestEntity, result, true);
  }
}
