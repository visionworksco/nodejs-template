import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseMuleApi } from '../../../service/BaseMuleApi';
import { EpexMetaEntity } from './EpexMetaEntity';
import { EpexMetaRepository } from './EpexMetaRepository';
import EpexMeta from './mock/EpexMeta.json';

const END_POINT = '/postgres/getdata';

export class EpexMetaService extends BaseApiCrudService<EpexMetaEntity> {
  constructor(repository: EpexMetaRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EpexMetaEntity>> {
    try {
      const endpoint = `${END_POINT}`;

      const response = await BaseMuleApi.http().get<EpexMetaEntity[]>(endpoint);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EpexMetaEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const collectionSize = data.length;
      return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = EpexMeta as any as EpexMetaEntity[];
        const collectionSize = data.length;
        return Promise.resolve(new PageResult(data, new Paginator('1', undefined, collectionSize)));
      } else {
        return Promise.reject(error);
      }
    }
  }
}
