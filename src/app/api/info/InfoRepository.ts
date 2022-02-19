import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../class/ClassTransformer';
import { InfoEntity } from './InfoEntity';

export class InfoRepository implements Repository<InfoEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<InfoEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<InfoEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: InfoEntity): Promise<InfoEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: InfoEntity): Promise<InfoEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Partial<InfoEntity>): Promise<InfoEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<InfoEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: InfoEntity | InfoEntity[] | null,
  ): InfoEntity | InfoEntity[] {
    const result = ClassTransformer.fromPlain(InfoEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(InfoEntity, result, true);
  }
}
