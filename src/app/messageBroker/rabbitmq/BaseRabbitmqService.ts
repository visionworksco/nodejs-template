import { AmpqPubSub, AmpqService, Logger } from '@visionworksco/nodejs-middleware';
import { RabbitmqExchangeName } from '../../api/rabbitmq/RabbitmqExchangeName';
import { AmpqConfig } from './AmpqConfig';

export abstract class BaseRabbitmqService implements AmpqService {
  protected config: AmpqConfig;
  protected exchangeName: RabbitmqExchangeName;
  protected name: string;
  protected ampq: AmpqPubSub | null;

  constructor(config: AmpqConfig, exchangeName: RabbitmqExchangeName) {
    this.config = config;
    this.exchangeName = exchangeName;
    this.name = 'RabbitMQ';
    this.ampq = null;
  }

  async start(): Promise<void> {
    try {
      this.ampq = new AmpqPubSub(this.config.connectionOptions, this.config.socketOptions, 1);
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
