export class OrderFoodInformation {
    orderCode :string;
    price :number;
    contentPayment :string;
    statusPayment :string;
    contentResultPayment :string;
    bankTransactionNumber:string;
    vnpTransactionNumber :string;
    typePayment :string;
    bankCode :string;
    dateTime :string;
    quanity :number;
    foodID :number;
    customerID :number;
    foodName:string;

    constructor( orderCode :string,price :number,contentPayment :string,statusPayment :string,contentResultPayment :string,bankTransactionNumber:string,vnpTransactionNumber :string,typePayment :string,bankCode :string,dateTime :string,quanity :number,foodID :number,customerID :number, foodName:string) {
        this.orderCode=orderCode
        this.price=price
        this.contentPayment=contentPayment
        this.statusPayment=statusPayment
        this.contentResultPayment=contentResultPayment
        this.bankTransactionNumber=bankTransactionNumber
        this.vnpTransactionNumber=vnpTransactionNumber
        this.typePayment=typePayment
        this.dateTime=dateTime
        this.bankCode=bankCode
        this.quanity=quanity
        this.foodID=foodID
        this.customerID=customerID
        this.foodName=foodName
    }
}