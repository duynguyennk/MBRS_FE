export class OrderRoomUnpaymentInformation {
    typeRoomID?: number;
    typeRoomName?: string;
    checkIn?: Date;
    checkOut?: Date;
    price?: number;
    numberOfRoom?: number;
    numberOfDay?: number;
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    dateOfBirth?: Date;
    identifyNumber?: string;
    customerID ?: number

    constructor(typeRoomID?: number, typeRoomName?: string,checkIn?: Date,checkOut?: Date,price?: number,numberOfRoom?: number,numberOfDay?: number,fullName?: string,phoneNumber?: string,email?: string,dateOfBirth?: Date,identifyNumber?: string, customerID? : number) {
        this.typeRoomID = typeRoomID
        this.typeRoomName = typeRoomName
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.price = price
        this.numberOfRoom = numberOfRoom
        this.numberOfDay = numberOfDay
        this.fullName = fullName
        this.phoneNumber = phoneNumber
        this.email = email
        this.dateOfBirth = dateOfBirth
        this.identifyNumber = identifyNumber
        this.customerID = customerID
    }
}