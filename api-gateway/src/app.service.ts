import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './create-order-request.dto';
import { CreateOrderEvent } from './create-order.event';

@Injectable()
export class AppService {

  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  createOrder({ userId, price }: CreateOrderRequest) {
    this.billingClient.emit('create_order', new CreateOrderEvent('123', userId, price));
  }
}
