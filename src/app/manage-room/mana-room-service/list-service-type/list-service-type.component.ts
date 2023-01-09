import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-list-service-type',
  templateUrl: './list-service-type.component.html',
  styleUrls: ['./list-service-type.component.css']
})
export class ListServiceTypeComponent implements OnInit {
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
