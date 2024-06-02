import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createOrder(createOrderRequest: CreateOrderRequest): void;
}
