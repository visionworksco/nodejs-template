import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EpexMetaEntity } from './EpexMetaEntity';

export class EpexMetaRepository implements Repository<EpexMetaEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexMetaEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EpexMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EpexMetaEntity): Promise<EpexMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EpexMetaEntity): Promise<EpexMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Partial<EpexMetaEntity>): Promise<EpexMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EpexMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EpexMetaEntity | EpexMetaEntity[] | null,
  ): EpexMetaEntity | EpexMetaEntity[] {
    const result = ClassTransformer.fromPlain(EpexMetaEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(EpexMetaEntity, result, true);
  }
}
