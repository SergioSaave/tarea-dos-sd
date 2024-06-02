import { ProcessOrderRequest } from './process-order.event';
import { ClientKafka } from '@nestjs/microservices';
export declare class AppService {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    private messages;
    handleProcesamiento(evento: ProcessOrderRequest): void;
}
