/**
 * @group unit
 */

import { SettingsController } from '../SettingsController';
import { SettingsRepository } from '../SettingsRepository';
import { SettingsRoute } from '../SettingsRoute';
import { SettingsService } from '../SettingsService';

jest.mock('../SettingsRepository');

describe('SettingsRoute', () => {
  let route: SettingsRoute;

  beforeEach(() => {
    const pg: any = {};
    const repository = new SettingsRepository(pg);
    const service = new SettingsService(repository);
    const controller: SettingsController = new SettingsController(service);
    route = new SettingsRoute(controller);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return url when getBaseUrl', () => {
    const url = route.getBaseUrl();
    expect(url).toBe('/settings');
  });
});
