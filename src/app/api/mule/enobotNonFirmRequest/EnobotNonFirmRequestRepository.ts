import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnobotNonFirmRequestEntity } from './EnobotNonFirmRequestEntity';

export class EnobotNonFirmRequestRepository implements Repository<EnobotNonFirmRequestEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotNonFirmRequestEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EnobotNonFirmRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EnobotNonFirmRequestEntity): Promise<EnobotNonFirmRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EnobotNonFirmRequestEntity): Promise<EnobotNonFirmRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<EnobotNonFirmRequestEntity>,
  ): Promise<EnobotNonFirmRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EnobotNonFirmRequestEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EnobotNonFirmRequestEntity | EnobotNonFirmRequestEntity[] | null,
  ): EnobotNonFirmRequestEntity | EnobotNonFirmRequestEntity[] {
    const result = ClassTransformer.fromPlain(EnobotNonFirmRequestEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(EnobotNonFirmRequestEntity, result, true);
  }
}
