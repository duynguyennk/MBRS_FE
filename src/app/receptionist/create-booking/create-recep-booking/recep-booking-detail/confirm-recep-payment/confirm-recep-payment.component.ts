import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { ActivityEmployee } from 'src/app/model/activityEmployee';
import { OrderRoomUnpaymentInformation } from 'src/app/model/orderRoomUnpaymentInformation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageActivityEmployeeService } from 'src/app/services/manage-activity-employee.service';
import { OrderRoomService } from 'src/app/services/order-room.service';

@Component({
  selector: 'app-confirm-recep-payment',
  templateUrl: './confirm-recep-payment.component.html',
  styleUrls: ['./confirm-recep-payment.component.css']
})
export class ConfirmRecepPaymentComponent implements OnInit {
  isLoading = false
  searchInformationString: any
  errMessage!: string
  searchInformationJason: any
  customerInformationString: any
  customerInformationJason: any
  totalPrice: any;
  activityEmployee:any;
  days: any;
  accountID:any;
  objectConfirm: any
  responPaymentStatus: any;
  UnpaymentInformationOrder: any;
  constructor(private orderRoomService: OrderRoomService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService,
    private manageActivityEmployeeService:ManageActivityEmployeeService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.accountID = localStorage.getItem("idUser");
    this.loadSnipper()
    this.searchInformationString = localStorage.getItem("searchInformation");
    if (this.searchInformationString != null) {
      this.searchInformationJason = JSON.parse(this.searchInformationString)
    }
    this.customerInformationString = localStorage.getItem("customerInformation");
    if (this.customerInformationString != null) {
      this.customerInformationJason = JSON.parse(this.customerInformationString)
    }
    this.caculateDate();
  }
  caculateDate() {
    let dateCheckOut = new Date(this.searchInformationJason.checkOutDate);
    let dateCheckIn = new Date(this.searchInformationJason.checkInDate);
    this.days = Math.floor((dateCheckOut.getTime() - dateCheckIn.getTime()) / 1000 / 60 / 60 / 24);
    this.totalPrice = this.days * Number(this.searchInformationJason.price) * Number(this.searchInformationJason.numberOfRoom)
  }

  
  createOrderPaymentCash()
  {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.payment.postpaid,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) =>{
      if(result){
        if(this.customerInformationJason.customerID == null)
        {
        this.UnpaymentInformationOrder = new OrderRoomUnpaymentInformation(this.searchInformationJason.typeRoomID,this.searchInformationJason.typeRoomName,this.searchInformationJason.checkInDate,this.searchInformationJason.checkOutDate,this.totalPrice,this.searchInformationJason.numberOfRoom,this.days, this.customerInformationJason.fullName,this.customerInformationJason.phoneNumber,this.customerInformationJason.email,this.customerInformationJason.dateOfBirth,this.customerInformationJason.identifyNumber)
        this.orderRoomService.createOrderRoomCash(this.UnpaymentInformationOrder).subscribe((res) => {
          this.errMessage = res.code
          if(this.errMessage === '200'){
            this.activityEmployee = new ActivityEmployee(0,"Đã tạo đơn đặt phòng và nhận đủ tiền mặt của khách hàng tên "+this.customerInformationJason.fullName,this.accountID,"");
            this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

            })
            this.confirmationDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderSuccess)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderFail)
          }
          setTimeout(() => {
            this.router
              .navigate(['homepage'])
              .then(() => {
                window.location.reload();
              });
          }, 1500);
          localStorage.removeItem('searchInformation');
          localStorage.removeItem('customerInformation');
        })

      }
      else
      {
        this.UnpaymentInformationOrder = new OrderRoomUnpaymentInformation(this.searchInformationJason.typeRoomID,this.searchInformationJason.typeRoomName,this.searchInformationJason.checkInDate,this.searchInformationJason.checkOutDate,this.totalPrice,this.searchInformationJason.numberOfRoom,this.days, "","","",new Date(),"",this.customerInformationJason.customerID)
        this.orderRoomService.createOrderRoomUnpaymentForCustomer(this.UnpaymentInformationOrder).subscribe((res) => {
          this.errMessage = res.code
          if(this.errMessage === '200'){
            this.activityEmployee = new ActivityEmployee(0,"Đã tạo đơn đặt phòng và nhận đủ tiền mặt của khách hàng tên "+this.customerInformationJason.fullName,this.accountID,"");
            this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

            })
            this.confirmationDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderSuccess)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ORDER_DIALOG_TITLE.title, Constant.ORDER_DIALOG_TITLE.OrderFail)
          }
          setTimeout(() => {
            this.router
              .navigate(['homepage'])
              .then(() => {
                window.location.reload();
              });
          }, 1500);
          localStorage.removeItem('searchInformation');
          localStorage.removeItem('customerInformation');
        })
      }
      }
    })
  }

  createOrder() {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.payment.paymentContentReceptionist,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if (result) {
        this.orderRoomService.paymentRoom(this.totalPrice, this.searchInformationJason.typeRoomName, this.searchInformationJason.numberOfRoom, this.days).subscribe((res) => {
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
