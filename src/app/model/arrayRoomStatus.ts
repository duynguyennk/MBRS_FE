import { StatusRoom } from "./StatusRoom";


export class ArrayRoomStatus {
    floorID : number
    floorName:string
    listRoom: Array<StatusRoom> =[] 

    constructor(floorID: number,listRoom:Array<StatusRoom> =[],floorName:string) {
        this.floorID = floorID;
        this.listRoom = listRoom;
        this.floorName = floorName;
    }
}