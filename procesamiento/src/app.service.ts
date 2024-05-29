import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderEvent } from './create-order.event';
import { ProcessOrderRequest } from './process-order.event';
import { ClientKafka } from '@nestjs/microservices';

// pruebasdt2.2024@gmail.com
@Injectable()
export class AppService {
  constructor(
    @Inject('NOTIFICACIONES_SERVICE') private readonly authClient: ClientKafka,
  ) { }

  private messages = new Map<String, { topic: String, message: ProcessOrderRequest }>

  handleProcesamiento(evento: ProcessOrderRequest) {
    if (evento.estado === undefined) evento.estado = 'Recibido';
    else if (evento.estado === 'Recibido') evento.estado = 'Preparando';
    else if (evento.estado === 'Preparando') evento.estado = 'Entregando';
    else if (evento.estado === 'Entregando') evento.estado = 'Finalizando';
    else return;
    this.authClient.emit('notificaciones', evento);
    setTimeout(() => {
      this.authClient.emit('procesamiento', evento);
    }, 3000) // Despues de 3 segundos lo manda a la cola
  }
}
