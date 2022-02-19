import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer } from '../../class/ClassTransformer';
import { HeartbeatsEntity } from './HeartbeatsEntity';

export class HeartbeatsRepository implements Repository<HeartbeatsEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<HeartbeatsEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<HeartbeatsEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: HeartbeatsEntity): Promise<HeartbeatsEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: HeartbeatsEntity): Promise<HeartbeatsEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Partial<HeartbeatsEntity>): Promise<HeartbeatsEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<HeartbeatsEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: HeartbeatsEntity | HeartbeatsEntity[] | null,
  ): HeartbeatsEntity | HeartbeatsEntity[] {
    const result = ClassTransformer.fromPlain(HeartbeatsEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(HeartbeatsEntity, result, true);
  }
}
