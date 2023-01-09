export class TypeRoom {
    typeRoomID: number
    typeRoomCode:string
    typeRoomName: string
    numberOfChild: number
    numberOfBed: number
    numberOfBedroom: number
    numberOfAdult: number
    numberOfView: number
    numberOfAddingBed: number
    numberOfBathRoom: number
    price: number
    contentIntroduceRoom: string
    roomSquare: number
    listImageID: number
    listUtilitiesID: number
    safetyBox: boolean
    dryer: boolean
    wifi: boolean
    iron: boolean
    tivi: boolean
    fridge: boolean
    heaterBath: boolean
    bathTub: boolean
    airCondition: boolean
    heaterRoom: boolean
    dinnerTable: boolean
    constructor(typeRoomID: number, typeRoomName: string, numberOfChild: number, numberOfBed: number, numberOfBedroom: number, numberOfAdult: number, numberOfView: number, numberOfAddingBed: number, numberOfBathRoom: number, price: number, contentIntroduceRoom: string, roomSquare: number, listImageID: number, listUtilitiesID: number, safetyBox: boolean, dryer: boolean, wifi: boolean, iron: boolean, tivi: boolean, fridge: boolean, heaterBath: boolean, bathTub: boolean, airCondition: boolean, heaterRoom: boolean, dinnerTable: boolean, typeRoomCode:string) {       
        this.typeRoomID = typeRoomID;
        this.typeRoomCode = typeRoomCode;
        this.typeRoomName = typeRoomName;
        this.numberOfChild = numberOfChild;
        this.numberOfBed = numberOfBed;
        this.numberOfBedroom = numberOfBedroom;
        this.numberOfAdult = numberOfAdult;
        this.numberOfView = numberOfView;
        this.numberOfAddingBed = numberOfAddingBed;
        this.numberOfBathRoom = numberOfBathRoom;
        this.price = price;
        this.contentIntroduceRoom = contentIntroduceRoom;
        this.roomSquare = roomSquare;
        this.listImageID = listImageID;
        this.listUtilitiesID = listUtilitiesID;
        this.safetyBox = safetyBox;
        this.dryer = dryer;
        this.wifi = wifi;
        this.iron = iron;
        this.tivi = tivi;
        this.fridge = fridge;
        this.heaterBath = heaterBath;
        this.bathTub = bathTub;
        this.airCondition = airCondition;
        this.heaterRoom = heaterRoom;
        this.dinnerTable = dinnerTable;
    }
}