export class OrderFood {
    foodName:string;
    foodID: number;
    quantity: number;
    price:number;
    totalPrice:number;

    constructor(foodName:string,foodID: number, quantity: number,price:number,totalPrice:number) {
        this.foodName = foodName;
        this.foodID = foodID;
        this.quantity=quantity;
        this.price=price;
        this.totalPrice=totalPrice;
    }
}