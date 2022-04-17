/* istanbul ignore file */

import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PsqlApiEntity } from '../../repository/postgresql/PsqlApiEntity';
import { Account } from './Account';

export class AccountEntity extends PsqlApiEntity implements Account {
  @Expose()
  @IsEmail()
  email = '';

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsString()
  password = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  groups?: string[] = [];

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  permissions?: string[] = [];

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  roles?: string[] = [];
}
