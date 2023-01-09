import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { OrderFood } from 'src/app/model/orderFood';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { OrderFoodService } from 'src/app/services/order-food.service';

@Component({
  selector: 'app-list-food-beverage',
  templateUrl: './list-food-beverage.component.html',
  styleUrls: ['./list-food-beverage.component.css'],
})
export class ListFoodBeverageComponent implements OnInit {
  currentRate = 3;
  listFood: any;
  isLoading = false;
  objectJason: any;
  stringSplit: any;
  information: any;
  caculatePrice: any;
  orderFood: Array<{ orderFoodInformation: OrderFood }> = [];
  foodOrder: OrderFood[] = [];
  foodListArray: any = [];
  tempArray: any = [];
  newArray: any = [];
  checkBoxArray: any = [
    {
      id: 1,
      type: 'checkbox',
      rangePrice: '0 VNĐ - 20,000 VNĐ',
      isSelected: false,
    },
    {
      id: 2,
      type: 'checkbox',
      rangePrice: '20,000 VNĐ - 50,000 VNĐ',
      isSelected: false,
    },
    {
      id: 3,
      type: 'checkbox',
      rangePrice: '50,000 VNĐ - 100,000 VNĐ',
      isSelected: false,
    },
    {
      id: 4,
      type: 'checkbox',
      rangePrice: '100,000 VNĐ - 250,000 VNĐ',
      isSelected: false,
    },
  ];

  constructor(
    private orderFoodService: OrderFoodService,
    private router: Router,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadSnipper();
  }
  loadData() {
    this.orderFoodService.getListFood().subscribe((res) => {
     if(res.code==='200'){
      this.listFood = res.data;
      this.foodListArray = res.data;
     }else{
      this.confirmationErrDialogService.confirm(Constant.loadData.title,Constant.loadData.errData)
     }
    });
  }
  changeStatusCheckBox(id: number, status: boolean) {
    for (var i = 0; i < this.checkBoxArray.length; i++) {
      if (this.checkBoxArray[i].id == id) {
        this.checkBoxArray[i].isSelected = status;
      }
    }
  }
  checkStatusCheckBox(): boolean {
    for (var i = 0; i < this.checkBoxArray.length; i++) {
      if (this.checkBoxArray[i].isSelected) {
        return true;
      }
    }
    return false;
  }
  filterPriceSelectedChange(minPrice: number, maxPrice: number) {
    this.tempArray = this.foodListArray.filter(
      (e: any) => e.price > minPrice && e.price <= maxPrice
    );
    this.listFood = [];
    this.newArray.push(this.tempArray);
    for (let i = 0; i < this.newArray.length; i++) {
      var firstArray = this.newArray[i];
      for (let j = 0; j < firstArray.length; j++) {
        var obj = firstArray[j];
        this.listFood.push(obj);
      }
    }
  }
  filterPriceUnselectedChange(minPrice: number, maxPrice: number) {
    this.tempArray = this.listFood.filter(
      (e: any) => e.price <= minPrice || e.price > maxPrice
    );
    this.listFood = [];
    this.newArray = [];
    this.newArray.push(this.tempArray);
    for (let i = 0; i < this.newArray.length; i++) {
      var firstArray = this.newArray[i];
      for (let j = 0; j < firstArray.length; j++) {
        var obj = firstArray[j];
        this.listFood.push(obj);
      }
    }
  }

  onChange(event: any) {
    if (event.target.checked) {
      if (event.target.value == 1) {
        this.filterPriceSelectedChange(0, 20000);
        this.changeStatusCheckBox(1, true);
      } else if (event.target.value == 2) {
        this.filterPriceSelectedChange(20000, 50000);
        this.changeStatusCheckBox(2, true);
      } else if (event.target.value == 3) {
        this.filterPriceSelectedChange(50000, 100000);
        this.changeStatusCheckBox(3, true);
      } else if (event.target.value == 4) {
        this.filterPriceSelectedChange(100000, 250000);
        this.changeStatusCheckBox(4, true);
      }
    } else {
      if (event.target.value == 1) {
        this.filterPriceUnselectedChange(0, 20000);
        this.changeStatusCheckBox(1, false);
      } else if (event.target.value == 2) {
        this.filterPriceUnselectedChange(20000, 50000);
        this.changeStatusCheckBox(2, false);
      } else if (event.target.value == 3) {
        this.filterPriceUnselectedChange(50000, 100000);
        this.changeStatusCheckBox(3, false);
      } else if (event.target.value == 4) {
        this.filterPriceUnselectedChange(100000, 250000);
        this.changeStatusCheckBox(4, false);
      }
      if (this.checkStatusCheckBox() == false) {
        this.newArray = [];
        this.listFood = this.foodListArray;
      }
    }
  }
  onSearchChange(orderInformation: any) {
    this.objectJason = JSON.stringify(orderInformation);
    for (var prop in orderInformation) {
      if (orderInformation[prop] !== '') {
        this.stringSplit = orderInformation[prop].split('.');
        this.caculatePrice =
          Number(this.stringSplit[3]) * Number(this.stringSplit[2]);
        this.information = new OrderFood(
          this.stringSplit[0],
          this.stringSplit[1],
          this.stringSplit[2],
          this.stringSplit[3],
          this.caculatePrice
        );
        this.foodOrder.push(this.information);
      }
    }
    if (this.foodOrder.length != 0) {
      localStorage.setItem('foodInformation', JSON.stringify(this.foodOrder));
      this.router.navigateByUrl('booking-service/food-beverage/food-payment');
    } else {
      this.confirmationErrDialogService.confirm(
        Constant.ManaCRUD_DIALOG_TITLE.title,
        Constant.ManaCRUD_DIALOG_TITLE.FoodSearchError
      );
    }
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
