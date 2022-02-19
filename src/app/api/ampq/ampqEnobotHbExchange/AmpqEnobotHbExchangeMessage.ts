import { nanoid } from 'nanoid';
import { AmpqEnobotHbExchangeMessageModule } from './AmpqEnobotHbExchangeMessageModule';

export class AmpqEnobotHbExchangeMessage {
  readonly id: string;
  readonly module: AmpqEnobotHbExchangeMessageModule | null;
  readonly server: string | null;
  readonly timeStamp: string | null;

  // payload format: module:server#timestamp, e.g. stromtanke:top02#2021-10-14T10:45:01+02:00
  constructor(message: string) {
    this.id = nanoid();
    this.module = null;
    this.server = null;
    this.timeStamp = null;

    const messageUpdated = message.split('"').join('');

    if (messageUpdated.length === 0) {
      return;
    }

    const arr1 = messageUpdated.split('#');
    if (arr1.length >= 1) {
      const arr2 = arr1[0].split(':');
      this.module = arr2.length >= 1 ? (arr2[0] as AmpqEnobotHbExchangeMessageModule) : null;
      this.server = arr2.length >= 2 ? arr2[1] : null;
    }

    if (arr1.length >= 2) {
      this.timeStamp = arr1[1];
    }
  }
}
