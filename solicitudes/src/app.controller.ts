import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dto';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest)
  }
}
