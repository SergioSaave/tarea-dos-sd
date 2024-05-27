import { Injectable } from '@nestjs/common';
import { OrderStatusEvent } from './order-status.event';

@Injectable()
export class AppService {
  
  handleCreateOrder(orderStatusEvent: OrderStatusEvent) {
    console.log('Recibe la solicitud de Kafka...')
    console.log(`Solicitud: ${orderStatusEvent.id} - ${orderStatusEvent.title} - ${orderStatusEvent.price}`)
  }
}
