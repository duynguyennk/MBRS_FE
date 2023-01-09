export class ImageTypeRoom {
    position: number;
    typeRoomID: number;
    Base64: string;

    constructor(position: number, typeRoomID: number, Base64: string) {
        this.position = position;
        this.typeRoomID=typeRoomID;
        this.Base64=Base64;
    }
}