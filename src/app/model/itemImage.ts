export class ItemImage {
    idObject : number
    base64: string

    constructor(idObject : number,base64: string) {
        this.base64 = base64;
        this.idObject = idObject;
    }
}