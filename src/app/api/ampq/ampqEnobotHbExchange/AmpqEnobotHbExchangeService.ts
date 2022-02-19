import { Logger } from '@visionworksco/expressjs-middleware';
import { ConsumeMessage } from 'amqplib';
import { Context } from '../../../context/Context';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { BaseAmpqService } from '../BaseAmpqService';
import { AmpqEnobotHbExchangeMessage } from './AmpqEnobotHbExchangeMessage';

export class AmpqEnobotHbExchangeService extends BaseAmpqService {
  private appContext: Context;

  constructor() {
    super('EnobotHB');
    this.appContext = Context.getInstance();
  }

  afterStart(): void {
    // return void;
  }

  async consume(): Promise<void> {
    try {
      if (!this.ampq) {
        return;
      }

      Logger.log(`${this.name}: waiting for messages from exchange ${this.exchangeName}...`);

      await this.ampq.consume(
        this.exchangeName,
        async (message: ConsumeMessage | null): Promise<void> => {
          if (!message || !this.ampq) {
            return;
          }

          const messagePayload = new AmpqEnobotHbExchangeMessage(message.content.toString());
          this.appContext.addHeartbeats(messagePayload);

          // log a message in the dev env only
          if (EnvironmentUtils.isDebug()) {
            Logger.log(`${this.name}:${this.exchangeName}`, messagePayload);
          }

          this.ampq.acknowledge(message);
        },
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // message format: module:server#timestamp, e.g. stromtanke:top02#2021-10-14T10:45:01+02:00
  async produce(message: string): Promise<void> {
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
