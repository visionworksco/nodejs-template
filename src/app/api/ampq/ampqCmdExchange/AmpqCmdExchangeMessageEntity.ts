/* istanbul ignore file */

import { DateUtils } from '@visionworksco/expressjs-middleware';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { AmpqCmdExchangeMessage } from './AmpqCmdExchangeMessage';
import { AmpqCmdExchangeMessageAction } from './AmpqCmdExchangeMessageAction';
import { AmpqCmdExchangeMessageDestination } from './AmpqCmdExchangeMessageDestination';

export class AmpqCmdExchangeMessageEntity implements AmpqCmdExchangeMessage {
  @Expose()
  id: string;

  @Expose()
  timestamp: string;

  @Expose()
  to: AmpqCmdExchangeMessageDestination;

  @Expose()
  from: AmpqCmdExchangeMessageDestination;

  @Expose()
  action: AmpqCmdExchangeMessageAction;

  @Expose()
  arguments: string | null;

  @Expose()
  linkedMsg: string | null;

  constructor(
    to: AmpqCmdExchangeMessageDestination,
    from: AmpqCmdExchangeMessageDestination,
    action: AmpqCmdExchangeMessageAction,
    args: string | null,
  ) {
    this.id = uuidv4();
    this.timestamp = DateUtils.toISOString(new Date());
    this.to = to;
    this.from = from;
    this.action = action;
    this.arguments = args;
    this.linkedMsg = null;
  }
}
