import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ActivityEmployee } from 'src/app/model/activityEmployee';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageActivityEmployeeService } from 'src/app/services/manage-activity-employee.service';
import { ManageOrderRoomService } from 'src/app/services/manage-order-room.service';

@Component({
  selector: 'app-list-mana-room-receptionist',
  templateUrl: './list-mana-room-receptionist.component.html',
  styleUrls: ['./list-mana-room-receptionist.component.css']
})
export class ListManaRoomReceptionistComponent implements OnInit {
  submitted = false
  isLoading = false
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [20, 40, 60, 80, 100];
  orderHeader: String = '';
  isDescOrder: boolean = true;
  orderRoomList: any;
  messageData: any;
  objectConfirm: any;
  objectConfirmJason: any;
  isEmpty = Validate.contentValidate.isEmpty
  matchDateFormat = Validate.contentValidate.matchDateFormat
  codeStatusAPI: any;
  activityEmployee:any;
  accountID:any;
  searchForm = new UntypedFormGroup({
    // "",Validators.pattern(Validate.dateFormat)
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("", [Validators.required]),
  })
  // 
  constructor(private manageOrderRoomService: ManageOrderRoomService,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService,
    private manageActivityEmployeeService:ManageActivityEmployeeService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadSnipper()
    this.getOrderRoom();
    this.accountID = localStorage.getItem("idUser");
  }

  deleteOrderRoom(orderRoomID: number,orderCode:string,fullName : string) {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.receptionist.confirmCancelOrder
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((res: any) => {
      if (res) {
        this.manageOrderRoomService.deleteOrderRoom(orderRoomID).subscribe((res) => {
          this.getOrderRoom();
          this.codeStatusAPI = res.code;
          if (this.codeStatusAPI === '200') {
            this.activityEmployee = new ActivityEmployee(0,"Đã hủy đơn đặt có mã đơn hàng "+orderCode+" của khách hàng tên "+fullName ,this.accountID,"");
            this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

            })
            this.confirmationDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.cancelOrderSuccess)
          } else {
            this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.cancelOrderFailed)
          }
        })
      }
    });
  }

  completedBackPayment(orderID: number,orderCode:string,fullName : string) {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.receptionist.confirmCompletedBackPayment
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((res: any) => {
      if (res) {
        this.manageOrderRoomService.completedBackPayment(orderID).subscribe((res) => {
          this.getOrderRoom();
          this.codeStatusAPI = res.code;
          if (this.codeStatusAPI === '200') {
            this.activityEmployee = new ActivityEmployee(0,"Đã xác nhận việc hoàn trả tiền có mã đơn hàng "+orderCode +" cho khách hàng tên "+fullName,this.accountID,"");
            this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

            })
            this.confirmationDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.paymentCompletedBackPaymentSuccess)
          } else {
            this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.paymentCompletedBackPaymentFailed)
          }
        })
      }
    });
  }

  getOrderRoom() {
    this.manageOrderRoomService.getOrderRooms().subscribe(res => {
      if (res.code === '200') {
        this.orderRoomList = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
    })
  }
  onSubmit() {
    this.submitted = true
    if (this.searchForm.invalid) {
      return
    } else {
      if(this.searchForm.value.filterName === 'all'){
        this.getOrderRoom()
      }else if (this.searchForm.value.filterName === '' && this.searchForm.value.filterValue === '') {
        this.getOrderRoom()
      } else if (this.searchForm.value.filterName !== null && this.searchForm.value.filterValue === '') {
        this.getOrderRoom()
      } else if (this.searchForm.value.filterName === 'all' && this.searchForm.value.filterValue !== '') {
        this.orderRoomList = []
      } else {
        this.manageOrderRoomService.getOrderRoomsWithFilter(this.searchForm.value).subscribe((res) => {
          if (res.data === null) {
            this.orderRoomList = []
          } else {
            this.orderRoomList = res.data
            this.page = 1;
          }
        }
        )
      }
    }
  }
  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder
    this.orderHeader = headerName;
  }
  onTableDataChange(event: any) {
    this.page = event
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value
    this.page = 1;
  }
  paymentCompleted(orderID: number,orderCode:string,fullName : string) {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.receptionist.confirmPaymentDeposit
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((res: any) => {
      if (res) {
        this.manageOrderRoomService.updateStatusPayment(orderID).subscribe(res => {
          this.codeStatusAPI = res.code;
          this.getOrderRoom();
          if (this.codeStatusAPI === '200') {
            this.activityEmployee = new ActivityEmployee(0,"Đã xác nhận nhận đủ tiền mặt cho hóa đơn có mã "+ orderCode +" của khách hàng tên "+fullName,this.accountID,"");
            this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{

            })
            this.confirmationDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.paymentCompletedConfirmSuccess)
          } else {
            this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.payment.paymentCompletedConfirmFailed)
          }
        })
      }
    });
  }
  goToLink(url: string) {
    window.open(url, "_blank");
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
