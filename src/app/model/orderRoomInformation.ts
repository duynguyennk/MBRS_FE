export class OrderRoomInformation {
    codeOrder?: string;
    price?: number;
    contentPayment?: string;
    resultPayment?: string;
    contentResultPayment?: string;
    bankTransactionNumber?: string;
    vnpTransactionNumber?: string;
    typePayment?: string;
    bankCode?: string;
    timePayment?: string;
    days?: number;
    fullName?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    identifyNumber?: string;
    email?: string;
    checkIn?: Date;
    checkOut?: Date;
    numberOfRoom?: number;
    typeRoomID?: number;
    customerID?: number;

    constructor(codeOrder?: string, price?: number, contentPayment?: string, resultPayment?: string, contentResultPayment?: string, bankTransactionNumber?: string, vnpTransactionNumber?: string, typePayment?: string, bankCode?: string, timePayment?: string, days?: number, fullName?: string, phoneNumber?: string, dateOfBirth?: Date, identifyNumber?: string, checkIn?: Date, checkOut?: Date, numberOfRoom?: number, typeRoomID?: number, email?: string, customerID?: number) {
        this.codeOrder = codeOrder
        this.price = price
        this.contentPayment = contentPayment
        this.resultPayment = resultPayment
        this.contentResultPayment = contentResultPayment
        this.bankTransactionNumber = bankTransactionNumber
        this.vnpTransactionNumber = vnpTransactionNumber
        this.typePayment = typePayment
        this.timePayment = timePayment
        this.bankCode = bankCode
        this.days = days
        this.fullName = fullName
        this.phoneNumber = phoneNumber
        this.dateOfBirth = dateOfBirth
        this.identifyNumber = identifyNumber
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.numberOfRoom = numberOfRoom
        this.typeRoomID = typeRoomID
        this.email = email
        this.customerID = customerID
    }
}