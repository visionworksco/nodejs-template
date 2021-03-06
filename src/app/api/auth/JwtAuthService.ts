import { BaseAuthService, Repository } from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../class/ClassTransformer';
import { Config } from '../../config/Config';
import { UserEntity } from '../user/UserEntity';

export class JwtAuthService extends BaseAuthService<UserEntity> {
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }

  protected normalize(entity: UserEntity | UserEntity[]): UserEntity | UserEntity[] {
    return ClassTransformer.trimExcluded(entity);
  }

  getSecret(): string {
    return Config.get('JWT_SECRET');
  }
}
