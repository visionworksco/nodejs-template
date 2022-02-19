import { AmpqEnobotHbExchangeMessage } from '../api/ampq/ampqEnobotHbExchange/AmpqEnobotHbExchangeMessage';
import { ApplicationRoles } from '../role/application/ApplicationRoles';

export class Context {
  private static instance: Context; // Singleton
  readonly applicationRoles: ApplicationRoles;

  private heartbeats: AmpqEnobotHbExchangeMessage[];

  private constructor() {
    this.heartbeats = [];
    this.applicationRoles = new ApplicationRoles();
  }

  static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  getHeartbeats(): AmpqEnobotHbExchangeMessage[] {
    return this.heartbeats;
  }

  addHeartbeats(message: AmpqEnobotHbExchangeMessage): void {
    const { module: enobotModule } = message;
    if (!enobotModule) {
      return;
    }

    const heartbeatsEntityIndex = this.heartbeats.findIndex(
      (heartbeatsEntity) => heartbeatsEntity.module === enobotModule,
    );

    if (heartbeatsEntityIndex >= 0) {
      this.heartbeats[heartbeatsEntityIndex] = message;
    } else {
      this.heartbeats = [...this.heartbeats, message];
    }
  }
}
