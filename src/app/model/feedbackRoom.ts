export class FeedbackRoom {
    orderID?: number
    numberRatingConveniences?: number
    numberRatingInterior?: number
    numberRatingEmployee?: number
    numberRatingService?: number
    numberRatingHygiene?: number
    numberRatingView?: number
    contentRating?: string

    constructor(orderID?: number, numberRatingConveniences?: number, numberRatingInterior?: number, numberRatingEmployee?: number, numberRatingService?: number, numberRatingHygiene?: number, numberRatingView?: number, contentRating?: string) {
        this.orderID = orderID;
        this.numberRatingConveniences = numberRatingConveniences;
        this.numberRatingInterior = numberRatingInterior;
        this.numberRatingEmployee = numberRatingEmployee;
        this.numberRatingService = numberRatingService;
        this.numberRatingHygiene = numberRatingHygiene;
        this.numberRatingView = numberRatingView;
        this.contentRating = contentRating;
    }
}