import { AuthData, AuthService, BaseAuthController } from '@visionworksco/nodejs-middleware';
import { ClassTransformer } from '../../class/ClassTransformer';
import { Config } from '../../config/Config';
import { UserEntity } from '../user/UserEntity';

export class JwtAuthController extends BaseAuthController<UserEntity> {
  constructor(service: AuthService<UserEntity, AuthData>) {
    super(service);
  }

  protected authCookieConfigHttpOnly(): boolean {
    return !['development', 'development.local'].includes(Config.get('NODE_ENV'));
  }

  protected authCookieConfigSecure(): boolean {
    return !['development', 'development.local'].includes(Config.get('NODE_ENV'));
  }

  protected normalize(entity: Object | null): UserEntity {
    return ClassTransformer.fromPlain(UserEntity, entity);
  }
}
