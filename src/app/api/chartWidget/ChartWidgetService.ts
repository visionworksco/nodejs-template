import { PageRequest, PageResult } from '@visionworksco/expressjs-middleware';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { ChartWidgetEntity } from './ChartWidgetEntity';
import { ChartWidgetRepository } from './ChartWidgetRepository';

export class ChartWidgetService extends BaseApiCrudService<ChartWidgetEntity> {
  private chartWidgetRepository: ChartWidgetRepository;

  constructor(repository: ChartWidgetRepository) {
    super(repository);
    this.chartWidgetRepository = repository;
  }

  async findAllByAccountId(
    id: string,
    pageRequest: PageRequest,
  ): Promise<PageResult<ChartWidgetEntity>> {
    try {
      const pageResult = await this.chartWidgetRepository.findAllByAccountId(id, pageRequest);
      const pageResultUpdated = { ...pageResult };
      pageResultUpdated.data = this.normalize(pageResultUpdated.data) as ChartWidgetEntity[];

      return Promise.resolve(pageResultUpdated);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
