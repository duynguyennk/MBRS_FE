import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from 'src/app/constant/loading';

@Component({
  selector: 'app-list-mana-ser-type',
  templateUrl: './list-mana-ser-type.component.html',
  styleUrls: ['./list-mana-ser-type.component.css']
})
export class ListManaSerTypeComponent implements OnInit {
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
