import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { ChartWidget } from './ChartWidget';

export class ChartWidgetAllFieldsEntity extends BaseApiEntity implements ChartWidget {
  name: string;
  data: string;

  constructor() {
    super();

    this.id = '';
    this.createdAt = '';
    this.createdBy = '';
    this.updatedAt = '';
    this.updatedBy = '';
    this.name = '';
    this.data = '';
  }
}
