import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICACIONES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notificaciones',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'notificaciones-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
