/**
 * @group unit
 */

import { SettingsRepository } from '../SettingsRepository';
import { SettingsService } from '../SettingsService';

jest.mock('../SettingsRepository');

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    const pg: any = {};
    const repository = new SettingsRepository(pg);
    service = new SettingsService(repository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findDefault', () => {
    test('should findDefault', async () => {
      const actual = await service.findDefault();
      const expected = {
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
      expect(actual).toEqual(expected);
    });
  });
});
