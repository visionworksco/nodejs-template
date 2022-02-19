import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { GapiMetaEntity } from './GapiMetaEntity';

export class GapiMetaSearchRepository implements Repository<GapiMetaEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<GapiMetaEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<GapiMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: GapiMetaEntity): Promise<GapiMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: GapiMetaEntity): Promise<GapiMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Partial<GapiMetaEntity>): Promise<GapiMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<GapiMetaEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: GapiMetaEntity | GapiMetaEntity[] | null,
  ): GapiMetaEntity | GapiMetaEntity[] {
    const result = ClassTransformer.fromPlain(GapiMetaEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(GapiMetaEntity, result, true);
  }
}
