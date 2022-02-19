import { AmpqService } from '@visionworksco/nodejs-middleware';

export class AmpqServices {
  private services: AmpqService[] = [];

  constructor(...services: AmpqService[]) {
    for (const service of services) {
      this.register(service);
    }
  }

  private register(service: AmpqService) {
    this.services.push(service);
  }

  async start(): Promise<void> {
    try {
      for (const service of this.services) {
        await service.start();
        await service.consume();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  stop(): void {
    for (const storage of this.services) {
      storage.stop();
    }
  }
}
