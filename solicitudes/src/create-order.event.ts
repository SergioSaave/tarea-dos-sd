export class CreateOrderEvent {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly price: number,
  ) {}

  toString() {
    return JSON.stringify({
        id: this.id,
        title: this.title,
        price: this.price,
    })
  }
}