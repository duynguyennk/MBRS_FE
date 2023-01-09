import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Customer } from 'src/app/model/customer';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { CustomerAccountService } from 'src/app/services/customer-account.service';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  errMessage: any;
  objectConfirm: any;
  submitted = false;
  customerInformation: any;
  isLoading = false;
  department: any;
  informationObject: any;
  accountID: any;
  defaultCheckYears:any
  //
  isEmpty = Validate.contentValidate.isEmpty;
  isLetter = Validate.contentValidate.isLetter;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast4C = Validate.contentValidate.atLeast4C;
  isEmail = Validate.contentValidate.isEmail;
  isNum = Validate.contentValidate.isNum;
  isPhone = Validate.contentValidate.isPhone;
  atLeast10C = Validate.contentValidate.atLeast10C;
  isPassword = Validate.contentValidate.isPassword;
  atLeast8C = Validate.contentValidate.atLeast8C;
  notspace = Validate.contentValidate.notspace;
  atLeastNum_Let = Validate.contentValidate.atLeastNum_Let;
  atLeast12C = Validate.contentValidate.atLeast12C;

  matchPassword = Validate.contentValidate.matchPassword;

  //
  customerForm = new UntypedFormGroup({
    customerID: new UntypedFormControl(),
    accountID: new UntypedFormControl(),
    fullName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter),
    ]),
    identifyNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.phone),
    ]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new UntypedFormControl('', [Validators.required]),
  });
  constructor(
    private customerAccountService: CustomerAccountService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
    this.accountID = localStorage.getItem('idUser');
    this.getAccCustomerInfor();
    this.defaultCheckYears = new Date();
    this.defaultCheckYears = formatDate(
      this.defaultCheckYears.setDate(this.defaultCheckYears.getDate() - 6570),
      'yyyy-MM-dd',
      'en-US','+0700'
    );
  }

  getAccCustomerInfor() {
    this.customerAccountService
      .getCustomerInformationByID(this.accountID)
      .subscribe((res) => {
        this.customerForm.controls.customerID.setValue(
          res.data[0]['customerID']
        );
        this.customerForm.controls.accountID.setValue(this.accountID);
        this.customerForm.controls.fullName.setValue(res.data[0]['fullName']);
        this.customerForm.controls.identifyNumber.setValue(
          res.data[0]['identifyNumber']
        );
        this.customerForm.controls.phoneNumber.setValue(
          res.data[0]['phoneNumber']
        );
        this.customerForm.controls.email.setValue(res.data[0]['email']);
        this.customerForm.controls.dateOfBirth.setValue(
          this.formatDate(res.data[0]['dateOfBirth'])
        );
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
  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.view_profile.confirmUpdateAcc
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
                  Constant.view_profile.title,
                  Constant.view_profile.updateAcc
                );
              } else {
                this.confirmationErrDialogService.confirm(
                  Constant.view_profile.title,
                  Constant.view_profile.updateAccFailed
                );
              }
            });
          setTimeout(() => {
            this.router.navigateByUrl('/homepage').then(() => {
              window.location.reload();
            });
          }, 1500);
        }
      });
    }
  }
  loadSnipper() {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
