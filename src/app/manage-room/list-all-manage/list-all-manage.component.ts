import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-list-all-manage',
  templateUrl: './list-all-manage.component.html',
  styleUrls: ['./list-all-manage.component.css']
})
export class ListAllManageComponent implements OnInit {
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
