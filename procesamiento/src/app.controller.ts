import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderEvent } from './create-order.event';
import { ProcessOrderRequest } from './process-order.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('procesamiento')
  handleProcesamiento(data: CreateOrderEvent) {
    this.appService.handleProcesamiento(data);
  }
}
