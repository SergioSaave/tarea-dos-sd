import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderEvent } from './create-order.event';
import { ProcessOrderRequest } from './process-order.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('recibe_solicitud')
  handleRecibeOrden(data: CreateOrderEvent) {
    this.appService.handleRecibeOrden(data);
  }

  @EventPattern('prepara_solicitud')
  handlePreparaOrden(data: ProcessOrderRequest) {
    this.appService.handlePreparaOrden(data);
  }

  @EventPattern('entrega_solicitud')
  handleEntregaOrden(data: ProcessOrderRequest) {
    this.appService.handleEntregaOrden(data);
  }

  @EventPattern('finaliza_solicitud')
  handleFinalizaOrden(data: ProcessOrderRequest) {
    this.appService.handleFinalizaOrden(data);
  }
}
