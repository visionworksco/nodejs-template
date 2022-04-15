import { Repository } from '@visionworksco/nodejs-middleware';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { UserEntity } from './UserEntity';

export class UserService extends BaseApiCrudService<UserEntity> {
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }
}
