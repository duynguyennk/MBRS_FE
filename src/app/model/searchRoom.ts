export class SearchRoom {
    typeRoomID?:number;
    checkInDate?: Date;
    checkOutDate?: Date;
    numberOfRoom?: number;
    numberOfAdult?: number;
    numberOfChild?: number;
    price?: number;
    typeRoomName?:string

    constructor(typeRoomID?:number,checkInDate?: Date, checkOutDate?: Date, numberOfRoom?: number,price?: number,typeRoomName?:string, numberOfAdult?: number,numberOfChild?: number) {
        this.typeRoomID = typeRoomID;
        this.checkInDate = checkInDate;
        this.checkOutDate=checkOutDate;
        this.numberOfRoom=numberOfRoom;
        this.numberOfAdult=numberOfAdult;
        this.numberOfChild=numberOfChild;
        this.price=price;
        this.typeRoomName=typeRoomName;
    }
}