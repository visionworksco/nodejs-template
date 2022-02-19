import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { AxiosRequestConfig } from 'axios';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseMuleApi } from '../../../service/BaseMuleApi';
import { EpexObContractEntity } from './EpexObContractEntity';
import { EpexObContractPageRequestOptions } from './EpexObContractPageRequestOptions';
import { EpexObContractRepository } from './EpexObContractRepository';
import epexObContract from './mock/EpexObContract.json';

const END_POINT = '/postgres/getdata';
const TABlE = 'ob_contract';

export class EpexObContractService extends BaseApiCrudService<EpexObContractEntity> {
  constructor(repository: EpexObContractRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexObContractEntity>> {
    try {
      const { query } = pageRequest;
      const queryEntity = ClassTransformer.fromPlain(EpexObContractPageRequestOptions, query);

      const endpoint = `${END_POINT}`;
      const config: AxiosRequestConfig = {
        params: {
          ...queryEntity,
          table: TABlE,
        },
      };

      const response = await BaseMuleApi.http().get<EpexObContractEntity[]>(endpoint, config);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EpexObContractEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const collectionSize = data.length;
      return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = epexObContract as any as EpexObContractEntity[];
        const collectionSize = data.length;
        return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
      } else {
        return Promise.reject(error);
      }
    }
  }
}
