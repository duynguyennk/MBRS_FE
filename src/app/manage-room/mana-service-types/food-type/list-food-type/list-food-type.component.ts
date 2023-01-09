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
import { ManageTypeFoodService } from 'src/app/services/manage-type-food.service';

@Component({
  selector: 'app-list-food-type',
  templateUrl: './list-food-type.component.html',
  styleUrls: ['./list-food-type.component.css'],
})
export class ListFoodTypeComponent implements OnInit {
  isLoading = false;
  errMessage!: string;
  typeFoodList: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fullName: any;
  objectConfirm: any;
  orderHeader: String = '';
  isDescOrder: boolean = true;
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  //
  searchForm = new UntypedFormGroup({
    filterValue: new UntypedFormControl(),
    filterName: new UntypedFormControl('', Validators.required),
  });
  //
  constructor(
    private manageTypeFoodService: ManageTypeFoodService,
    private confirmationDialogService: ConfirmationDialogService,
    private dialogService: DialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}
  ngOnInit(): void {
    this.loadSnipper();
    this.loadData();
  }
  loadData() {
    this.manageTypeFoodService.getTypeFoods().subscribe((res) => {
      if (res.code === '200') {
        this.typeFoodList = res.data;
      } else {
        this.confirmationErrDialogService.confirm(
          Constant.loadData.title,
          Constant.loadData.errData
        );
      }
    });
  }
  deleteTypeFood(typeFoodID: number) {
    var titleMessage: TitleMessage = {
      title: Constant.textNotice.title,
      titleMessageContent: Constant.ManaRoom_DIALOG_TITLE.confirmDeleteFood,
    };
    this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
    this.objectConfirm.afterClosed().subscribe((result: any) => {
      if (result) {
        this.manageTypeFoodService
          .deleteTypeFoods(typeFoodID)
          .subscribe((res) => {
            this.errMessage = res.code;
            this.loadData();
            if (this.errMessage === '200') {
              this.confirmationDialogService.confirm(
                Constant.ManaRoom_DIALOG_TITLE.title,
                Constant.ManaRoom_DIALOG_TITLE.DeleteFood
              );
            } else {
              this.confirmationErrDialogService.confirm(
                Constant.ManaRoom_DIALOG_TITLE.title,
                Constant.ManaRoom_DIALOG_TITLE.DeleteFoodFailed
              );
            }
          });
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      if(this.searchForm.value.filterName === 'all'){
        this.loadData()
      }else if (
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
        this.typeFoodList = [];
      } else {
        this.manageTypeFoodService
          .getTypeFoodsWithFilter(this.searchForm.value)
          .subscribe((res) => {
            if (res.data === null) {
              this.typeFoodList = [];
            } else {
              this.typeFoodList = res.data;
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
