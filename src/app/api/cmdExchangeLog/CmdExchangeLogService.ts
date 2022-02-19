import { DateUtils, PageRequest, PageResult } from '@visionworksco/expressjs-middleware';
import { EnvironmentUtils } from '../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../service/BaseApiCrudService';
import { CmdExchangeLogEntity } from './CmdExchangeLogEntity';
import { CmdExchangeLogRepository } from './CmdExchangeLogRepository';
import MockCmdExchangeLogs from './mock/MockCmdExchangeLogs.json';

export class CmdExchangeLogService extends BaseApiCrudService<CmdExchangeLogEntity> {
  constructor(repository: CmdExchangeLogRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<CmdExchangeLogEntity>> {
    try {
      const pageResult = await this.repository.findAll(pageRequest);
      const pageResultUpdated = { ...pageResult };
      const dataNormalized = this.normalize(pageResultUpdated.data) as CmdExchangeLogEntity[];
      const dataSorted = this.sortCreatedAtDesc(dataNormalized);
      pageResultUpdated.data = dataSorted;

      return Promise.resolve(pageResultUpdated);
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        return Promise.resolve(MockCmdExchangeLogs) as any;
      } else {
        return Promise.reject(error);
      }
    }
  }

  // sort by createdAt desc
  private sortCreatedAtDesc(values: CmdExchangeLogEntity[]): CmdExchangeLogEntity[] {
    const valuesSorted = values;
    valuesSorted.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) {
        return 0;
      }

      const dateA = DateUtils.fromISOString(a.createdAt);
      const dateB = DateUtils.fromISOString(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
    return valuesSorted;
  }
}
