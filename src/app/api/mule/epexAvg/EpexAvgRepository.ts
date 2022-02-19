import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EpexAvgEntity } from './EpexAvgEntity';

export class EpexAvgRepository implements Repository<EpexAvgEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexAvgEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EpexAvgEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EpexAvgEntity): Promise<EpexAvgEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EpexAvgEntity): Promise<EpexAvgEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Partial<EpexAvgEntity>): Promise<EpexAvgEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EpexAvgEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EpexAvgEntity | EpexAvgEntity[] | null,
  ): EpexAvgEntity | EpexAvgEntity[] {
    const result = ClassTransformer.fromPlain(EpexAvgEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(EpexAvgEntity, result, true);
  }
}
