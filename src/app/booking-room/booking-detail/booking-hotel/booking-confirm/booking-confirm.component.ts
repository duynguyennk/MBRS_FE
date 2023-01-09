import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { OrderRoomUnpaymentInformation } from 'src/app/model/orderRoomUnpaymentInformation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { OrderRoomService } from 'src/app/services/order-room.service';
// import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent implements OnInit {
  isLoading = false
  searchInformationString: any
  errMessage!:string
  searchInformationJason: any
  customerInformationString: any
  customerInformationJason: any
  totalPrice: any;
  days: any;
  objectConfirm:any
  responPaymentStatus: any;
  accountID: any;
  UnpaymentInformationOrder: any;
  constructor(private orderRoomService : OrderRoomService,
    private router: Router ,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadSnipper()
    window.scrollTo(0, 0);
    this.accountID = localStorage.getItem("idUser");
    this.searchInformationString = localStorage.getItem("searchInformation");
    if (this.searchInformationString != null) {
      this.searchInformationJason = JSON.parse(this.searchInformationString)
    }
    this.customerInformationString = localStorage.getItem("customerInformation");
    if (this.customerInformationString != null) {
      this.customerInformationJason = JSON.parse(this.customerInformationString)
      console.log(this.customerInformationJason);
    }
    this.caculateDate();
  }
  caculateDate() {
    let dateCheckOut = new Date(this.searchInformationJason.checkOutDate);
    let dateCheckIn = new Date(this.searchInformationJason.checkInDate);
    this.days = Math.floor((dateCheckOut.getTime() - dateCheckIn.getTime()) / 1000 / 60 / 60 / 24);
    this.totalPrice = this.days * Number(this.searchInformationJason.price) * Number(this.searchInformationJason.numberOfRoom)
  }
  createOrder()
  {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.payment.paymentFull,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) =>{
      if(result){
        this.orderRoomService.paymentRoom(this.totalPrice,this.searchInformationJason.typeRoomName,this.searchInformationJason.numberOfRoom,this.days).subscribe((res) => {
          this.responPaymentStatus=res.url;
          window.location.href=this.responPaymentStatus;
        })
      }
    })
  }

  createOrderPaymentDeposit()
  {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.payment.paymentDeposit,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) =>{
      if(result){
        this.orderRoomService.roomPaymentDeposit(this.totalPrice,this.searchInformationJason.typeRoomName,this.searchInformationJason.numberOfRoom,this.days).subscribe((res) => {
          this.responPaymentStatus=res.url;
          window.location.href=this.responPaymentStatus;
        })
      }
    })
  }

  createOrderUnpayment()
  {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.payment.postpaid,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) =>{
      if(result){
        if(this.accountID == null)
        {
        this.UnpaymentInformationOrder = new OrderRoomUnpaymentInformation(this.searchInformationJason.typeRoomID,this.searchInformationJason.typeRoomName,this.searchInformationJason.checkInDate,this.searchInformationJason.checkOutDate,this.totalPrice,this.searchInformationJason.numberOfRoom,this.days, this.customerInformationJason.fullName,this.customerInformationJason.phoneNumber,this.customerInformationJason.email,this.customerInformationJason.dateOfBirth,this.customerInformationJason.identifyNumber)
        this.orderRoomService.createOrderRoomUnpayment(this.UnpaymentInformationOrder).subscribe((res) => {
          this.errMessage = res.code
          if(this.errMessage === '200'){
            this.confirmationDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderSuccess)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderFail)
          }
          this.router.navigate(['homepage']);
          localStorage.removeItem('searchInformation');
          localStorage.removeItem('customerInformation');
        })
      }
      else
      {
        this.UnpaymentInformationOrder = new OrderRoomUnpaymentInformation(this.searchInformationJason.typeRoomID,this.searchInformationJason.typeRoomName,this.searchInformationJason.checkInDate,this.searchInformationJason.checkOutDate,this.totalPrice,this.searchInformationJason.numberOfRoom,this.days, "","","",new Date(),"",this.customerInformationJason[0].customerID)
        this.orderRoomService.createOrderRoomUnpaymentForCustomer(this.UnpaymentInformationOrder).subscribe((res) => {
          this.errMessage = res.code
          if(this.errMessage === '200'){
            this.confirmationDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderSuccess)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderFail)
          }
          this.router.navigate(['homepage']);
          localStorage.removeItem('searchInformation');
          localStorage.removeItem('customerInformation');
        })
      }
      }
    })
  }
  
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
