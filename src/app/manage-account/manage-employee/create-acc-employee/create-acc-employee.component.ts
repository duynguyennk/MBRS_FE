import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Employee } from 'src/app/model/employee';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ManageEmployeeAccountService } from 'src/app/services/manage-employee-account.service';

@Component({
  selector: 'app-create-acc-employee',
  templateUrl: './create-acc-employee.component.html',
  styleUrls: ['./create-acc-employee.component.css'],
})
export class CreateAccEmployeeComponent implements OnInit {
  isLoading = false;
  objectConfirm: any;
  department: any;
  submitted = false;
  errMessage!: string;
  //
  isEmpty = Validate.contentValidate.isEmpty;
  isLetter = Validate.contentValidate.isLetter;
  isPhone = Validate.contentValidate.isPhone;
  isEmail = Validate.contentValidate.isEmail;
  atLeast10C = Validate.contentValidate.atLeast10C;
  atLeast2C = Validate.contentValidate.atLeast2C;
  isNum = Validate.contentValidate.isNum;
  atLeast4C = Validate.contentValidate.atLeast4C;
  notspace = Validate.contentValidate.notspace;
  atLeast12C = Validate.contentValidate.atLeast12C;
  defaultCheckYears:any
  //
  employeeForm = new UntypedFormGroup({
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
    dateOfBirth: new UntypedFormControl('', Validators.required),
    role: new UntypedFormControl('', Validators.required),
  });
  //
  constructor(
    private employeeAccountService: ManageEmployeeAccountService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
    this.getListDepartment();
    this.defaultCheckYears = new Date();
    this.defaultCheckYears = formatDate(
      this.defaultCheckYears.setDate(this.defaultCheckYears.getDate() - 5475),
      'yyyy-MM-dd',
      'en-US','+0700'
    );
  }

  getListDepartment() {
    this.employeeAccountService.getListDepartmentService().subscribe((res) => {
      this.department = res.data;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaCRUD_DIALOG_TITLE.confirmAddEvents,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.employeeAccountService
            .createEmployee(this.employeeForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaCRUD_DIALOG_TITLE.title,
                  Constant.ManaCRUD_DIALOG_TITLE.AddEvents
                );
                setTimeout(() => {
                  this.router
                    .navigateByUrl('manage-account/manage-employee')
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
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
  cancelForm() {
    this.router.navigateByUrl('manage-account/manage-employee');
  }
}
