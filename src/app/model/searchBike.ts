export class SearchBike {
    dateRent?: Date;
    hoursGetBike?: string;
    timeHire?: number;
    numberOfBike?: number;
    customerID ? :number;
    typeBikeID ?:number;


    constructor(dateRent?: Date,hoursGetBike?: string,numberOfBike?: number,timeHire?: number,customerID?:number,typeBikeID ?:number) {
        this.dateRent = dateRent;
        this.hoursGetBike = hoursGetBike;
        this.timeHire=timeHire;
        this.numberOfBike=numberOfBike;
        this.customerID=customerID;
        this.typeBikeID=typeBikeID;
    }
}