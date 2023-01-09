import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-payment-food-booking',
  templateUrl: './payment-food-booking.component.html',
  styleUrls: ['./payment-food-booking.component.css']
})
export class PaymentFoodBookingComponent implements OnInit {
  isLoading = false
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadSnipper()
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
