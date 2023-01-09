export class FeedbackService {
    orderID?: number
    ratingNumber?: number
    contentRating?: string
    selectedOption?:number

    constructor(orderID?: number,ratingNumber?: number,contentRating?: string,selectedOption?:number) {
        this.orderID = orderID;
        this.ratingNumber = ratingNumber;
        this.contentRating = contentRating;
        this.selectedOption = selectedOption;
        this.contentRating = contentRating;
    }
}