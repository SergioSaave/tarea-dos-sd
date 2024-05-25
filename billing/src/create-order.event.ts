export class CreateOrderEvent {
    constructor(
        public readonly orderId: string,
        public readonly userId: string,
        public readonly price: number,
    ) {}
}