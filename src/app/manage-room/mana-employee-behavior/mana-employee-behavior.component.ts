import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { ManageActivityEmployeeService } from 'src/app/services/manage-activity-employee.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mana-employee-behavior',
  templateUrl: './mana-employee-behavior.component.html',
  styleUrls: ['./mana-employee-behavior.component.css']
})
export class ManaEmployeeBehaviorComponent implements OnInit {
  submitted=false
  isEmpty = Validate.contentValidate.isEmpty
  private apiUrl = environment.apiUrl;
  orderHeader : String = '';
  isDescOrder :boolean = true;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  isLoading = false
  page: number = 1;
  count: number = 0;
  today:any
  activityEmployeeList:any;
  searchForm = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("",Validators.required)
  })
  constructor(private manageActivityEmployeeService:ManageActivityEmployeeService,private http: HttpClient,public signalrService : SignalrService , private confirmationErrDialogService : ConfirmationErrDialogService) { }

  ngOnInit(): void {
    this.signalrService.startConnection();
    this.signalrService.addTransferActivityEmployeeDataListener();
    this.startHttpRequest();
    this.loadData();
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
      }
      else{
        this.manageActivityEmployeeService.getActivityEmployeeWithFilter(this.searchForm.value).subscribe((res)=>{       
          this.signalrService.AcivityEmployeeData=res.data
              this.page=1;
        }
        )
      }
    } 
  }

  private startHttpRequest = () => {
    this.http.get(this.apiUrl+'/v1/api/notification/SendActivityEmployee')
      .subscribe(res => {
        console.log(res);
      })
  }

  loadData()
  {
    this.manageActivityEmployeeService.getActivityEmployee().subscribe((res) => {
      if(res.code === '200'){
        this.signalrService.AcivityEmployeeData  = res.data;
      }else{
        this.confirmationErrDialogService.confirm(Constant.loadData.title, Constant.loadData.errData)
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
    loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
