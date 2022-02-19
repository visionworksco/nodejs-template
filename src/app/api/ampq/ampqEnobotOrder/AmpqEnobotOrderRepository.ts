import {
  PageRequest,
  PageResult,
  Repository,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { AmpqEnobotOrderEntity } from './AmpqEnobotOrderEntity';

export class AmpqEnobotOrderRepository implements Repository<AmpqEnobotOrderEntity> {
  async findAll(pageRequest: PageRequest): Promise<PageResult<AmpqEnobotOrderEntity>> {
    throw ServerException.NotImplementedException();
  }

  async findById(id: string): Promise<AmpqEnobotOrderEntity> {
    throw ServerException.NotImplementedException();
  }

  async findOne(query: Object): Promise<AmpqEnobotOrderEntity> {
    throw ServerException.NotImplementedException();
  }

  async save(entity: AmpqEnobotOrderEntity): Promise<AmpqEnobotOrderEntity> {
    throw ServerException.NotImplementedException();
  }

  async updateById(id: string, query: Object): Promise<AmpqEnobotOrderEntity> {
    throw ServerException.NotImplementedException();
  }

  async deleteById(id: string): Promise<AmpqEnobotOrderEntity> {
    throw ServerException.NotImplementedException();
  }
}
