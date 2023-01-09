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
import { ManageRoomService } from 'src/app/services/manage-room.service';

@Component({
  selector: 'app-list-mana-room-detail',
  templateUrl: './list-mana-room-detail.component.html',
  styleUrls: ['./list-mana-room-detail.component.css']
})
export class ListManaRoomDetailComponent implements OnInit {
  objectConfirm:any
  isLoading=false
  errMessage!:string
  roomInformation : any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fullName : any;
  orderHeader : String = '';
  isDescOrder :boolean = true;
  // errString = false
  submitted = false
  isEmpty = Validate.contentValidate.isEmpty
  // 
  searchForm = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl("",Validators.required)
  })
  // 
  constructor(private roomService : ManageRoomService, 
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService : DialogService ,
    ) { }

  ngOnInit(): void {
    this.loadSnipper()
    this.loadData();
  }
  loadData()
  {
    this.roomService.getRooms().subscribe((res) => {
      if (res.code === '200') {
        this.roomInformation = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
    })
  }
  deleteRoom(roomID : number)
  {
    var titleMessage : TitleMessage={
      title: Constant.textNotice.title,
      titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmDeteleRooms
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result:any)=>{
      if(result){
        this.roomService.deleteRoom(roomID).subscribe((res) => {
          this.errMessage = res.code
          this.roomInformation = res.data;
          this.loadData();
          if(this.errMessage ==='200'){
            this.confirmationDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.DeteleRooms)
          }else{
            this.confirmationErrDialogService.confirm(Constant.ManaRoom_DIALOG_TITLE.title, Constant.ManaRoom_DIALOG_TITLE.DeteleFailedRooms)
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
        this.loadData()
      }
      else if(this.searchForm.value.filterName === '' && this.searchForm.value.filterValue === ''){
        this.loadData()
      }else if(this.searchForm.value.filterName !== null && this.searchForm.value.filterValue === ''){
        this.loadData() 
      }else if(this.searchForm.value.filterName === 'all' && this.searchForm.value.filterValue !== ''){
        this.roomInformation = []
      }else{
        this.roomService.getRoomsWithFilter(this.searchForm.value).subscribe((res)=>{       
            if(res.data === null){
              this.roomInformation = []
            }else{
              this.roomInformation=res.data
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
  loadSnipper(){
    this.isLoading = true;
    setTimeout(()=>(this.isLoading=false),LoadingComponent.timeLoad)
  }
}
