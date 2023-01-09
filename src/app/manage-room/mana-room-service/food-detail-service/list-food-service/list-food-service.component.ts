import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { filter } from 'src/app/model/filter';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageFoodService } from 'src/app/services/manage-food.service';

@Component({
  selector: 'app-list-food-service',
  templateUrl: './list-food-service.component.html',
  styleUrls: ['./list-food-service.component.css']
})
export class ListFoodServiceComponent implements OnInit {
  objectConfirm:any
  isLoading = false
  foodInformation : any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fullName : any;
  orderHeader : String = '';
  isDescOrder :boolean = true;
  errMessage!:string;
  submitted = false
  isEmpty = Validate.contentValidate.isEmpty
  // 
  searchForm = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("",Validators.required)
  })
  // 
  constructor(private foodService : ManageFoodService, 
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService : DialogService ,
    private confirmationErrDialogService: ConfirmationErrDialogService) { }

  ngOnInit(): void {
    this.loadSnipper();
    this.loadData();
  }

  loadData()
  {
    this.foodService.getFoods().subscribe((res) => {
      if(res.code === '200'){
        this.foodInformation = res.data;
      }else{
        this.confirmationErrDialogService.confirm(Constant.loadData.title, Constant.loadData.errData)
      }
    })
  }

  deleteFood(foodID : number)
  {
    var titleMessage : TitleMessage={
      title: Constant.textNotice.title,
      titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmDeleteFood
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result:any)=>{
      if(result){
        this.foodService.deleteFood(foodID).subscribe((res) => {
          this.errMessage = res.code
          this.foodInformation = res.data;
          this.loadData();
          console.log(res.data.code)
          if(this.errMessage === '200'){
            this.confirmationDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.DeleteFood)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.DeleteFoodFailed)
          }
        })
      }
    })

  }
  // onSearchChange(filter : filter)
  // {
  //   if(filter.filterValue == "" || filter.filterValue == "")
  //   {
  //     this.foodInformation=[];
  //   }
  //   else
  //   {
  //     this.foodService.getFoodWithFilter(filter).subscribe((res) =>{
  //       this.foodInformation = res.data;
  //       this.page=1;
  //     })
  //   }
  // }
  
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
        this.foodInformation = []
      }
      else{
        this.foodService.getFoodWithFilter(this.searchForm.value).subscribe((res)=>{       
            if(res.data === null){
              this.foodInformation = []
            }else{
              this.foodInformation=res.data
              this.page=1;
            } 
        }
        )
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
    loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
