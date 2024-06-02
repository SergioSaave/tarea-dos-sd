"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderEvent = void 0;
class CreateOrderEvent {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    toString() {
        return JSON.stringify({
            id: this.id,
            title: this.title,
            price: this.price,
        });
    }
}
exports.CreateOrderEvent = CreateOrderEvent;
//# sourceMappingURL=create-order.event.js.map