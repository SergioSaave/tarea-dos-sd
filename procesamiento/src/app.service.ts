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

  private orden: CreateOrderEvent | ProcessOrderRequest;

  handleRecibeOrden(createOrderEvent: CreateOrderEvent) {
    console.log('Evento recibido: ', createOrderEvent);
    // Lo marca como Recibido
    const processOrderRequest: ProcessOrderRequest = {
      id: createOrderEvent.id,
      title: createOrderEvent.title,
      price: createOrderEvent.price,
      estado: 'Recibido'
    };
    this.authClient.emit('NOTIFICACIONES', processOrderRequest);
    this.orden = processOrderRequest;
    setTimeout(() => {
      // La manda a PREPARAR
      this.authClient.emit('prepara_solicitud', processOrderRequest);
      console.log('Mesaje emitido: Preparar')
    }, 20000) // Despues de 3 segundos lo manda a la cola
  }

  handlePreparaOrden(preparaOrdenEvent: ProcessOrderRequest) {
    console.log('Evento recibido: ', preparaOrdenEvent);
    // Lo marca como Preparando
    preparaOrdenEvent.estado = 'Preparando'
    this.authClient.emit('NOTIFICACIONES', preparaOrdenEvent);
    this.orden = preparaOrdenEvent;
    setTimeout(() => {
      // La manda a Entregar
      this.authClient.emit('entrega_solicitud', preparaOrdenEvent);
    }, 20000) // Despues de 3 segundos lo manda a la cola
  }

  handleEntregaOrden(entregaOrdenEvent: ProcessOrderRequest) {
    console.log('Evento recibido: ', entregaOrdenEvent);
    // Lo marca como Entregando
    entregaOrdenEvent.estado = 'Entregando'
    this.authClient.emit('NOTIFICACIONES', entregaOrdenEvent);
    this.orden = entregaOrdenEvent;
    setTimeout(() => {
      // La manda a Finalizar
      this.authClient.emit('finaliza_solicitud', entregaOrdenEvent);
    }, 20000) // Despues de 3 segundos lo manda a la cola
  }

  handleFinalizaOrden(finalizaOrdenEvent: ProcessOrderRequest) {
    console.log('Evento recibido: ', finalizaOrdenEvent);
    // Lo marca como Entregando
    finalizaOrdenEvent.estado = 'Finalizado'
    this.orden = finalizaOrdenEvent;
    setTimeout(() => {
      // TODO: hacer el topic de notificaciones
      this.authClient.emit('NOTIFICACIONES', finalizaOrdenEvent);
    }, 20000) // Despues de 3 segundos lo manda a la cola
  }
}
