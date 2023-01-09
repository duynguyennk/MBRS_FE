import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/constant/loading';
import { OrderFood } from 'src/app/model/orderFood';
import { OrderFoodService } from 'src/app/services/order-food.service';

@Component({
  selector: 'app-order-food-booking',
  templateUrl: './order-food-booking.component.html',
  styleUrls: ['./order-food-booking.component.css']
})
export class OrderFoodBookingComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(){}

}
