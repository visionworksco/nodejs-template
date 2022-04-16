import { CrudService } from '@visionworksco/nodejs-middleware';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { UserEntity } from './UserEntity';

export class UserController extends BaseApiCrudController<UserEntity> {
  constructor(service: CrudService<UserEntity>) {
    super(service, UserEntity);
  }
}
