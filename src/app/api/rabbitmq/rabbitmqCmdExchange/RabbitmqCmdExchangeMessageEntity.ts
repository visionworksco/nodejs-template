/* istanbul ignore file */

import { DateUtils } from '@visionworksco/nodejs-middleware';
import { Expose } from 'class-transformer';
import { nanoid } from 'nanoid';
import { RabbitmqCmdExchangeMessage } from './RabbitmqCmdExchangeMessage';
import { RabbitmqCmdExchangeMessageAction } from './RabbitmqCmdExchangeMessageAction';
import { RabbitmqCmdExchangeMessageDestination } from './RabbitmqCmdExchangeMessageDestination';

export class RabbitmqCmdExchangeMessageEntity implements RabbitmqCmdExchangeMessage {
  @Expose()
  id: string;

  @Expose()
  timestamp: string;

  @Expose()
  to: RabbitmqCmdExchangeMessageDestination;

  @Expose()
  from: RabbitmqCmdExchangeMessageDestination;

  @Expose()
  action: RabbitmqCmdExchangeMessageAction;

  @Expose()
  arguments: string | null;

  @Expose()
  linkedMsg: string | null;

  constructor(
    to: RabbitmqCmdExchangeMessageDestination,
    from: RabbitmqCmdExchangeMessageDestination,
    action: RabbitmqCmdExchangeMessageAction,
    args: string | null,
  ) {
    this.id = nanoid();
    this.timestamp = DateUtils.toISOString(new Date());
    this.to = to;
    this.from = from;
    this.action = action;
    this.arguments = args;
    this.linkedMsg = null;
  }
}
