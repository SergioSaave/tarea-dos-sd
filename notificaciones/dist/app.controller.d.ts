import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    handleGetStatus(id: String): Promise<{
        id: string;
        title: string;
        price: number;
        estado: string;
    }>;
    handleCreateOrder(data: any): void;
}
