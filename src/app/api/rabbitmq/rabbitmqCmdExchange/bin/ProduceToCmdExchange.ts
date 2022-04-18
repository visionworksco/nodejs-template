import { AsyncUtils, DateUtils, Logger } from '@visionworksco/nodejs-middleware';
import { nanoid } from 'nanoid';
import 'reflect-metadata';
import { Config } from '../../../../config/Config';
import { RabbitmqConfig } from '../../../../messageBroker/rabbitmq/RabbitmqConfig';
import { RabbitmqCmdExchangeMessage } from '../RabbitmqCmdExchangeMessage';
import { RabbitmqCmdExchangeService } from '../RabbitmqCmdExchangeService';

const produce = async (): Promise<void> => {
  try {
    const args = process.argv.slice(2);
    if (args.length === 0) {
      return;
    }

    const messageValid: RabbitmqCmdExchangeMessage = {
      id: nanoid(),
      timestamp: DateUtils.toISOString(new Date()),
      to: 'stromtanke',
      from: 'cockpit',
      action: 'addNewOrder',
      arguments:
        '[{"customer":"TM","requestID":"31ed770b-3f4d-4f2e-a6f9-32385be9dd75","grid":"RWE","volume":15.4,"priceCent":null,"duration":4,"localDateTime":"2021-03-17T21:00:00+01:00","strategy":null},{"customer":"TM","requestID":"31ed770b-3f4d-4f2e-a6f9-32385be9dd99","grid":"EON","volume":20.7,"priceCent":null,"duration":1,"localDateTime":"2021-03-17T21:00:00+01:00","strategy":null}]',
      linkedMsg: null,
    };

    const messageInvalid: RabbitmqCmdExchangeMessage = {
      ...messageValid,
      to: 'cockpit',
      from: 'stromtanke',
      arguments:
        '{"customer":"TM","requestID":"31ed770b-3f4d-4f2e-a6f9-32385be9dd75","grid":"RWE","volume":15.4,"priceCent":null,"duration":4,"localDateTime":"2021-03-17T21:00:00+01:00","strategy":null},{"customer":"TM","requestID":"31ed770b-3f4d-4f2e-a6f9-32385be9dd99","grid":"EON","volume":20.7,"priceCent":null,"duration":1,"localDateTime":"2021-03-17T21:00:00+01:00","strategy":null}',
    };

    let message: RabbitmqCmdExchangeMessage;
    switch (args[0]) {
      case '-valid':
        message = messageValid;
        break;
      case '-invalid':
        message = messageInvalid;
        break;
      default:
        return;
    }

    const userId: string | undefined = Config.get('RABBITMQ_USER') ?? undefined;

    const ampqService = new RabbitmqCmdExchangeService(new RabbitmqConfig());
    await ampqService.start();
    await ampqService.produce(message, userId);
    await AsyncUtils.wait(500);
    ampqService.stop();
    process.exit(0);
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

produce();
