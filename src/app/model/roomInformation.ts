export class RoomInformation {
    roomID ?: number
    roomName ?:string
    roomCode ? :string
    typeRoomID ?: number
    floorID ?: number

    constructor(roomID?: number, roomName?: string, roomCode?: string, typeRoomID?: number, floorID?: number) {
        this.roomID = roomID;
        this.roomName = roomName?.trim();
        this.roomCode = roomCode?.trim();
        this.typeRoomID = typeRoomID;
        this.floorID = floorID;
    }
}