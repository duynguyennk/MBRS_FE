import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { ManageEmployeeAccountService } from 'src/app/services/manage-employee-account.service';
import { Constant } from 'src/app/constant/constant';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { LoadingComponent } from 'src/app/constant/loading';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Validate } from 'src/app/constant/validation';

@Component({
  selector: 'app-list-all-empl',
  templateUrl: './list-all-empl.component.html',
  styleUrls: ['./list-all-empl.component.css']
})
export class ListAllEmplComponent implements OnInit {
  submitted=false
  isLoading=false
  errMessage!:string
  employees: Employee [] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fullName : any;
  orderHeader : String = '';
  isDescOrder :boolean = true;
  displayAll = "";
  objectConfirm:any
  isEmpty = Validate.contentValidate.isEmpty
  // 
  searchForm = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("",Validators.required)
  })
  // 
  constructor(private employeeService: ManageEmployeeAccountService, 
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService : DialogService ,
    ) { }

  ngOnInit(): void {
    this.loadSnipper()
    this.loadData();
  }
  loadData() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res.data;
    })
  }
  deleteEmployees(employeeID: number, accountID: number) {
    var titleMessage : TitleMessage={
      title: Constant.textNotice.title,
      titleMessageContent: Constant.employeeAccount.deleteEmployee
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result:any)=>{
      if(result){
        this.employeeService.deleteEmployee(employeeID, accountID).subscribe((res) => {
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
        this.employees = []
      }else{
        this.employeeService.getEmployeesWithFilter(this.searchForm.value).subscribe((res)=>{   
          if(res.data === null){
            this.employees = []
          }else{
            this.employees=res.data
            this.page=1;
          } 
        })
      }
    }
 

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
}
