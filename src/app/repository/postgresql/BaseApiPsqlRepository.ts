import { ApiEntity, BasePsqlRepository } from '@visionworksco/expressjs-middleware';
import { Pool } from 'pg';
import { ClassTransformer, Clazz } from '../../class/ClassTransformer';

export class BaseApiPsqlRepository<T extends ApiEntity> extends BasePsqlRepository<T> {
  private entityClass: Clazz<T>;

  constructor(psql: Pool, tableName: string, entityClass: Clazz<T>) {
    super(psql, tableName);
    this.entityClass = entityClass;
  }

  protected normalize(repositoryResult: Object | null): T | T[] {
    const result = ClassTransformer.fromPlain(this.entityClass, repositoryResult, false);
    return ClassTransformer.fromPlain(this.entityClass, result, true);
  }
}
