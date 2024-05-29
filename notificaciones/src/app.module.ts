import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pruebasdt2.2024@gmail.com',
            pass: process.env.PASS_GOOGLE,
        },
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ifuq zxih ikxw nfcw