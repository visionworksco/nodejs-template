import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { AxiosRequestConfig } from 'axios';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseMuleApi } from '../../../service/BaseMuleApi';
import { EpexPublicTradeContractEntity } from './EpexPublicTradeContractEntity';
import { EpexPublicTradeContractPageRequestOptions } from './EpexPublicTradeContractPageRequestOptions';
import { EpexPublicTradeContractRepository } from './EpexPublicTradeContractRepository';
import epexPublicTradeContract from './mock/EpexPublicTradeContract.json';

const END_POINT = '/postgres/getdata';
const TABlE = 'pblctrade_contract';

export class EpexPublicTradeContractService extends BaseApiCrudService<EpexPublicTradeContractEntity> {
  constructor(repository: EpexPublicTradeContractRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexPublicTradeContractEntity>> {
    try {
      const { query } = pageRequest;
      const queryEntity = ClassTransformer.fromPlain(
        EpexPublicTradeContractPageRequestOptions,
        query,
      );

      const endpoint = `${END_POINT}`;
      const config: AxiosRequestConfig = {
        params: {
          ...queryEntity,
          table: TABlE,
        },
      };

      const response = await BaseMuleApi.http().get<EpexPublicTradeContractEntity[]>(
        endpoint,
        config,
      );
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EpexPublicTradeContractEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const collectionSize = data.length;
      return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = epexPublicTradeContract as any as EpexPublicTradeContractEntity[];
        const collectionSize = data.length;
        return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
      } else {
        return Promise.reject(error);
      }
    }
  }
}
