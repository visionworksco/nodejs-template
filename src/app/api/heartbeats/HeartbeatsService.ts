import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { Context } from '../../context/Context';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { HeartbeatsEntity } from './HeartbeatsEntity';
import { HeartbeatsRepository } from './HeartbeatsRepository';

export class HeartbeatsService extends BaseApiCrudService<HeartbeatsEntity> {
  constructor(repository: HeartbeatsRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<HeartbeatsEntity>> {
    try {
      const appContext = Context.getInstance();
      const heatbeats = appContext.getHeartbeats();

      const collectionSize = heatbeats.length;
      return Promise.resolve(
        new PageResult(heatbeats, new Paginator('1', undefined, collectionSize)),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
