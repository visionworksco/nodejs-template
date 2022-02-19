import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import { AxiosRequestConfig } from 'axios';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { BaseMuleApi } from '../../../service/BaseMuleApi';
import { EnobotNonFirmRequestEntity } from './EnobotNonFirmRequestEntity';
import { EnobotNonFirmRequestPageRequestOptions } from './EnobotNonFirmRequestPageRequestOptions';
import { EnobotNonFirmRequestRepository } from './EnobotNonFirmRequestRepository';
import MockEnobotNonFirmRequest from './mock/MockEnobotNonFirmRequest.json';

export class EnobotNonFirmRequestService extends BaseApiCrudService<EnobotNonFirmRequestEntity> {
  constructor(repository: EnobotNonFirmRequestRepository) {
    super(repository);
  }

  async findAll(pageRequest: PageRequest): Promise<PageResult<EnobotNonFirmRequestEntity>> {
    try {
      const { query } = pageRequest;
      const queryEntity = ClassTransformer.fromPlain(EnobotNonFirmRequestPageRequestOptions, query);

      const endpoint = '/enobot/orders/firmlimitOrders';
      const config: AxiosRequestConfig = {
        params: {
          ...queryEntity,
        },
      };

      const response = await BaseMuleApi.http().get<EnobotNonFirmRequestEntity[]>(endpoint, config);
      const { data, status } = response;

      if (!data || status === 404) {
        return Promise.resolve(
          new PageResult([] as EnobotNonFirmRequestEntity[], new Paginator('1', undefined, 0)),
        );
      }

      const dataTransformed = ClassTransformer.fromPlain(
        EnobotNonFirmRequestEntity,
        data,
      ) as any as EnobotNonFirmRequestEntity[];

      const collectionSize = dataTransformed.length;
      return Promise.resolve(
        new PageResult(dataTransformed, new Paginator('1', undefined, collectionSize)),
      );
    } catch (error) {
      if (EnvironmentUtils.isMockData()) {
        const data = MockEnobotNonFirmRequest as any as EnobotNonFirmRequestEntity[];

        const dataTransformed = ClassTransformer.fromPlain(
          EnobotNonFirmRequestEntity,
          data,
        ) as any as EnobotNonFirmRequestEntity[];

        const collectionSize = dataTransformed.length;
        return Promise.resolve(
          new PageResult(dataTransformed, new Paginator('1', undefined, collectionSize)),
        );
      } else {
        return Promise.reject(error);
      }
    }
  }
}
