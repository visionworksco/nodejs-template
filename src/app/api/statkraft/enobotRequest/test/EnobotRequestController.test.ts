/**
 * @group unit
 */

import { PageRequest, PageResult, Paginator, StatusCode } from '@visionworksco/nodejs-middleware';
import { EnobotRequestController } from '../EnobotRequestController';
import { EnobotRequestEntity } from '../EnobotRequestEntity';
import { EnobotRequestRepository } from '../EnobotRequestRepository';
import { EnobotRequestService } from '../EnobotRequestService';

describe('EnobotRequestController', () => {
  let req: any;
  let res: any;
  let repository: EnobotRequestRepository;
  let service: EnobotRequestService;

  beforeEach(() => {
    req = {
      query: 'delivery_start=2021-11-09T09:41:13.546Z&delivery_stop=2021-11-10T09:41:13.546Z',
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    repository = new EnobotRequestRepository();
    service = new EnobotRequestService(repository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    test('should findAll with no error', async () => {
      const mockDataEnobotRequestEntity: EnobotRequestEntity[] = [];
      const mockPaginator: Paginator = new Paginator();
      const mockResolvedResponse: PageResult<EnobotRequestEntity> = {
        data: mockDataEnobotRequestEntity,
        paginator: mockPaginator,
      };

      const serviceFindAll = jest
        .spyOn(service, 'findAll')
        .mockName('serviceFindAll')
        .mockResolvedValueOnce(mockResolvedResponse);

      const controller = new EnobotRequestController(service);
      await controller.findAll(req, res);

      expect(serviceFindAll).toHaveBeenCalledTimes(1);
      expect(serviceFindAll).toHaveBeenLastCalledWith(expect.any(PageRequest));
      expect(serviceFindAll).toHaveReturnedTimes(1);
      expect(serviceFindAll).toHaveLastReturnedWith(expect.anything());

      expect(res.status).toHaveBeenLastCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenLastCalledWith(mockResolvedResponse);
    });

    test('should throw when findAll', async () => {
      const mockError = new Error();
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.reject(mockError));

      const controller = new EnobotRequestController(service);
      await expect(controller.findAll(req, res)).rejects.toThrow(mockError);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
