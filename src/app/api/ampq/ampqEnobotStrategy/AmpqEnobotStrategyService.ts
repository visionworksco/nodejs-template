import { AsyncUtils } from '@visionworksco/nodejs-middleware';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { AmpqCmdExchangeMessageEntity } from '../ampqCmdExchange/AmpqCmdExchangeMessageEntity';
import { AmpqCmdExchangeService } from '../ampqCmdExchange/AmpqCmdExchangeService';
import { AmpqEnobotStrategyAddPayloadEntity } from './AmpqEnobotStrategyAddPayload';
import { AmpqEnobotStrategyEntity } from './AmpqEnobotStrategyEntity';
import { AmpqEnobotStrategyRepository } from './AmpqEnobotStrategyRepository';

export class AmpqEnobotStrategyService extends BaseApiCrudService<AmpqEnobotStrategyEntity> {
  constructor(repository: AmpqEnobotStrategyRepository) {
    super(repository);
  }

  async addStrategy(payload: AmpqEnobotStrategyAddPayloadEntity, userId?: string): Promise<void> {
    try {
      const message = new AmpqCmdExchangeMessageEntity(
        'phm',
        'cockpit',
        'addNewStrategy',
        JSON.stringify(payload.data),
      );

      const ampqService = new AmpqCmdExchangeService();
      await ampqService.start();
      await ampqService.produce(message, userId);
      await AsyncUtils.wait(500);
      ampqService.stop();

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
