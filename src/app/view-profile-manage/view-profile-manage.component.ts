import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../constant/loading';

@Component({
  selector: 'app-view-profile-manage',
  templateUrl: './view-profile-manage.component.html',
  styleUrls: ['./view-profile-manage.component.css']
})
export class ViewProfileManageComponent implements OnInit {
  isLoading = false
  constructor() { }

  ngOnInit(): void {
    this.loadSnipper()
  }
  loadSnipper(){
    this.isLoading = true
    setTimeout(()=>(this.isLoading=false),LoadingComponent.timeLoad)
  }
}
