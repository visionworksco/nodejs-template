import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnobotTimeSerieEntity } from '../../../type/EnobotTimeSerieEntity';

export class GapiSearchRepository implements Repository<EnobotTimeSerieEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotTimeSerieEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EnobotTimeSerieEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EnobotTimeSerieEntity): Promise<EnobotTimeSerieEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EnobotTimeSerieEntity): Promise<EnobotTimeSerieEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<EnobotTimeSerieEntity>,
  ): Promise<EnobotTimeSerieEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EnobotTimeSerieEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EnobotTimeSerieEntity | EnobotTimeSerieEntity[] | null,
  ): EnobotTimeSerieEntity | EnobotTimeSerieEntity[] {
    const result = ClassTransformer.fromPlain(EnobotTimeSerieEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(EnobotTimeSerieEntity, result, true);
  }
}
