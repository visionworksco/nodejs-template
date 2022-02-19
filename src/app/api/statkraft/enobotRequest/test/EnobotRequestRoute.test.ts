/**
 * @group unit
 */

import { EnobotRequestController } from '../EnobotRequestController';
import { EnobotRequestRepository } from '../EnobotRequestRepository';
import { EnobotRequestRoute } from '../EnobotRequestRoute';
import { EnobotRequestService } from '../EnobotRequestService';

jest.mock('../EnobotRequestRepository');

describe('EnobotRequestRoute', () => {
  let route: EnobotRequestRoute;

  beforeEach(() => {
    const repository = new EnobotRequestRepository();
    const service = new EnobotRequestService(repository);
    const controller: EnobotRequestController = new EnobotRequestController(service);
    route = new EnobotRequestRoute(controller);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return url when getBaseUrl', () => {
    const url = route.getBaseUrl();
    expect(url).toBe('/statkraft/enobotRequests');
  });
});
