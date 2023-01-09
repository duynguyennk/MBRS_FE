import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Department } from 'src/app/model/Department';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageCustomerAccountService } from 'src/app/services/manage-customer-account.service';

@Component({
  selector: 'app-create-acc-customer',
  templateUrl: './create-acc-customer.component.html',
  styleUrls: ['./create-acc-customer.component.css'],
})
export class CreateAccCustomerComponent implements OnInit {
  objectConfirm: any;
  isLoading = false;
  errMessage!: string;
  department!: Department;
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  isLetter = Validate.contentValidate.isLetter;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast4C = Validate.contentValidate.atLeast4C;
  isEmail = Validate.contentValidate.isEmail;
  isNum = Validate.contentValidate.isNum;
  isPhone = Validate.contentValidate.isPhone;
  atLeast10C = Validate.contentValidate.atLeast10C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let
  atLeast12C = Validate.contentValidate.atLeast12C
  checkConfirm: any;
  defaultCheckYears: any
  //
  customerForm = new UntypedFormGroup({
    fullName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter),
    ]),
    userName: new UntypedFormControl('', [Validators.required, Validators.pattern(Validate.username)]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    identifyNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    dateOfBirth: new UntypedFormControl('', [Validators.required]),
  });
  constructor(
    private customerAccountService: ManageCustomerAccountService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadSnipper();
    this.getListDepartment();
    this.defaultCheckYears = new Date();
    this.defaultCheckYears = formatDate(
      this.defaultCheckYears.setDate(this.defaultCheckYears.getDate() - 6570),
      'yyyy-MM-dd',
      'en-US', '+0700'
    );
  }
  getListDepartment() {
    this.customerAccountService.getListDepartmentService().subscribe((res) => {
      this.department = res.data;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaCRUD_DIALOG_TITLE.confirmAddEvents,
      };

      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.customerAccountService
            .createCustomerService(this.customerForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              console.log(res);
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaCRUD_DIALOG_TITLE.title,
                  Constant.ManaCRUD_DIALOG_TITLE.AddEvents
                );
                setTimeout(() => {
                  this.router.navigateByUrl('manage-account/manage-customer').then(() => {
                    window.location.reload();
                  });;
                },
                  1500);
              }
            }, (error) => {
              this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, error.error.errorMessage)
            });
        }
      });
    }
  }
  cancelForm() {
    this.router.navigateByUrl('manage-account/manage-customer').then(() => {
      window.location.reload();
    });;
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
