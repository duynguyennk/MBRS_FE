import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-list-all-account',
  templateUrl: './list-all-account.component.html',
  styleUrls: ['./list-all-account.component.css']
})
export class ListAllAccountComponent implements OnInit {
  isLoading = false
  constructor() {
   }

  ngOnInit(): void {
    this.loadSnipper()
  }
  
  loadSnipper(){
    this.isLoading = true
    setTimeout(()=>(this.isLoading=false),LoadingComponent.timeLoad)
  }
  
}
