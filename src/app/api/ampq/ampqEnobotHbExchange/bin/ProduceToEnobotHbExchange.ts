import { AsyncUtils, DateUtils, Logger } from '@visionworksco/expressjs-middleware';
import 'reflect-metadata';
import { AmpqEnobotHbExchangeMessageModule } from '../AmpqEnobotHbExchangeMessageModule';
import { AmpqEnobotHbExchangeService } from '../AmpqEnobotHbExchangeService';

const produce = async (): Promise<void> => {
  try {
    // message format: module:server#timestamp, e.g. stromtanke:top02#2021-10-14T10:45:01+02:00
    let message = 'stromtanke:top02#2021-10-14T10:45:01+02:00';

    let enobotModule: AmpqEnobotHbExchangeMessageModule | null = null;
    let server: string | null = null;
    let timeStamp: string | null = null;

    const args = process.argv.slice(2);
    if (args.length !== 0) {
      enobotModule = args[0] as AmpqEnobotHbExchangeMessageModule;
      server = 'top02';
      timeStamp = DateUtils.toISOString(new Date());
      message = `${enobotModule}:${server}#${timeStamp}`;
    }

    const ampqService = new AmpqEnobotHbExchangeService();
    await ampqService.start();
    await ampqService.produce(message);
    await AsyncUtils.wait(500);
    ampqService.stop();
    process.exit(0);
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

produce();
