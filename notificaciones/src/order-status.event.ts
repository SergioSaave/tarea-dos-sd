export class OrderStatusEvent {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly price: number,
        public readonly estado: string,
    ) {}
}