import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { CreateOrderRequest } from './create-order-request.dto';
import { CreateOrderEvent } from './create-order.event';
import { v4 as uuidv4 } from 'uuid';
import { Admin, Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('PROCESAMIENTO_SERVICE') private readonly procesamientoClient: ClientKafka
  ) { }

  createOrder({ title, price }: CreateOrderRequest) {
    // Crea el id de la solicitud
    const id = uuidv4();
    this.procesamientoClient.emit('procesamiento', new CreateOrderEvent(id, title, price));
    console.log('Se emitio el evento! pasando a Kafka...')
  }
}
