import { Logger } from '@visionworksco/nodejs-middleware';
import { ConsumeMessage } from 'amqplib';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseAmpqService } from '../../../messageBroker/BaseAmpqService';
import { AmpqCmdExchangeMessage } from './AmpqCmdExchangeMessage';
import { AmpqCmdExchangeMessageEntity } from './AmpqCmdExchangeMessageEntity';

export class AmpqCmdExchangeService extends BaseAmpqService {
  constructor() {
    super('CMD');
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
            AmpqCmdExchangeMessageEntity,
            this.ampq.toPayload(message),
          );

          // process only 'cockpit' related messages
          if (messagePayload.to === 'cockpit') {
            Logger.log('process only "cockpit" related messages...');
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

  async produce(message: AmpqCmdExchangeMessage, userId?: string): Promise<void> {
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
