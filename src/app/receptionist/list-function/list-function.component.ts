import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-function',
  templateUrl: './list-function.component.html',
  styleUrls: ['./list-function.component.css']
})
export class ListFunctionComponent implements OnInit {
  webUrl = environment.webUrl
  isLoading = false
  today:any;
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadSnipper()
    this.today=Date.now();
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
