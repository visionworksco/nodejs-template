import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EpexObContractEntity } from './EpexObContractEntity';

export class EpexObContractRepository implements Repository<EpexObContractEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexObContractEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EpexObContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EpexObContractEntity): Promise<EpexObContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EpexObContractEntity): Promise<EpexObContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<EpexObContractEntity>,
  ): Promise<EpexObContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EpexObContractEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EpexObContractEntity | EpexObContractEntity[] | null,
  ): EpexObContractEntity | EpexObContractEntity[] {
    const result = ClassTransformer.fromPlain(EpexObContractEntity, repositoryResult, false);
    return ClassTransformer.fromPlain(EpexObContractEntity, result, true);
  }
}
