/**
 * @group unit
 */

import { PageRequest, PageResult, Paginator } from '@visionworksco/nodejs-middleware';
import axios from 'axios';
import { EnvironmentUtils } from '../../../../environment/EnvironmentUtils';
import { EnobotRequestEntity } from '../EnobotRequestEntity';
import { EnobotRequestRepository } from '../EnobotRequestRepository';
import { EnobotRequestService } from '../EnobotRequestService';

jest.mock('axios');
jest.mock('../../../../environment/EnvironmentUtils');
jest.mock('../EnobotRequestRepository');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('EnobotRequestService', () => {
  let service: EnobotRequestService;
  const pageRequest: PageRequest = {
    query: {
      delivery_start: '2021-11-09T09:41:13.546Z',
      delivery_stop: '2021-11-10T09:41:13.546Z',
    },
  };
  const mockData: EnobotRequestEntity[] = [];
  const mockCollectionSize = 0;

  beforeEach(() => {
    const repository = new EnobotRequestRepository();
    service = new EnobotRequestService(repository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    test('should findAll when BaseStatkraftApi returns status 200', async () => {
      const mockStatus = 200;
      const mockResponse: any = {
        data: mockData,
        status: mockStatus,
      };

      mockAxios.create.mockImplementation((config) => axios);
      mockAxios.get.mockResolvedValue(mockResponse);

      const actual = await service.findAll(pageRequest);
      const expected = new PageResult(mockData, new Paginator('1', undefined, mockCollectionSize));
      expect(actual).toEqual(expected);
    });

    test('should findAll when BaseStatkraftApi does not return a valid response', async () => {
      const mockStatus = 404;
      const mockResponse: any = {
        data: '',
        status: mockStatus,
      };

      mockAxios.create.mockImplementation((config) => axios);
      mockAxios.get.mockResolvedValue(mockResponse);

      const actual = await service.findAll(pageRequest);
      const expected = new PageResult(mockData, new Paginator('1', undefined, mockCollectionSize));
      expect(actual).toEqual(expected);
    });

    test('should throw when findAll if env MOCK_DATA is false', async () => {
      const mockError = new Error();
      jest.spyOn(EnvironmentUtils, 'isMockData').mockImplementation(() => false);

      mockAxios.create.mockImplementation((config) => axios);
      mockAxios.get.mockRejectedValue(mockError);

      await expect(service.findAll(pageRequest)).rejects.toThrow(mockError);
    });

    test('should not throw when findAll if env MOCK_DATA is true', async () => {
      jest.spyOn(EnvironmentUtils, 'isMockData').mockImplementation(() => true);

      mockAxios.create.mockImplementation((config) => axios);
      mockAxios.get.mockRejectedValue(new Error());

      const actual = await service.findAll(pageRequest);
      expect(actual.error).toBeUndefined();
      expect(actual.data.length).toBeGreaterThan(0);
      expect(actual.paginator).toBeTruthy();
    });

    test('should not transform non existing query params delivery_start, delivery_stop', async () => {
      const mockStatus = 200;
      const mockResponse: any = {
        data: mockData,
        status: mockStatus,
      };
      const pageRequest: PageRequest = {
        query: {},
      };

      mockAxios.create.mockImplementation((config) => axios);
      mockAxios.get.mockResolvedValue(mockResponse);

      await service.findAll(pageRequest);
      expect(mockAxios.get).toHaveBeenLastCalledWith(expect.any(String), {
        params: {
          customer: undefined,
          delivery_start: undefined,
          delivery_stop: undefined,
        },
      });
    });
  });
});
