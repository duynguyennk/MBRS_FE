import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageFloorService } from 'src/app/services/manage-floor.service';
import { ManageTypeRoomService } from 'src/app/services/manage-type-room.service';

@Component({
  selector: 'app-list-room-types-floor',
  templateUrl: './list-room-types-floor.component.html',
  styleUrls: ['./list-room-types-floor.component.css'],
})
export class ListRoomTypesFloorComponent implements OnInit {
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
    private manageFloorService: ManageFloorService,
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService: DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
    this.loadDataFloor();
    this.loadDataFloorTypeRoom();
  }
  loadDataFloor() {
    this.manageFloorService.getListFloor().subscribe((res) => {
      this.floorList = res.data;
    });
  }
  deleteFloor(floorID: number) {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmDeteleFloor,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if (result) {
        this.manageFloorService.deleteFloor(floorID).subscribe((res) => {
          this.errMessage = res.code;
          this.loadDataFloor();
          if (this.errMessage === '200') {
            this.confirmationDialogService.confirm(
              Constant.ManaRoom_DIALOG_TITLE.title,
              Constant.ManaRoom_DIALOG_TITLE.DeteleFloor
            );
          } else {
            this.confirmationErrDialogService.confirm(
              Constant.ManaRoom_DIALOG_TITLE.title,
              Constant.ManaRoom_DIALOG_TITLE.DeteleFailedFloor
            );
          }
        });
      }
    });
  }

  onSubmitFloor() {
    this.submitted = true;
    if (this.searchFormFloor.invalid) {
      return;
    } else {
      if (
        this.searchFormFloor.value.filterName === '' &&
        this.searchFormFloor.value.filterValue === ''
      ) {
        this.loadDataFloor();
      } else if (
        this.searchFormFloor.value.filterName !== null &&
        this.searchFormFloor.value.filterValue === ''
      ) {
        this.loadDataFloor();
      } else if (
        this.searchFormFloor.value.filterName === 'all' &&
        this.searchFormFloor.value.filterValue !== ''
      ) {
        this.floorList = [];
      } else {
        this.manageFloorService
          .getFloorWithFilter(this.searchFormFloor.value)
          .subscribe((res) => {
            if (res.data === null) {
              this.floorList = [];
            } else {
              this.floorList = res.data;
              this.pageFloor = 1;
            }
          });
      }
    }
  }
  onSubmitTypeRoom() {
    this.submitted = true;
    if (this.searchFormTypeRoom.invalid) {
      return;
    } else {
      if (
        this.searchFormTypeRoom.value.filterName === '' &&
        this.searchFormTypeRoom.value.filterValue === ''
      ) {
        this.loadDataFloor();
      } else if (
        this.searchFormTypeRoom.value.filterName !== null &&
        this.searchFormTypeRoom.value.filterValue === ''
      ) {
        this.loadDataFloor();
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
  sortFloor(headerName: String) {
    this.isDescOrderFloor = !this.isDescOrderFloor;
    this.orderHeaderFloor = headerName;
  }
  onTableDataChangeFloor(event: any) {
    this.pageFloor = event;
  }
  onTableSizeChangeFloor(event: any): void {
    this.tableSizeFloor = event.target.value;
    this.pageFloor = 1;
  }
  loadDataFloorTypeRoom() {
    this.manageTypeRoomService.getTypeRooms().subscribe((res) => {
      this.typeRoomList = res.data;
      console.log(res.data);
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
  // onSearchChangeTypeRoom(filter: filter) {
  //   console.log(filter.filterName)
  //   if (filter.filterValue == "" || filter.filterValue == "") {
  //     this.typeRoomList = [];
  //   }
  //   else {
  //     this.manageTypeRoomService.getTypeRoomsWithFilter(filter).subscribe((res) => {
  //       if (res.data == null) {
  //         this.typeRoomList = [];
  //       }
  //       else {
  //         this.typeRoomList = res.data;
  //         this.pageTypeRoom = 1;
  //       }
  //     })
  //   }
  // }
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
