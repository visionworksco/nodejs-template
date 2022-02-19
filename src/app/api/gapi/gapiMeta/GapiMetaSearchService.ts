import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseGapiApi } from '../../../service/BaseGapiApi';
import { GapiMetaEntity } from './GapiMetaEntity';
import { GapiMetaSearchEntity } from './GapiMetaSearchEntity';
import { GapiMetaSearchRepository } from './GapiMetaSearchRepository';
import MockGapiMetaSearch from './mock/MockGapiMetaSearch.json';

export class GapiMetaSearchService extends BaseApiCrudService<GapiMetaEntity> {
  constructor(repository: GapiMetaSearchRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<GapiMetaEntity>> {
    try {
      const endpoint = '/search/meta';

      const response = await BaseGapiApi.http().get<GapiMetaSearchEntity>(endpoint);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as GapiMetaEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const metas = data.metas;
      const collectionSize = metas.length;
      return Promise.resolve(new PageResult(metas, new Paginator('1', undefined, collectionSize)));
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const metas = MockGapiMetaSearch.metas as any as GapiMetaEntity[];
        const collectionSize = metas.length;
        return Promise.resolve(
          new PageResult(metas, new Paginator('1', undefined, collectionSize)),
        );
      } else {
        return Promise.reject(error);
      }
    }
  }
}
