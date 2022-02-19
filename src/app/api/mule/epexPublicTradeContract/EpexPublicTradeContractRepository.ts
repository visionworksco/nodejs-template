import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EpexPublicTradeContractEntity } from './EpexPublicTradeContractEntity';

export class EpexPublicTradeContractRepository
  implements Repository<EpexPublicTradeContractEntity>
{
  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexPublicTradeContractEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<EpexPublicTradeContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: EpexPublicTradeContractEntity): Promise<EpexPublicTradeContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: EpexPublicTradeContractEntity): Promise<EpexPublicTradeContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(
    id: string,
    query: Partial<EpexPublicTradeContractEntity>,
  ): Promise<EpexPublicTradeContractEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<EpexPublicTradeContractEntity> {
    throw ServerException.NotImplementedException();
  }

  protected normalize(
    repositoryResult: EpexPublicTradeContractEntity | EpexPublicTradeContractEntity[] | null,
  ): EpexPublicTradeContractEntity | EpexPublicTradeContractEntity[] {
    const result = ClassTransformer.fromPlain(
      EpexPublicTradeContractEntity,
      repositoryResult,
      false,
    );
    return ClassTransformer.fromPlain(EpexPublicTradeContractEntity, result, true);
  }
}
