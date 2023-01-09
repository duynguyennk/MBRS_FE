export class ChangeStatusRoom {
    valueStatus: number;
    orderID: number;
    selectDate: Date;
    constructor(valueStatus: number, orderID: number, selectDate: Date) {
        this.valueStatus = valueStatus;
        this.orderID = orderID;
        this.selectDate = selectDate;

    }
}