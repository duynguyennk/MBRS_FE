import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Customer } from 'src/app/model/customer';
import { Department } from 'src/app/model/Department';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageCustomerAccountService } from 'src/app/services/manage-customer-account.service';

@Component({
  selector: 'app-edit-acc-customer',
  templateUrl: './edit-acc-customer.component.html',
  styleUrls: ['./edit-acc-customer.component.css'],
})
export class EditAccCustomerComponent implements OnInit {
  isLoading = false;
  errMessage!: string;
  department: any;
  customerInformation: any;
  objectConfirm: any;
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  isLetter = Validate.contentValidate.isLetter;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast4C = Validate.contentValidate.atLeast4C;
  isEmail = Validate.contentValidate.isEmail;
  isNum = Validate.contentValidate.isNum;
  isPhone = Validate.contentValidate.isPhone;
  atLeast10C = Validate.contentValidate.atLeast10C;
  atLeast12C = Validate.contentValidate.atLeast12C;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  defaultCheckYears: any
  //
  customerForm = new UntypedFormGroup({
    customerID: new UntypedFormControl(),
    accountID: new UntypedFormControl(),
    fullName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter),
    ]),
    userName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.username),
    ]),
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
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService
  ) {
    this.customerInformation = new Customer();
    if (route.snapshot.params['id']) {
      this.customerInformation.customerID = route.snapshot.params['id'];
    }
  }
  ngOnInit(): void {
    this.loadSnipper();
    this.getListDepartment();
    this.getAccCustomerInfor();
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
        titleMessageContent: Constant.ManaCRUD_DIALOG_TITLE.confirmEditEvents,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.customerAccountService
            .updateCustomerService(this.customerForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.getAccCustomerInfor();
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaCRUD_DIALOG_TITLE.title,
                  Constant.ManaCRUD_DIALOG_TITLE.EditEvents
                );
                setTimeout(() => {
                  this.router
                    .navigateByUrl('manage-account/manage-customer')
                    .then(() => {
                      window.location.reload();
                    });
                }, 1500);
              }
            }, (error) => {
              this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, error.error.errorMessage)
            });
        }
      });
    }
  }

  getAccCustomerInfor() {
    this.customerAccountService
      .getCustomerInformationService(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.customerForm.controls.customerID.setValue(
          res.data[0]['customerID']
        );
        this.customerForm.controls.accountID.setValue(res.data[0]['accountID']);
        this.customerForm.controls.fullName.setValue(res.data[0]['fullName']);
        this.customerForm.controls.userName.setValue(res.data[0]['userName']);
        this.customerForm.controls.email.setValue(res.data[0]['email']);
        this.customerForm.controls.identifyNumber.setValue(
          res.data[0]['identifyNumber']
        );
        this.customerForm.controls.phoneNumber.setValue(
          res.data[0]['phoneNumber']
        );
        this.customerForm.controls.dateOfBirth.setValue(
          this.formatDate(res.data[0]['dateOfBirth'])
        );
        console.log(res.data);
      });
  }
  private formatDate(date: string | number | Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
