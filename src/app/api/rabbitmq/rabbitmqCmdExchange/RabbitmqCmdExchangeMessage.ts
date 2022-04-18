import { RabbitmqCmdExchangeMessageAction } from './RabbitmqCmdExchangeMessageAction';
import { RabbitmqCmdExchangeMessageDestination } from './RabbitmqCmdExchangeMessageDestination';

export interface RabbitmqCmdExchangeMessage {
  id: string; // uuid
  timestamp: string; // YYYY-MM-DD'T'hh:mm:ss.SSSXXX
  to: RabbitmqCmdExchangeMessageDestination;
  from: RabbitmqCmdExchangeMessageDestination;
  action: RabbitmqCmdExchangeMessageAction;
  arguments: string | null;
  linkedMsg: string | null; // uuid
}
