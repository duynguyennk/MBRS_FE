export class CancelOrderRoomCustomer {
    orderID: number;
    contentPayment:string;
    constructor(orderID: number, contentPayment: string) {
        this.orderID = orderID;
        this.contentPayment = contentPayment;
    }
}