import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ActivityEmployee } from 'src/app/model/activityEmployee';
import { filter } from 'src/app/model/filter';
import { StatusBike } from 'src/app/model/statusBike';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageActivityEmployeeService } from 'src/app/services/manage-activity-employee.service';
import { ManageOrderBikeService } from 'src/app/services/manage-order-bike.service';

@Component({
  selector: 'app-list-bicycle-booking',
  templateUrl: './list-bicycle-booking.component.html',
  styleUrls: ['./list-bicycle-booking.component.css'],
})
export class ListBicycleBookingComponent implements OnInit {
  isLoading = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  orderHeader: String = '';
  isDescOrder: boolean = true;
  orderBikeList: any;
  statusBike: any;
  objectConfirm: any;
  codeStatusAPI: any;
  submitted = false
  activityEmployee: any;
  accountID: any;
  isEmpty = Validate.contentValidate.isEmpty
  // 
  searchForm = new UntypedFormGroup({
    // "",Validators.pattern(Validate.dateFormat)
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("", [Validators.required])!,
  })
  //
  constructor(
    private manageOrderBikeService: ManageOrderBikeService,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService,
    private manageActivityEmployeeService: ManageActivityEmployeeService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadSnipper();
    this.getOrderBike();
    this.accountID = localStorage.getItem("idUser");
  }
  deleteOrderBike(orderBikeID: number) {
    this.manageOrderBikeService
      .deleteOrderBike(orderBikeID)
      .subscribe((res) => {
        this.getOrderBike();
        this.confirmationDialogService.confirm(
          Constant.ManaCRUD_DIALOG_TITLE.title,
          Constant.ManaCRUD_DIALOG_TITLE.DeteleEvents
        );
      });
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  // returnBike(){
  //   var titleMessage: TitleMessage = {
  //     title: Constant.textNotice.title,
  //     titleMessageContent: Constant.receptionist.confirmBicycle
  //   };
  //   this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
  //   this.objectConfirm.afterClosed().subscribe((result: any) =>{
  //     if(result){
  //       this.confirmationDialogService.confirm(Constant.receptionist.title,Constant.receptionist.bicycleSuccess)
  //     }
  //   })
  // }
  // receviedBike(){
  //   var titleMessage: TitleMessage = {
  //     title: Constant.textNotice.title,
  //     titleMessageContent: Constant.receptionist.confirmRcBicycle
  //   };
  //   this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
  //   this.objectConfirm.afterClosed().subscribe((result: any) =>{
  //     if(result){
  //       this.confirmationDialogService.confirm(Constant.receptionist.title,Constant.receptionist.bicycleRcSuccess)
  //     }
  //   })
  // }
  getOrderBike() {
    this.manageOrderBikeService.getOrderBikes().subscribe((res) => {
      if (res.code === '200') {
        this.orderBikeList = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
    });
  }
  // onSearchChange(filter: filter) {
  //   if (filter.filterValue == '' || filter.filterValue == '') {
  //     this.orderBikeList = [];
  //   } else {
  //     this.manageOrderBikeService
  //       .getOrderBikesWithFilter(filter)
  //       .subscribe((res) => {
  //         this.orderBikeList = res.data;
  //         this.page = 1;
  //       });
  //   }
  // }
  onSubmit() {
    this.submitted = true
    if (this.searchForm.invalid) {
      return
    } else {
      if (this.searchForm.value.filterName === 'all') {
        this.getOrderBike()
      } else if (this.searchForm.value.filterName === '' && this.searchForm.value.filterValue === '') {
        this.getOrderBike()
      } else if (this.searchForm.value.filterName !== null && this.searchForm.value.filterValue === '') {
        this.getOrderBike()
      } else if (this.searchForm.value.filterName === 'all' && this.searchForm.value.filterValue !== '') {
        this.orderBikeList = []
      } else {
        this.manageOrderBikeService.getOrderBikesWithFilter(this.searchForm.value).subscribe((res) => {
          if (res.data === null) {
            this.orderBikeList = []
          } else {
            this.orderBikeList = res.data
            this.page = 1;
          }
        }
        )
      }
    }
  }

  changeStatus(status: number, orderID: number, orderCode: String, fullName: string) {
    this.statusBike = new StatusBike(orderID, status);
    if (status == 1) {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.receptionist.confirmRcBicycle,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageOrderBikeService
            .updateStatusBike(this.statusBike)
            .subscribe((res) => {
              this.getOrderBike();
              this.codeStatusAPI = res.code;
              if (this.codeStatusAPI === '200') {
                this.activityEmployee = new ActivityEmployee(0, "Đã xác nhận khách hàng "+fullName+" đã nhận xe đạp của hóa đơn "+orderCode, this.accountID, "");
                this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res) => {

                })
                this.confirmationDialogService.confirm(
                  Constant.receptionist.title,
                  Constant.receptionist.bicycleRcSuccess
                );
              } else {
                this.confirmationErrDialogService.confirm(
                  Constant.receptionist.title,
                  Constant.receptionist.bicycleRcFailed
                );
              }
            });
        }
      });
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.receptionist.confirmBicycle,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.manageOrderBikeService
            .updateStatusBike(this.statusBike)
            .subscribe((res) => {
              this.getOrderBike();
              this.codeStatusAPI = res.code;
              if (this.codeStatusAPI === '200') {
                this.activityEmployee = new ActivityEmployee(0, "Đã xác nhận khách hàng "+fullName+" đã trả xe đạp của hóa đơn "+orderCode, this.accountID, "");
                this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res) => {

                })
                this.confirmationDialogService.confirm(
                  Constant.receptionist.title,
                  Constant.receptionist.bicycleSuccess
                );
              } else {
                this.confirmationErrDialogService.confirm(
                  Constant.receptionist.title,
                  Constant.receptionist.bicycleFailed
                );
              }
            });
        }
      });
    }

  }



  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
