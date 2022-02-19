import { AsyncUtils } from '@visionworksco/expressjs-middleware';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { AmpqCmdExchangeMessageEntity } from '../ampqCmdExchange/AmpqCmdExchangeMessageEntity';
import { AmpqCmdExchangeService } from '../ampqCmdExchange/AmpqCmdExchangeService';
import { AmpqEnobotCustomerStrategyEditPayload } from './AmpqEnobotCustomerStrategyEditPayload';
import { AmpqEnobotCustomerStrategyEntity } from './AmpqEnobotCustomerStrategyEntity';
import { AmpqEnobotCustomerStrategyRepository } from './AmpqEnobotCustomerStrategyRepository';

export class AmpqEnobotCustomerStrategyService extends BaseApiCrudService<AmpqEnobotCustomerStrategyEntity> {
  constructor(repository: AmpqEnobotCustomerStrategyRepository) {
    super(repository);
  }

  async editStrategy(
    payload: AmpqEnobotCustomerStrategyEditPayload,
    userId?: string,
  ): Promise<void> {
    try {
      const message = new AmpqCmdExchangeMessageEntity(
        'phm',
        'cockpit',
        'addNewCustomerStrategyIDMP',
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
