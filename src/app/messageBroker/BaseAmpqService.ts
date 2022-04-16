import { AmpqPubSub, AmpqService, Logger } from '@visionworksco/nodejs-middleware';
import { AmpqExchangeName } from '../api/ampq/AmpqExchangeName';
import { AmpqConfig } from './AmpqConfig';

export abstract class BaseAmpqService implements AmpqService {
  protected name: string;
  protected ampq: AmpqPubSub | null;
  protected exchangeName: AmpqExchangeName;

  constructor(exchangeName: AmpqExchangeName) {
    this.name = 'RabbitMQ';
    this.ampq = null;
    this.exchangeName = exchangeName;
  }

  async start(): Promise<void> {
    try {
      this.ampq = new AmpqPubSub(AmpqConfig.connectionOptions(), AmpqConfig.socketOptions(), 1);
      await this.ampq.connect();
      await this.ampq.registerExchange(this.exchangeName);

      Logger.log(`[${this.name}] connected to ${this.ampq.getInfo()}`);

      this.afterStart();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  abstract afterStart(): void;

  stop(): void {
    if (!this.ampq) {
      return;
    }

    this.ampq.disconnect();

    Logger.log(`[${this.name}] disconnected`);
  }

  abstract consume(): Promise<void>;

  abstract produce(message: any): Promise<void>;
}
