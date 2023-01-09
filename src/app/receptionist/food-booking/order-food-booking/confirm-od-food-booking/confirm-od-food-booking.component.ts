import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { DialogService } from 'src/app/services/dialog.service';
import { OrderFoodService } from 'src/app/services/order-food.service';

@Component({
  selector: 'app-confirm-od-food-booking',
  templateUrl: './confirm-od-food-booking.component.html',
  styleUrls: ['./confirm-od-food-booking.component.css']
})
export class ConfirmOdFoodBookingComponent implements OnInit {

  objectConfirm:any
  isLoading = false
  accountID:any;
  customerInformation:any;
  responPaymentStatus:any;
  foodOrderInformation:any;
  foodOrderInformationJason:any;
  totalPrice:number=0;
  constructor(private orderFoodService: OrderFoodService, private dialogService: DialogService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadSnipper()
    this.accountID = localStorage.getItem("idUser");
    this.foodOrderInformation = localStorage.getItem("foodInformation");
    if (this.foodOrderInformation != null) {
      this.foodOrderInformationJason = JSON.parse(this.foodOrderInformation)
    }
    this.getCustomerInformationByID();
    this.caculatePrice();
  }
  getCustomerInformationByID() {
    this.orderFoodService.getCustomerInformationByID(this.accountID).subscribe(res => {
      this.customerInformation = res.data;
      localStorage.setItem('customerOrderFood', JSON.stringify(this.customerInformation));
    })
  }
  caculatePrice()
  {
    for(var item of this.foodOrderInformationJason)
    {
      this.totalPrice += (Number(item.price)*Number(item.quantity))
    }
  }
  createLinkPayment() {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.payment.paymentContent,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if(result){
        this.orderFoodService.paymentFoodOrder(this.totalPrice).subscribe(res => {
          this.responPaymentStatus = res.url;
          window.location.href = this.responPaymentStatus;
        })
      }
    })
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }

}
