import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
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
  selector: 'app-list-mn-room-floor',
  templateUrl: './list-mn-room-floor.component.html',
  styleUrls: ['./list-mn-room-floor.component.css']
})
export class ListMnRoomFloorComponent implements OnInit {

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
    this.loadDataFloorFloor();
    
  }
  loadDataFloorFloor() {
    this.manageFloorService.getListFloor().subscribe((res) => {
      if (res.code === '200') {
        this.floorList = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
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
          this.loadDataFloorFloor();
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
      if(this.searchFormFloor.value.filterName === 'all'){
        this.loadDataFloorFloor();
      }else if (
        this.searchFormFloor.value.filterName === '' &&
        this.searchFormFloor.value.filterValue === ''
      ) {
        this.loadDataFloorFloor();
      } else if (
        this.searchFormFloor.value.filterName !== null &&
        this.searchFormFloor.value.filterValue === ''
      ) {
        this.loadDataFloorFloor();
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
