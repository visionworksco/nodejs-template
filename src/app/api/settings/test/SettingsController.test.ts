/**
 * @group unit
 */

import { BaseResult, StatusCode } from '@visionworksco/nodejs-middleware';
import { nanoid } from 'nanoid';
import { SettingsController } from '../SettingsController';
import { SettingsEntity } from '../SettingsEntity';
import { SettingsRepository } from '../SettingsRepository';
import { SettingsService } from '../SettingsService';

jest.mock('../SettingsRepository');

describe('SettingsController', () => {
  let req: any;
  let res: any;
  let repository: SettingsRepository;
  let service: SettingsService;

  beforeEach(() => {
    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const psql: any = {};
    repository = new SettingsRepository(psql);
    service = new SettingsService(repository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findDefault', () => {
    test('should findDefault with no error', async () => {
      const mockEntity: SettingsEntity = {
        id: nanoid(),
        data: {
          enobotRequest: {
            grid: ['RWE', 'EON', 'ENBW', 'VE'],
            volumeMin: 0.1,
            volumeMax: 50,
            duration: ['15min', '1h'],
            limitType: ['MaxPrice', 'MinPrice'],
          },
        },
      };
      const mockResponse = new BaseResult(mockEntity);

      const serviceFindDefault = jest
        .spyOn(service, 'findDefault')
        .mockName('serviceFindDefault')
        .mockResolvedValueOnce(mockEntity);

      const controller = new SettingsController(service);
      await controller.findDefault(req, res);

      expect(serviceFindDefault).toHaveBeenCalledTimes(1);
      expect(serviceFindDefault).toHaveReturnedTimes(1);
      expect(serviceFindDefault).toHaveLastReturnedWith(expect.anything());

      expect(res.status).toHaveBeenLastCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenLastCalledWith(mockResponse);
    });

    test('should throw when findDefault', async () => {
      const mockError = new Error();
      jest.spyOn(service, 'findDefault').mockImplementation(() => Promise.reject(mockError));

      const controller = new SettingsController(service);
      await expect(controller.findDefault(req, res)).rejects.toThrow(mockError);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
