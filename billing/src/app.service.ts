import { Injectable } from '@nestjs/common';
import { CreateOrderEvent } from './create-order.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleCreateOrder(createOrderEvent: CreateOrderEvent) {
    console.log(createOrderEvent)
  }
}
