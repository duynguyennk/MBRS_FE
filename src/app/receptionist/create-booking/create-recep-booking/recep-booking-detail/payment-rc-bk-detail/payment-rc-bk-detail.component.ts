import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-payment-rc-bk-detail',
  templateUrl: './payment-rc-bk-detail.component.html',
  styleUrls: ['./payment-rc-bk-detail.component.css']
})
export class PaymentRcBkDetailComponent implements OnInit {
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
