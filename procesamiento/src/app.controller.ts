import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateOrderEvent } from './create-order.event';
import { ProcessOrderRequest } from './process-order.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('crear_solicitud')
  handleCreateOrder(data: CreateOrderEvent) {
    this.appService.handleCreateOrder(data);
  }

  @EventPattern('procesar_solicitud')
  handleProcessOrder(data: ProcessOrderRequest) {
    this.appService.handleProcessOrder(data);
  }

}
