import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { filter } from 'src/app/model/filter';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageTypeBikeService } from 'src/app/services/manage-type-bike.service';

@Component({
  selector: 'app-list-rent-bicycle-type',
  templateUrl: './list-rent-bicycle-type.component.html',
  styleUrls: ['./list-rent-bicycle-type.component.css'],
})
export class ListRentBicycleTypeComponent implements OnInit {
  objectConfirm: any;
  errMessage!: string;
  isLoading = false;
  typeBikeList: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fullName: any;
  orderHeader: String = '';
  isDescOrder: boolean = true;
  isEmpty = Validate.contentValidate.isEmpty;
  //
  searchForm = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl('', Validators.required),
  });
  submitted = false;
  //
  constructor(
    private manageTypeBikeService: ManageTypeBikeService,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
    this.loadData();
  }
  loadData() {
    this.manageTypeBikeService.getTypeBike().subscribe((res) => {
      if (res.code === '200') {
        this.typeBikeList = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
    });
  }
  deleteTypeBike(typeBikeID: number) {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmDeleteVehicle,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if (result) {
        this.manageTypeBikeService
          .deleteTypeBike(typeBikeID)
          .subscribe((res) => {
            this.loadData();
            this.errMessage = res.code;
            if (this.errMessage === '200') {
              this.confirmationDialogService.confirm(
                Constant.ManaRoom_DIALOG_TITLE.title,
                Constant.ManaRoom_DIALOG_TITLE.DeleteVehicle
              );
            } else {
              this.confirmationErrDialogService.confirm(
                Constant.ManaRoom_DIALOG_TITLE.title,
                Constant.ManaRoom_DIALOG_TITLE.DeleteFailedVehicle
              );
            }
          });
      }
    });
  }
  // onSearchChange(filter: filter) {
  //   if (filter.filterValue == '' || filter.filterValue == '') {
  //     this.typeBikeList = [];
  //   } else {
  //     this.manageTypeBikeService
  //       .getTypeBikeWithFilter(filter)
  //       .subscribe((res) => {
  //         this.typeBikeList = res.data;
  //         this.page = 1;
  //       });
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      if(this.searchForm.value.filterName === 'all'){
        this.loadData()
      }
      else if (
        this.searchForm.value.filterName === '' &&
        this.searchForm.value.filterValue === ''
      ) {
        this.loadData();
      } else if (
        this.searchForm.value.filterName !== null &&
        this.searchForm.value.filterValue === ''
      ) {
        this.loadData();
      } else if (
        this.searchForm.value.filterName === 'all' &&
        this.searchForm.value.filterValue !== ''
      ) {
        this.typeBikeList = [];
      } else {
        this.manageTypeBikeService
          .getTypeBikeWithFilter(this.searchForm.value)
          .subscribe((res) => {
            if (res.data === null) {
              this.typeBikeList = [];
            } else {
              this.typeBikeList = res.data;
              this.page = 1;
            }
          });
      }
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
