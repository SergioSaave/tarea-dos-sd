import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrderStatusEvent } from './order-status.event';

@Injectable()
export class AppService {

  constructor(private readonly mailerService: MailerService) { }

  async handleCreateOrder(orderStatusEvent: OrderStatusEvent) {
    console.log('Data recibida: ', orderStatusEvent)
    console.log('Enviando Correo')
    try {
      await this.mailerService.sendMail({
        to: 'pruebasdt2.2024@gmail.com',
        subject: 'Estado de la Orden',
        html: `<b>El estado de la orden se encuentra en el siguiente estado: ${orderStatusEvent.estado}</b><p>Para ver el estado de la orden puede usar el siguiente id: ${orderStatusEvent.id}</p>`
      })
      return true; // Enviado correctamente
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
