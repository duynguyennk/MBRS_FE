export class TypeCarAirport {

    typeCarAirportID: number
    typeCarAirportCode: string
    typeCarAirportName: string
    price: number
    numberOfSeat: number
    color: string

    constructor(typeCarAirportID: number, typeCarAirportCode: string, typeCarAirportName: string, price: number, numberOfSeat: number, color: string) {
        this.typeCarAirportID = typeCarAirportID;
        this.typeCarAirportCode = typeCarAirportCode;
        this.typeCarAirportName = typeCarAirportName;
        this.price = price;
        this.numberOfSeat = numberOfSeat;
        this.color = color;
    }
}