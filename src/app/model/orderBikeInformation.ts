export class OrderBikeInformation {
    orderCode : string;
    typeBikeID:number;
    price:number;
    contentPayment:string;
    statusPayment:string;
    contentResultPayment:string;
    bankTransactionNumber:string;
    vnpTransactionNumber: string;
    typePayment:string;
    bankCode:string;
    dateTime:string;
    dateTimeGetBike:string;
    numberHoursRent:number;
    numberOfBike:number;
    hoursGetBike:string
    customerID:number;


    constructor( orderCode : string,price:number,contentPayment:string,statusPayment:string,contentResultPayment:string,bankTransactionNumber:string,vnpTransactionNumber: string,typePayment:string,bankCode:string,dateTime:string,dateTimeGetBike:string,numberHoursRent:number,hoursGetBike: string,customerID:number, typeBikeID:number,numberOfBike:number) {
        this.orderCode=orderCode
        this.price=price
        this.contentPayment=contentPayment
        this.statusPayment=statusPayment
        this.contentResultPayment=contentResultPayment
        this.bankTransactionNumber=bankTransactionNumber
        this.vnpTransactionNumber=vnpTransactionNumber
        this.typePayment=typePayment
        this.bankCode=bankCode
        this.dateTimeGetBike=dateTimeGetBike
        this.dateTime=dateTime
        this.numberHoursRent=numberHoursRent
        this.hoursGetBike=hoursGetBike
        this.customerID=customerID
        this.typeBikeID=typeBikeID
        this.numberOfBike=numberOfBike
    }
}