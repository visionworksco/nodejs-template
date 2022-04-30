import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MongoDbApiEntity } from '../../repository/mongodb/MongoDbApiEntity';
import { Config } from './Config';

export class ConfigEntity extends MongoDbApiEntity implements Config {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  payPalClientId?: string;
}
