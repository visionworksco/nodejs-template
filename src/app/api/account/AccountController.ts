import { BaseRequest, BaseResult, StatusCode } from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { AccountEntity } from './AccountEntity';
import { AccountService } from './AccountService';

export class AccountController extends BaseApiCrudController<AccountEntity> {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    super(accountService, AccountEntity);
    this.accountService = accountService;
  }

  async findByEmail(req: BaseRequest, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const entity = await this.accountService.findByEmail(email);

      const response = new BaseResult(entity);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
