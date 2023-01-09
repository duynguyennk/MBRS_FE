import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-list-booking-service',
  templateUrl: './list-booking-service.component.html',
  styleUrls: ['./list-booking-service.component.css']
})
export class ListBookingServiceComponent implements OnInit {
  isLoading = false
  constructor() { }

  ngOnInit(): void {
    this.loadSnipper()
    window.scrollTo(0, 0);
  }

  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
