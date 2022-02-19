import { BaseCrudRoute } from '@visionworksco/expressjs-middleware';
import { RequestHandler } from 'express';
import { Authenticate } from '../../server/express/middleware/Authenticate';
import { AccountChartWidgetController } from './AccountChartWidgetController';
import { AccountChartWidgetEntity } from './AccountChartWidgetEntity';

export class AccountChartWidgetRoute extends BaseCrudRoute<AccountChartWidgetEntity> {
  constructor(controller: AccountChartWidgetController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/accountChartWidgets';
  }

  protected allMutateHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(),
    this.allMutate,
  ];
}
