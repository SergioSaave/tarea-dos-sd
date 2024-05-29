import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status/:id')
  handleGetStatus(@Param() id: String) {
    return this.appService.handleGetStatus(id);
  }
  
  @EventPattern('notificaciones')
  handleCreateOrder(data: any) {
    this.appService.handleCreateOrder(data);
  }

  // @Get('status/:id')
  // handleGetStatus(@Param() id: string) {
  //   return this.appService.handleGetStatus(id);
  // }
}
