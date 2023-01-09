export class StatusBike {
    orderID: number;
    status: number;
    constructor(orderID: number, status: number) {
        this.orderID = orderID;
        this.status = status;
    }
}