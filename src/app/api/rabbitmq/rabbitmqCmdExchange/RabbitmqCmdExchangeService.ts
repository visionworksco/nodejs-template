import { Logger } from '@visionworksco/nodejs-middleware';
import { ConsumeMessage } from 'amqplib';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { AmpqConfig } from '../../../messageBroker/rabbitmq/AmpqConfig';
import { BaseRabbitmqService } from '../../../messageBroker/rabbitmq/BaseRabbitmqService';
import { RabbitmqCmdExchangeMessage } from './RabbitmqCmdExchangeMessage';
import { RabbitmqCmdExchangeMessageEntity } from './RabbitmqCmdExchangeMessageEntity';

export class RabbitmqCmdExchangeService extends BaseRabbitmqService {
  constructor(config: AmpqConfig) {
    super(config, 'CMD');
  }

  afterStart(): void {
    return;
  }

  async consume(): Promise<void> {
    try {
      if (!this.ampq) {
        return;
      }

      Logger.log(`[${this.name}] waiting for messages from exchange ${this.exchangeName}...`);

      await this.ampq.consume(
        this.exchangeName,
        async (message: ConsumeMessage | null): Promise<void> => {
          if (!message || !this.ampq) {
            return;
          }

          const messagePayload = ClassTransformer.fromPlain(
            RabbitmqCmdExchangeMessageEntity,
            this.ampq.toPayload(message),
          );

          // process only 'cockpit' related messages
          if (messagePayload.to === 'cockpit') {
            Logger.log('Successfully processed "cockpit" related messages...');
          }

          if (EnvironmentUtils.isDebug()) {
            Logger.log(`[${this.name}:${this.exchangeName}:${messagePayload.to}]`, messagePayload);
          }

          this.ampq.acknowledge(message);
        },
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async produce(message: RabbitmqCmdExchangeMessage, userId?: string): Promise<void> {
    try {
      if (!this.ampq) {
        return;
      }

      this.ampq.produce(this.exchangeName, message);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
