/* istanbul ignore file */

import { DateUtils } from '@visionworksco/expressjs-middleware';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { AmpqCmdExchangeMessage } from '../ampq/ampqCmdExchange/AmpqCmdExchangeMessage';
import { CmdExchangeLog } from './CmdExchangeLog';

export class CmdExchangeLogEntity extends BaseApiEntity implements CmdExchangeLog {
  @Expose()
  @IsNotEmpty()
  data = '';

  constructor(userId: string, message: AmpqCmdExchangeMessage) {
    super();

    this.createdAt = DateUtils.toISOString(new Date());
    this.createdBy = userId;
    this.data = JSON.stringify(message);
  }
}
