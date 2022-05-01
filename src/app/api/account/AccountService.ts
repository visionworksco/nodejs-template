import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { AccountEntity } from './AccountEntity';
import { AccountPsqlRepository } from './psql/AccountPsqlRepository';

export class AccountService extends BaseApiCrudService<AccountEntity> {
  private accountRepository: AccountPsqlRepository;

  constructor(repository: AccountPsqlRepository) {
    super(repository);
    this.accountRepository = repository;
  }

  async findByEmail(email: string): Promise<AccountEntity> {
    try {
      const entity = await this.accountRepository.findByEmail(email);
      return Promise.resolve(this.normalize(entity) as AccountEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findIdByEmail(email: string): Promise<string | undefined> {
    try {
      const entity = await this.findByEmail(email);
      return Promise.resolve(entity.id);
    } catch (error) {
      return Promise.resolve(undefined);
    }
  }
}
