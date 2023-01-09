import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageTypeRoomService } from 'src/app/services/manage-type-room.service';

@Component({
  selector: 'app-list-mn-room-types',
  templateUrl: './list-mn-room-types.component.html',
  styleUrls: ['./list-mn-room-types.component.css']
})
export class ListMnRoomTypesComponent implements OnInit {

  objectConfirm: any;
  isLoading = false;
  //
  typeRoomList: any;
  floorList: any;
  errMessage!: string;
  //
  pageFloor: number = 1;
  countFloor: number = 0;
  tableSizeFloor: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  orderHeaderFloor: String = '';
  isDescOrderFloor: boolean = true;
  pageTypeRoom: number = 1;
  countTypeRoom: number = 0;
  tableSizeTypeRoom: number = 5;
  orderHeaderTypeRoom: String = '';
  isDescOrderTypeRoom: boolean = true;
  isEmpty = Validate.contentValidate.isEmpty;
  //
  submitted = false;
  searchFormFloor = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl('', Validators.required),
  });
  searchFormTypeRoom = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl('', Validators.required),
  });
  //
  constructor(
    private manageTypeRoomService: ManageTypeRoomService,
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService: DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
    this.loadDataFloorTypeRoom();
  }

  onSubmitTypeRoom() {
    this.submitted = true;
    if (this.searchFormTypeRoom.invalid) {
      return;
    } else {
      if(this.searchFormTypeRoom.value.filterName === 'all'){
        this.loadDataFloorTypeRoom();
      }else if (
        this.searchFormTypeRoom.value.filterName === '' &&
        this.searchFormTypeRoom.value.filterValue === ''
      ) {
        this.loadDataFloorTypeRoom();
      } else if (
        this.searchFormTypeRoom.value.filterName !== null &&
        this.searchFormTypeRoom.value.filterValue === ''
      ) {
        this.loadDataFloorTypeRoom();
      } else if (
        this.searchFormTypeRoom.value.filterName === 'all' &&
        this.searchFormTypeRoom.value.filterValue !== ''
      ) {
        this.typeRoomList = [];
      } else {
        this.manageTypeRoomService
          .getTypeRoomsWithFilter(this.searchFormTypeRoom.value)
          .subscribe((res) => {
            if (res.data === null) {
              this.typeRoomList = [];
            } else {
              this.typeRoomList = res.data;
              this.pageTypeRoom = 1;
            }
          });
      }
    }
  }

  loadDataFloorTypeRoom() {
    this.manageTypeRoomService.getTypeRooms().subscribe((res) => {
      if (res.code === '200') {
        this.typeRoomList = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
    });
  }
  deleteTypeRoom(typeRoomID: number) {
    var titleMessage : TitleMessage={
      title: Constant.textNotice.title,
      titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmDeteleRooms
    }
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result:any)=>{
      if(result){
        this.manageTypeRoomService.deleteTypeRoom(typeRoomID).subscribe((res) => {
          this.errMessage = res.code;
          this.loadDataFloorTypeRoom();
          if (this.errMessage === '200') {
            this.confirmationDialogService.confirm(
              Constant.ManaRoom_DIALOG_TITLE.title,
              Constant.ManaRoom_DIALOG_TITLE.DeteleRooms
            );
          } else {
            this.confirmationErrDialogService.confirm(
              Constant.ManaRoom_DIALOG_TITLE.title,
              Constant.ManaRoom_DIALOG_TITLE.DeteleFailedRooms
            );
          }
        });
      } 
    })

  }

  sortTypeRoom(headerName: String) {
    this.isDescOrderTypeRoom = !this.isDescOrderTypeRoom;
    this.orderHeaderTypeRoom = headerName;
  }
  onTableDataChangeTypeRoom(event: any) {
    this.pageTypeRoom = event;
  }
  onTableSizeChangeTypeRoom(event: any): void {
    this.tableSizeTypeRoom = event.target.value;
    this.pageTypeRoom = 1;
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }

}
