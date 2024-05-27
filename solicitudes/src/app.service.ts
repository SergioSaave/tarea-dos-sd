import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './create-order-request.dto';
import { CreateOrderEvent } from './create-order.event';
import { v4 as uuidv4 } from 'uuid';
import { Admin, Consumer, EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export class AppService {
  private kafka: Kafka;
  private admin: Admin;
  private consumer: Consumer;
  private messages: EachMessagePayload[] = [];

  constructor(
    @Inject('PROCESAMIENTO_SERVICE') private readonly procesamientoClient: ClientKafka,
  ) {

    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'], // Cambia esto por la dirección de tu broker Kafka
    });

    this.admin = this.kafka.admin();
    this.consumer = this.kafka.consumer({ groupId: 'procesamiento-consumer' });
  }

  getStatus(id: string): string {
    return `El estado de la solicitud ${id} es pendiente`;
  }
  createOrder({ title, price }: CreateOrderRequest) {
    // Crea el id de la solicitud
    const id = uuidv4();
    this.procesamientoClient.emit('crear_solicitud', new CreateOrderEvent(id, title, price));
    console.log('Se emitio el evento! pasando a Kafka...')
  }
}
