import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './create-order-request.dto';
export declare class AppService {
    private readonly procesamientoClient;
    constructor(procesamientoClient: ClientKafka);
    createOrder({ title, price }: CreateOrderRequest): void;
}
