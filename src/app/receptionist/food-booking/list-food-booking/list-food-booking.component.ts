import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ActivityEmployee } from 'src/app/model/activityEmployee';
import { StatusFood } from 'src/app/model/statusFood';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageActivityEmployeeService } from 'src/app/services/manage-activity-employee.service';
import { ManageOrderFoodService } from 'src/app/services/manage-order-food.service';

@Component({
  selector: 'app-list-food-booking',
  templateUrl: './list-food-booking.component.html',
  styleUrls: ['./list-food-booking.component.css']
})
export class ListFoodBookingComponent implements OnInit {
  isLoading = false
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  orderHeader: String = '';
  isDescOrder: boolean = true;
  orderFoodList: any;
  statusFood: any;
  objectConfirm: any
  submitted = false
  activityEmployee:any;
  accountID:any;
  isEmpty = Validate.contentValidate.isEmpty
  // 
  searchForm = new UntypedFormGroup({
    // "",Validators.pattern(Validate.dateFormat)
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("", [Validators.required])!,
  })
  // 
  constructor(private manageOrderFoodService: ManageOrderFoodService,private manageActivityEmployeeService : ManageActivityEmployeeService, private dialogService: DialogService, private confirmationDialogService: ConfirmationDialogService, private confirmationErrDialogService: ConfirmationErrDialogService ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadSnipper();
    this.getOrderFood();
    this.accountID = localStorage.getItem("idUser");
  }
  changeStatus(status: number, orderID: number,orderCode:string,fullName:string) {
    this.statusFood = new StatusFood(orderID, status);
    if(status == 2){
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.receptionist.deliveryFoodStatus,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) =>{
        if(result){
          this.manageOrderFoodService.updateStatusFood(this.statusFood).subscribe(res => {
              this.getOrderFood();
              if(res.code === '200'){
                this.activityEmployee = new ActivityEmployee(0,"Đã xác nhận đang chuẩn bị đồ ăn cho đơn hàng có mã "+orderCode+" cho khách hàng "+fullName,this.accountID,"");
                this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{
      
                })
              this.confirmationDialogService.confirm(Constant.receptionist.title,Constant.receptionist.confirmDeliveryFoodSt)
              }else{
              this.confirmationErrDialogService.confirm(Constant.receptionist.title,Constant.receptionist.confirmDeliveryFoodStF)
              }
            });
        }
      })
    }else{
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.receptionist.prepareFoodSt,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) =>{
        if(result){
          this.manageOrderFoodService.updateStatusFood(this.statusFood).subscribe(res => {
              this.getOrderFood();
              if(res.code === '200'){
                this.activityEmployee = new ActivityEmployee(0,"Đã xác nhận đã giao đồ ăn cho đơn hàng có mã "+orderCode+" cho khách hàng "+fullName,this.accountID,"");
                this.manageActivityEmployeeService.createActivityEmployee(this.activityEmployee).subscribe((res)=>{
      
                })
              this.confirmationDialogService.confirm(Constant.receptionist.title,Constant.receptionist.cfPrepareFoodSt)
              }else{
              this.confirmationErrDialogService.confirm(Constant.receptionist.title,Constant.receptionist.cfPrepareFoodStF)
              }
            });
        }
      })
    }

  }
  goToLink(url: string){
    window.open(url, "_blank");
}
  getOrderFood() {
    this.manageOrderFoodService.getOrderFoods().subscribe(res => {
      if (res.code === '200') {
        this.orderFoodList = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
    })
  }
  onSubmit(){
    this.submitted = true
    if (this.searchForm.invalid) {
      return
    } else {
      if(this.searchForm.value.filterName === 'all'){
        this.getOrderFood()
      }else if (this.searchForm.value.filterName === '' && this.searchForm.value.filterValue === '') {
        this.getOrderFood()
      } else if (this.searchForm.value.filterName !== null && this.searchForm.value.filterValue === '') {
        this.getOrderFood()
      } else if (this.searchForm.value.filterName === 'all' && this.searchForm.value.filterValue !== '') {
        this.orderFoodList = []
      } else {
        this.manageOrderFoodService.getOrderFoodsWithFilter(this.searchForm.value).subscribe((res) => {
          if (res.data === null) {
            this.orderFoodList = []
          } else {
            this.orderFoodList = res.data
            this.page = 1;
            console.log(this.orderFoodList)
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
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
