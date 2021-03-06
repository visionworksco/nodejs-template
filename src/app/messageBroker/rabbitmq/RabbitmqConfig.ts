import { AmpqConfig, AmpqSocketOptions } from '@visionworksco/nodejs-middleware';
import { Options } from 'amqplib';
import fs from 'fs';
import { Config } from '../../config/Config';

export class RabbitmqConfig implements AmpqConfig {
  get connectionOptions(): Options.Connect {
    return {
      protocol: 'amqps',
      hostname: Config.get('RABBITMQ_HOST'),
      port: Config.get('RABBITMQ_PORT'),
      vhost: Config.get('RABBITMQ_VHOST'),
      username: Config.get('RABBITMQ_USER'),
      password: Config.get('RABBITMQ_PASSWORD'),
      heartbeat: 30,
    };
  }

  get socketOptions(): AmpqSocketOptions | undefined {
    const certFile: string = Config.get('RABBITMQ_SSL_CERTFILE');
    const keyFile: string = Config.get('RABBITMQ_SSL_KEYFILE');
    const caFile: string = Config.get('RABBITMQ_SSL_CAFILE');
    if (certFile.length === 0 || keyFile.length === 0 || caFile.length === 0) {
      return undefined;
    }

    return {
      rejectUnauthorized: false,
      noDelay: true,
      cert: fs.readFileSync(certFile),
      key: fs.readFileSync(keyFile),
      ca: [fs.readFileSync(caFile)],
    };
  }
}
