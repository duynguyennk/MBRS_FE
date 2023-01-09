import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-edit-infor-booking',
  templateUrl: './edit-infor-booking.component.html',
  styleUrls: ['./edit-infor-booking.component.css']
})
export class EditInforBookingComponent implements OnInit {
  isLoading = false
  constructor() { }

  ngOnInit(): void {
    this.loadSnipper()
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
