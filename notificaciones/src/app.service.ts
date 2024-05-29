import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrderStatusEvent } from './order-status.event';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class AppService {

  private prisma: PrismaClient;

  constructor(private readonly mailerService: MailerService) {
    this.prisma = new PrismaClient();
  }

  async handleGetStatus({id}: any) {
    try {
      const registro = await this.prisma.registros.findUnique({
        where: { id:  id}
      })

      return registro
    }
    catch (error) {
      console.log(error)
      throw new Error('Error al buscar el registro')
    }
  }

  async handleCreateOrder(orderStatusEvent: OrderStatusEvent) {
    try {
      await this.mailerService.sendMail({
        to: 'pruebasdt2.2024@gmail.com',
        subject: 'Estado de la Orden',
        html: `<b>El estado de la orden se encuentra en el siguiente estado: ${orderStatusEvent.estado}</b><p>Para ver el estado de la orden puede usar el siguiente id: ${orderStatusEvent.id}</p>`
      })

      // Utilizar upsert en lugar de create
      await this.prisma.registros.upsert({
        where: { id: orderStatusEvent.id },
        update: {
          title: orderStatusEvent.title,
          price: orderStatusEvent.price,
          estado: orderStatusEvent.estado,
        },
        create: {
          id: orderStatusEvent.id,
          title: orderStatusEvent.title,
          price: orderStatusEvent.price,
          estado: orderStatusEvent.estado,
        },
      });

      return true; // Enviado correctamente
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
