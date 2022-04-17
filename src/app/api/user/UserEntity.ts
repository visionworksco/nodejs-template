import { Exclude, Expose } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { MongoDbApiEntity } from '../../entity/MongoDbApiEntity';
import { ApplicationRole } from '../../role/application/ApplicationRole';
import { User } from './User';

export class UserEntity extends MongoDbApiEntity implements User {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email = '';

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password = '';

  @Expose()
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(ApplicationRole, { each: true })
  roles?: ApplicationRole[];

  getPrimaryKeys(): string[] {
    return ['email'];
  }
}
