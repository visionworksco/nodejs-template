import { Logger, PsqlPool } from '@visionworksco/nodejs-middleware';
import { ConsumeMessage } from 'amqplib';
import { ClassTransformer } from '../../../class/ClassTransformer';
import { EnvironmentUtils } from '../../../environment/EnvironmentUtils';
import { CmdExchangeLogEntity } from '../../cmdExchangeLog/CmdExchangeLogEntity';
import { CmdExchangeLogRepository } from '../../cmdExchangeLog/CmdExchangeLogRepository';
import { CmdExchangeLogService } from '../../cmdExchangeLog/CmdExchangeLogService';
import { BaseAmpqService } from '../BaseAmpqService';
import { AmpqCmdExchangeMessage } from './AmpqCmdExchangeMessage';
import { AmpqCmdExchangeMessageEntity } from './AmpqCmdExchangeMessageEntity';

export class AmpqCmdExchangeService extends BaseAmpqService {
  private logRepository: CmdExchangeLogRepository | null;
  private logService: CmdExchangeLogService | null;

  constructor() {
    super('CMD');
    this.logRepository = null;
    this.logService = null;
  }

  afterStart(): void {
    const psqlPool = PsqlPool();
    this.logRepository = new CmdExchangeLogRepository(psqlPool);
    this.logService = new CmdExchangeLogService(this.logRepository);
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

          const messagePayload = ClassTransformer.fromPlain(
            AmpqCmdExchangeMessageEntity,
            this.ampq.toPayload(message),
          );

          // process only 'cockpit' related messages
          if (messagePayload.to === 'cockpit') {
            if (this.logService) {
              const logEntity = new CmdExchangeLogEntity(messagePayload.from, messagePayload);
              await this.logService.save(logEntity);
            }
          }

          if (EnvironmentUtils.isDebug()) {
            Logger.log(`${this.name}:${this.exchangeName}:${messagePayload.to}:`, messagePayload);
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

      if (userId && this.logService) {
        const logEntity = new CmdExchangeLogEntity(userId, message);
        await this.logService.save(logEntity);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
