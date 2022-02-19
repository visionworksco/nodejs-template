import { PageRequest, PageResult, Paginator } from '@visionworksco/expressjs-middleware';
import { AxiosRequestConfig } from 'axios';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseMuleApi } from '../../../service/BaseMuleApi';
import { EpexAvgEntity } from './EpexAvgEntity';
import { EpexAvgPageRequestOptions } from './EpexAvgPageRequestOptions';
import { EpexAvgRepository } from './EpexAvgRepository';
import epexAvg from './mock/EpexAvg.json';

const END_POINT = '/postgres/getdata';
const TABlE = 'avg';

export class EpexAvgService extends BaseApiCrudService<EpexAvgEntity> {
  constructor(repository: EpexAvgRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexAvgEntity>> {
    try {
      const { query } = pageRequest;
      const queryEntity = ClassTransformer.fromPlain(EpexAvgPageRequestOptions, query);

      const endpoint = `${END_POINT}`;
      const config: AxiosRequestConfig = {
        params: {
          ...queryEntity,
          table: TABlE,
        },
      };

      const response = await BaseMuleApi.http().get<EpexAvgEntity[]>(endpoint, config);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EpexAvgEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const collectionSize = data.length;
      return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = epexAvg as any as EpexAvgEntity[];
        const collectionSize = data.length;
        return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
      } else {
        return Promise.reject(error);
      }
    }
  }
}
