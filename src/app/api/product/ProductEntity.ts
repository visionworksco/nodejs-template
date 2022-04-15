import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseApiEntity } from '../../entity/BaseApiEntity';
import { Product } from './Product';

export class ProductEntity extends BaseApiEntity implements Product {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  description = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  brand = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  category = '';

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price = 0.0;
}
