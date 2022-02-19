/* istanbul ignore file */

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { ChartWidget } from './ChartWidget';

export class ChartWidgetEntity extends BaseApiEntity implements ChartWidget {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsNotEmpty()
  data = '';
}
