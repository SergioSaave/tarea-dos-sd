import { MailerService } from '@nestjs-modules/mailer';
import { OrderStatusEvent } from './order-status.event';
export declare class AppService {
    private readonly mailerService;
    private prisma;
    constructor(mailerService: MailerService);
    handleGetStatus({ id }: any): Promise<{
        id: string;
        title: string;
        price: number;
        estado: string;
    }>;
    handleCreateOrder(orderStatusEvent: OrderStatusEvent): Promise<boolean>;
}
