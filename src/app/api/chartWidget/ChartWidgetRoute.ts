import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { RequestHandler } from 'express';
import { Authenticate } from '../../server/express/middleware/Authenticate';
import { ChartWidgetController } from './ChartWidgetController';
import { ChartWidgetEntity } from './ChartWidgetEntity';

export class ChartWidgetRoute extends BaseCrudRoute<ChartWidgetEntity> {
  constructor(controller: ChartWidgetController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/chartWidgets';
  }

  protected allMutateHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(),
    this.allMutate,
  ];
}
