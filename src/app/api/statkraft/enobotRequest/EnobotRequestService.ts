import { DateUtils, PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseStatkraftApi } from '../../../service/BaseStatkraftApi';
import { EnobotRequestEntity } from './EnobotRequestEntity';
import { EnobotRequestPageRequestOptions } from './EnobotRequestPageRequestOptions';
import { EnobotRequestRepository } from './EnobotRequestRepository';
import MockEnobotRequest from './mock/MockEnobotRequest.json';

export class EnobotRequestService extends BaseApiCrudService<EnobotRequestEntity> {
  constructor(repository: EnobotRequestRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotRequestEntity>> {
    try {
      const { query } = pageRequest;
      const queryEntity = ClassTransformer.fromPlain(EnobotRequestPageRequestOptions, query);
      const { delivery_start, delivery_stop } = queryEntity;

      const deliveryStartUpdated: string | undefined = this.transformDate(0, delivery_start);
      const deliveryStopUpdated: string | undefined = this.transformDate(22, delivery_stop);

      const endpoint = '/demand';
      const config: AxiosRequestConfig = {
        params: {
          ...queryEntity,
          delivery_start: deliveryStartUpdated,
          delivery_stop: deliveryStopUpdated,
        },
      };

      const response = await BaseStatkraftApi.http().get<EnobotRequestEntity[]>(endpoint, config);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EnobotRequestEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const dataUpdated = data.map((dataEntity) => ({
        ...dataEntity,
        id: nanoid(),
      })) as EnobotRequestEntity[];

      const collectionSize = dataUpdated.length;
      return Promise.resolve(
        new PageResult(dataUpdated, new Paginator('1', undefined, collectionSize)),
      );
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = MockEnobotRequest as any as EnobotRequestEntity[];
        const dataUpdated = data.map((dataEntity) => ({
          ...dataEntity,
          id: nanoid(),
        })) as EnobotRequestEntity[];

        const collectionSize = dataUpdated.length;
        return Promise.resolve(
          new PageResult(dataUpdated, new Paginator('1', undefined, collectionSize)),
        );
      } else {
        return Promise.reject(error);
      }
    }
  }

  private transformDate(hour: number, isoDate?: string): string | undefined {
    if (!isoDate) {
      return undefined;
    }

    const date = DateUtils.fromISOString(isoDate);
    const momentDate = moment(date);
    momentDate.set({ hour, minute: 0, second: 0, millisecond: 0 });
    return DateUtils.toString(momentDate.toDate(), 'YYYY-MM-DDTHH:mm:ssZ');
  }
}
