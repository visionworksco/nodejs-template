import { AmpqCmdExchangeMessageAction } from './AmpqCmdExchangeMessageAction';
import { AmpqCmdExchangeMessageDestination } from './AmpqCmdExchangeMessageDestination';

export interface AmpqCmdExchangeMessage {
  id: string; // uuid
  timestamp: string; // YYYY-MM-DD'T'hh:mm:ss.SSSXXX
  to: AmpqCmdExchangeMessageDestination;
  from: AmpqCmdExchangeMessageDestination;
  action: AmpqCmdExchangeMessageAction;
  arguments: string | null;
  linkedMsg: string | null; // uuid
}
