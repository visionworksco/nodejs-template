import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { AccountChartWidgetEntity } from './AccountChartWidgetEntity';
import { AccountChartWidgetService } from './AccountChartWidgetService';

export class AccountChartWidgetController extends BaseApiCrudController<AccountChartWidgetEntity> {
  constructor(service: AccountChartWidgetService) {
    super(service, AccountChartWidgetEntity);
  }
}
