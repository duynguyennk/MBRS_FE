export class TypeBike {

    typeBikeID: number
    typeBikeCode: string
    typeBikeName: string
    price: number
    color: string
    numberOfSeat: number
    listImageID: number

    constructor(typeBikeID: number, typeBikeCode: string, typeBikeName: string, price: number, color: string, numberOfSeat: number, listImageID: number) {
        this.typeBikeID = typeBikeID;
        this.typeBikeCode = typeBikeCode;
        this.typeBikeName = typeBikeName;
        this.price = price;
        this.color = color;
        this.numberOfSeat = numberOfSeat;
        this.listImageID = listImageID;
    }
}