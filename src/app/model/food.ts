export class Food {

    foodID: number
    foodName: string
    foodCode: string
    price: number
    quantity: number
    typeFoodID: number
    image?: string

    constructor(foodID: number, foodName: string, foodCode: string, price: number, quantity: number, typeFoodID: number, image?: string) {
        this.foodID = foodID;
        this.foodName = foodName;
        this.foodCode = foodCode;
        this.price = price;
        this.quantity = quantity;
        this.typeFoodID = typeFoodID;
        this.image = image;
    }
}