import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Customer } from 'src/app/model/customer';
import { filter } from 'src/app/model/filter';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageCustomerAccountService } from 'src/app/services/manage-customer-account.service';

@Component({
  selector: 'app-list-all-customer',
  templateUrl: './list-all-customer.component.html',
  styleUrls: ['./list-all-customer.component.css']
})
export class ListAllCustomerComponent implements OnInit {
  objectConfirm:any
  isLoading = false
  errMessage!:string
  page: number = 1;
  tableSizes: any = [5, 10, 15, 20];
  tableSize: number = 5;
  count: number = 0;
  orderHeader : String = '';
  isDescOrder :boolean = true;
  submitted = false
  customers: Customer [] = []
  isEmpty = Validate.contentValidate.isEmpty
  // 
  searchForm = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("",Validators.required)
  })
  // 
  constructor(private customerAccountService : ManageCustomerAccountService, 
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService : DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    ) { }

  ngOnInit(): void {
    this.loadSnipper();
    this.loadData();
  }
  loadData() {
    this.customerAccountService.getCustomerService().subscribe(res => {
      console.log(res);
      this.customers = res.data;
    })
  }
  deleteCustomer(customerID: number, accountID: number) {
    var titleMessage : TitleMessage={
      title: Constant.textNotice.title,
      titleMessageContent: Constant.ManaCRUD_DIALOG_TITLE.confirmDeteleEvents
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result:any)=>{
      if(result){
        this.customerAccountService.deleteCustomerService(customerID, accountID).subscribe((res) => {
          this.errMessage = res.code
          this.loadData();
          if(this.errMessage === '200'){
            this.confirmationDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.ManaCRUD_DIALOG_TITLE.DeteleEvents)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.ManaCRUD_DIALOG_TITLE.DeteleEventsFailed)
          }
        })
      }
    })
  }
  sort(headerName:String)
  {
    this.isDescOrder = !this.isDescOrder
    this.orderHeader= headerName;
  }
  onTableDataChange(event: any) {
    this.page = event
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value
    this.page = 1;
  }
  loadSnipper(){
    this.isLoading = true
    setTimeout(()=>(this.isLoading=false),LoadingComponent.timeLoad)
  }
  
  onSubmit(){
    this.submitted = true
    if(this.searchForm.invalid){
      return
    }else{
      if(this.searchForm.value.filterName === 'all'){
        this.loadData();
      }else if(this.searchForm.value.filterName === '' && this.searchForm.value.filterValue === ''){
        this.loadData()
      }else if(this.searchForm.value.filterName !== null && this.searchForm.value.filterValue === ''){
        this.loadData() 
      }else if(this.searchForm.value.filterName === 'all' && this.searchForm.value.filterValue !== ''){
        this.customers = []
      }
      else{
        this.customerAccountService.getCustomersWithFilter(this.searchForm.value).subscribe((res)=>{       
            if(res.data === null){
              this.customers = []
            }else{
              this.customers=res.data
              this.page=1;
            } 
        }
        )
      }
    }   
  }
}
