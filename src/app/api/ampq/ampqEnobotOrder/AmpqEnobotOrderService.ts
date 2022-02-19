import { AsyncUtils } from '@visionworksco/expressjs-middleware';
import { BaseApiCrudService } from '../../../service/BaseApiCrudService';
import { AmpqCmdExchangeMessageAction } from '../ampqCmdExchange/AmpqCmdExchangeMessageAction';
import { AmpqCmdExchangeMessageDestination } from '../ampqCmdExchange/AmpqCmdExchangeMessageDestination';
import { AmpqCmdExchangeMessageEntity } from '../ampqCmdExchange/AmpqCmdExchangeMessageEntity';
import { AmpqCmdExchangeService } from '../ampqCmdExchange/AmpqCmdExchangeService';
import { AmpqEnobotOrder } from './AmpqEnobotOrder';
import { AmpqEnobotOrderAddPayload } from './AmpqEnobotOrderAddPayload';
import { AmpqEnobotOrderDeletePayload } from './AmpqEnobotOrderDeletePayload';
import { AmpqEnobotOrderEntity } from './AmpqEnobotOrderEntity';
import { AmpqEnobotOrderLimit } from './AmpqEnobotOrderLimit';
import { AmpqEnobotOrderRepository } from './AmpqEnobotOrderRepository';

type OrderTransformed = Partial<AmpqEnobotOrder>;
type AmpqEnobotOrderLimitTransformed = Omit<Partial<AmpqEnobotOrderLimit>, 'orders'> & {
  orders?: OrderTransformed[];
};
type PayloadTransformed = {
  orders: OrderTransformed[] | null;
  limit: AmpqEnobotOrderLimitTransformed | null;
};

export class AmpqEnobotOrderService extends BaseApiCrudService<AmpqEnobotOrderEntity> {
  constructor(repository: AmpqEnobotOrderRepository) {
    super(repository);
  }

  async addOrder(payload: AmpqEnobotOrderAddPayload, userId?: string): Promise<void> {
    try {
      const payloadTransfomed = this.transformPayload(payload);
      const { orders, limit } = payloadTransfomed;

      let args: string | null = null;
      let msgDestination: AmpqCmdExchangeMessageDestination = 'stromtanke';
      let action: AmpqCmdExchangeMessageAction = 'addNewOrder';
      if (orders) {
        args = JSON.stringify(orders);
        msgDestination = 'stromtanke';
        action = 'addNewOrder';
      } else if (limit) {
        args = JSON.stringify(limit);
        msgDestination = 'con';
        action = 'addNewLimitOrder';
      }

      const message = new AmpqCmdExchangeMessageEntity(msgDestination, 'cockpit', action, args);

      const ampqService = new AmpqCmdExchangeService();
      await ampqService.start();
      await ampqService.produce(message, userId);
      await AsyncUtils.wait(500);
      ampqService.stop();

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOrder(payload: AmpqEnobotOrderDeletePayload, userId?: string): Promise<void> {
    try {
      const message = new AmpqCmdExchangeMessageEntity(
        'con',
        'cockpit',
        'deleteLimitOrder',
        JSON.stringify(payload),
      );

      const ampqService = new AmpqCmdExchangeService();
      await ampqService.start();
      await ampqService.produce(message, userId);
      await AsyncUtils.wait(500);
      ampqService.stop();

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private transformPayload(payload: AmpqEnobotOrderAddPayload): PayloadTransformed {
    const payloadTransformed = { ...payload } as PayloadTransformed;
    const { orders, limit } = payloadTransformed;

    if (orders !== null) {
      const ordersTransformed = orders.map((order) => this.transformOrder(order));
      payloadTransformed.orders = ordersTransformed;
    }

    if (limit) {
      const limitTransformed = { ...limit } as AmpqEnobotOrderLimitTransformed;
      if (limitTransformed.orders) {
        const ordersTransformed = limitTransformed.orders.map((order) =>
          this.transformOrder(order),
        );
        limitTransformed.orders = ordersTransformed;
      }
    }

    return payloadTransformed;
  }

  private transformOrder(order: OrderTransformed): OrderTransformed {
    const orderUpdated = { ...order } as OrderTransformed;
    delete orderUpdated.id;
    return orderUpdated;
  }
}
