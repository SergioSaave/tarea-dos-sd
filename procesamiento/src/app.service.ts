import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderEvent } from './create-order.event';
import { ProcessOrderRequest } from './process-order.event';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('NOTIFICACIONES_SERVICE') private readonly authClient: ClientKafka,
  ) { }

  handleCreateOrder(createOrderEvent: CreateOrderEvent) {
    console.log('Evento recibido: ', createOrderEvent);
    const processOrderRequest: ProcessOrderRequest = {
      id: createOrderEvent.id,
      title: createOrderEvent.title,
      price: createOrderEvent.price,
      estado: 'recibido'
    };
    setTimeout(() => {
      this.authClient.emit('procesar_solicitud', processOrderRequest);
      console.log('Mesaje emitido')
    }, 5000)
  }

  handleProcessOrder(processOrderRequest: ProcessOrderRequest) {
    processOrderRequest.estado = 'Finalizado';
    console.log('Solicitud procesada', processOrderRequest)
  }
}
