import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-payment-bicycle-booking',
  templateUrl: './payment-bicycle-booking.component.html',
  styleUrls: ['./payment-bicycle-booking.component.css']
})
export class PaymentBicycleBookingComponent implements OnInit {
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
