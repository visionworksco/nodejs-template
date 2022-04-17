import { MongoDbUtils } from '@visionworksco/nodejs-middleware';
import { Expose, Transform, Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { MongoDbApiEntity } from '../../repository/mongodb/MongoDbApiEntity';
import { Product } from './Product';

export class ProductEntity extends MongoDbApiEntity implements Product {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  image = '';

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

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  countInStock = 0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  rating = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  numReviews = 0;

  @Expose()
  @Type(() => ObjectId)
  @Transform(MongoDbUtils.toObjectId('user'), { toClassOnly: true })
  @IsMongoId()
  @IsNotEmpty()
  user = '';

  @Expose()
  @Type(() => ObjectId)
  @Transform(MongoDbUtils.toArrayObjectId('reviews'), { toClassOnly: true })
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  reviews?: string[];
}
