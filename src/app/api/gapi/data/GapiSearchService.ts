import { DateUtils, PageRequest, Paginator } from '@visionworksco/nodejs-middleware';
import { AxiosRequestConfig } from 'axios';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseGapiApi } from '../../../service/BaseGapiApi';
import { EnobotTimeSerieEntity } from '../../../type/EnobotTimeSerieEntity';
import { GapiSearchEntity } from './GapiSearchEntity';
import { GapiSearchPageRequestOptions } from './GapiSearchPageRequestOptions';
import { GapiSearchPageResult } from './GapiSearchPageResult';
import { GapiSearchRepository } from './GapiSearchRepository';
import { GapiSearchType } from './GapiSearchType';
import MockGapiSearch from './mock/MockGapiSearch_ts_tp.json';

export class GapiSearchService extends BaseApiCrudService<EnobotTimeSerieEntity> {
  constructor(repository: GapiSearchRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<GapiSearchPageResult> {
    try {
      const { query } = pageRequest;
      const queryEntity = ClassTransformer.fromPlain(GapiSearchPageRequestOptions, query);

      const endpoint = '/search/data';
      const config: AxiosRequestConfig = {
        params: {
          ...queryEntity,
        },
      };

      const response = await BaseGapiApi.http().get<GapiSearchEntity>(endpoint, config);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new GapiSearchPageResult(
            'ts_tp',
            [] as EnobotTimeSerieEntity[],
            new Paginator('1', undefined, 0),
          ),
        );
      }

      const values = data.values;
      const collectionSize = values.length;
      const type = data.type;
      return Promise.resolve(
        new GapiSearchPageResult(
          type,
          this.sortTsAsc(values),
          new Paginator('1', undefined, collectionSize),
        ),
      );
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const values = MockGapiSearch.values as any[] as EnobotTimeSerieEntity[];
        const collectionSize = values.length;
        const type = MockGapiSearch.type as GapiSearchType;
        return Promise.resolve(
          new GapiSearchPageResult(
            type,
            this.sortTsAsc(values),
            new Paginator('1', undefined, collectionSize),
          ),
        );
      } else {
        return Promise.reject(error);
      }
    }
  }

  // sort series ts time value asc
  private sortTsAsc(values: EnobotTimeSerieEntity[]): EnobotTimeSerieEntity[] {
    const valuesSorted = values;
    valuesSorted.sort((a, b) => {
      if (!a.ts || !b.ts) {
        return 0;
      }

      const dateA = DateUtils.fromISOString(a.ts);
      const dateB = DateUtils.fromISOString(b.ts);
      return dateA.getTime() - dateB.getTime();
    });
    return valuesSorted;
  }
}
