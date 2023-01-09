import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { OrderFoodService } from 'src/app/services/order-food.service';

@Component({
  selector: 'app-make-od-food-booking',
  templateUrl: './make-od-food-booking.component.html',
  styleUrls: ['./make-od-food-booking.component.css']
})
export class MakeOdFoodBookingComponent implements OnInit {
  submitted = false
  objectConfirm:any
  isLoading = false
  accountID:any;
  customerInformation:any;
  responPaymentStatus:any;
  roomName:any;
  foodOrderInformation:any;
  foodOrderInformationJason:any;
  totalPrice:number=0;
  isEmpty = Validate.contentValidate.isEmpty
  customerForm = new UntypedFormGroup({
    checkInformation: new UntypedFormControl("",Validators.required),
    customerID:new UntypedFormControl(""),
    fullName: new UntypedFormControl(""),
    identifyNumber: new UntypedFormControl(""),
    dateOfBirth: new UntypedFormControl(""),
    phoneNumber: new UntypedFormControl(""),
    email: new UntypedFormControl(""),
  });
  constructor(private orderFoodService: OrderFoodService, private dialogService: DialogService,private confirmationDialogService: ConfirmationDialogService) { }

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
  onchangeSelect(textInput: any) {
    this.roomName = textInput;
  }
  searchInformation() {
    this.orderFoodService
      .getCustomerInformationByRoomName(this.roomName)
      .subscribe((res) => {
        if (res.data != null) {
          localStorage.setItem('customerOrderFood', JSON.stringify(res.data));
          this.customerForm.controls.customerID.setValue(res.data[0].customerID);
          this.customerForm.controls.fullName.setValue(res.data[0].fullName);
          this.customerForm.controls.identifyNumber.setValue(
            res.data[0].identifyNumber
          );
          this.customerForm.controls.dateOfBirth.setValue(
            res.data[0].dateOfBirthConvertForReceoptionist
          );
          this.customerForm.controls.phoneNumber.setValue(
            res.data[0].phoneNumber
          );
          this.customerForm.controls.email.setValue(res.data[0].email);
        } else {
          this.confirmationDialogService.confirm(
            Constant.receptionist.title,
            Constant.receptionist.confirmFormNull
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
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
  // createLinkPayment() {
  //   var titleMessage: TitleMessage = {
  //     title: Constant.textNotice.title,
  //     titleMessageContent: Constant.payment.paymentContentReceptionist,
  //   };
  //   this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
  //   this.objectConfirm.afterClosed().subscribe((result: any) => {
  //     if(result){
  //       this.orderFoodService.paymentFoodOrder(this.totalPrice).subscribe(res => {
  //         this.responPaymentStatus = res.url;
  //         window.location.href = this.responPaymentStatus;
  //       })
  //     }
  //   })
  // }
  onSubmit(){
    this.submitted = true
    if(this.customerForm.invalid){
      return
    }else{
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.payment.paymentContentReceptionist,
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
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }

}
