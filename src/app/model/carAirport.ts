export class CarAirport {

    carAirportID: number
    carAirportName: string
    carAirportCode: string
    typeCarAirportID: number
    identifyCarNumber: string
    color: string
    image?: string

    constructor(carAirportID: number, carAirportName: string, carAirportCode: string, typeCarAirportID: number, color: string, identifyCarNumber: string, image?: string) {
        this.carAirportID = carAirportID;
        this.carAirportName = carAirportName;
        this.carAirportCode = carAirportCode;
        this.identifyCarNumber = identifyCarNumber;
        this.typeCarAirportID = typeCarAirportID;
        this.color = color;
        this.image = image;
    }
}