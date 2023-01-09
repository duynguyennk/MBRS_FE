import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-st-booking-detail',
  templateUrl: './list-st-booking-detail.component.html',
  styleUrls: ['./list-st-booking-detail.component.css']
})
export class ListStBookingDetailComponent implements OnInit {

  constructor() { }
  ngOnInit () {  }
  public show:boolean = false;
  public buttonName:any = 'Show';

  toggle() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
}
