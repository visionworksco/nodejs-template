import { ServerException } from '@visionworksco/expressjs-middleware';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { AccountChartWidgetEntity } from './AccountChartWidgetEntity';
import { AccountChartWidgetRepository } from './AccountChartWidgetRepository';

export class AccountChartWidgetService extends BaseApiCrudService<AccountChartWidgetEntity> {
  private accountChartWidgetRepository: AccountChartWidgetRepository;

  constructor(repository: AccountChartWidgetRepository) {
    super(repository);
    this.accountChartWidgetRepository = repository;
  }

  async deleteByChartWidgetId(id: string): Promise<AccountChartWidgetEntity> {
    try {
      const entityDeleted = await this.accountChartWidgetRepository.deleteByChartWidgetId(id);
      if (!entityDeleted) {
        throw ServerException.NotFoundException();
      }

      return Promise.resolve(this.normalize(entityDeleted) as AccountChartWidgetEntity);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
