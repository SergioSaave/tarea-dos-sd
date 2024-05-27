export class CreateOrderEvent {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly price: number,
    ) {}
}