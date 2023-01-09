export class Bike {

    bikeID?: number
    typeBikeID?: number
    bikeCode?: string
    bikeName?: string

    constructor(bikeID?: number, typeBikeID?: number, bikeCode?: string, bikeName?: string) {
        this.bikeID = bikeID;
        this.typeBikeID = typeBikeID;
        this.bikeCode = bikeCode;
        this.bikeName = bikeName;
    }
}