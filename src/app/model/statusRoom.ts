export class StatusRoom {
    roomID?: number
    roomName?: string
    typeRoomName?: string
    fullName?: string
    checkIn?: string
    checkOut?: string
    statusRoom?: number
    orderID?: number
    floorID?: number
    orderRoomDetailID ?:number

    constructor(roomID: number, roomName: string, typeRoomName: string, fullName: string,checkIn: string,checkOut: string,statusRoom: number,orderID: number,floorID: number, orderRoomDetailID :number) {
        this.roomID = roomID;
        this.roomName = roomName;
        this.typeRoomName = typeRoomName;
        this.fullName = fullName;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.statusRoom = statusRoom;
        this.orderID = orderID;
        this.floorID = floorID;
        this.orderRoomDetailID = orderRoomDetailID;
    }
}