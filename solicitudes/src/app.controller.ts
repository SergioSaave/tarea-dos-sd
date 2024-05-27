import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('status/:id')
  getStatus(@Param('id') id: string): string {
    return this.appService.getStatus(id);
  }

  @Post()
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest)
  }
}
