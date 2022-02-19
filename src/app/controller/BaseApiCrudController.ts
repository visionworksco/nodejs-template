import {
  BaseCrudController,
  BaseRequest,
  CrudService,
  DateUtils,
} from '@visionworksco/expressjs-middleware';
import { ClassTransformer, Clazz } from '../class/ClassTransformer';
import { BaseApiEntity } from '../entity/BaseApiEntity';
import { ControllerUtils } from './ControllerUtils';

export class BaseApiCrudController<T extends BaseApiEntity> extends BaseCrudController<T> {
  private entityClass: Clazz<T>;

  constructor(service: CrudService<T>, entityClass: Clazz<T>) {
    super(service);
    this.entityClass = entityClass;
  }

  protected preSave(req: BaseRequest, entity: T): T {
    const entityUpdated = ClassTransformer.clone(entity);
    entityUpdated.createdAt = DateUtils.toISOString(new Date());
    entityUpdated.createdBy = ControllerUtils.getUserEmail(req);
    return entityUpdated;
  }

  protected preUpdate(req: BaseRequest, entity: T): T {
    const entityUpdated = ClassTransformer.clone(entity);
    entityUpdated.updatedAt = DateUtils.toISOString(new Date());
    entityUpdated.updatedBy = ControllerUtils.getUserEmail(req);
    return entityUpdated;
  }

  protected normalize(entity: Object | null): T {
    return ClassTransformer.fromPlain(this.entityClass, entity);
  }
}
