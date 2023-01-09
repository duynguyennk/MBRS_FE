import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../constant/loading';

@Component({
  selector: 'app-rating-services',
  templateUrl: './rating-services.component.html',
  styleUrls: ['./rating-services.component.css']
})
export class RatingServicesComponent implements OnInit {

  isLoading = false
  stringFeedBack!: string
  constructor(private route: ActivatedRoute) { }
  feedback = new UntypedFormGroup({
    orderID: new UntypedFormControl(),
    numberRatingConveniences: new UntypedFormControl(),
    numberRatingInterior: new UntypedFormControl(),
    numberRatingEmployee: new UntypedFormControl(),
    numberRatingService: new UntypedFormControl(),
    numberRatingHygiene: new UntypedFormControl(),
    numberRatingView: new UntypedFormControl(),
    contentRating: new UntypedFormControl(),
  });
  ngOnInit(): void {
    this.loadSnipper()
    this.route.queryParams.subscribe((res) => {
      this.feedback.controls.orderID.setValue(res.orderID);
    });
  }
  onSubmit() {
    this.stringFeedBack = this.feedback.value

  }
  loadSnipper() {
    this.isLoading = true
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad)
  }

}
