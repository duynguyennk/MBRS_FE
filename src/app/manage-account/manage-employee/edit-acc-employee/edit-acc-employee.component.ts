import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
// import { group } from 'console';
import { Validate } from 'src/app/constant/validation';
import { Employee } from 'src/app/model/employee';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';

import { ManageEmployeeAccountService } from 'src/app/services/manage-employee-account.service';

@Component({
  selector: 'app-edit-acc-employee',
  templateUrl: './edit-acc-employee.component.html',
  styleUrls: ['./edit-acc-employee.component.css'],
})
export class EditAccEmployeeComponent implements OnInit {
  isLoading = false;
  department: any;
  employeeInformation: any;
  errMessage!: string;
  objectConfirm: any;
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  isLetter = Validate.contentValidate.isLetter;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast4C = Validate.contentValidate.atLeast4C;
  isEmail = Validate.contentValidate.isEmail;
  isNum = Validate.contentValidate.isNum;
  atLeast10C = Validate.contentValidate.atLeast10C;
  notspace = Validate.contentValidate.notspace;
  atLeast12C = Validate.contentValidate.atLeast12C;
  defaultCheckYears: any
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
    departmentID: new UntypedFormControl('', Validators.required),
    employeeID: new UntypedFormControl(),
    accountID: new UntypedFormControl(),
  });
  employee!: string;
  constructor(
    private route: ActivatedRoute,
    private employeeAccountService: ManageEmployeeAccountService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService,
    private dialogService: DialogService
  ) {
    this.employeeInformation = new Employee();
    if (route.snapshot.params['id']) {
      this.employeeInformation.employeeID = route.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadSnipper();
    this.getListDepartment();
    this.getEmployeeInformation();
    this.getListDepartment();
    this.defaultCheckYears = new Date();
    this.defaultCheckYears = formatDate(
      this.defaultCheckYears.setDate(this.defaultCheckYears.getDate() - 5475),
      'yyyy-MM-dd',
      'en-US', '+0700'
    );
  }
  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaCRUD_DIALOG_TITLE.confirmEditEvents,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.employeeAccountService
            .updateEmployee(this.employeeForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              this.getEmployeeInformation();
              if (this.errMessage === '200') {
                this.confirmationDialogService.confirm(
                  Constant.ManaCRUD_DIALOG_TITLE.title,
                  Constant.ManaCRUD_DIALOG_TITLE.EditEvents
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
  cancelForm() {
    this.router.navigateByUrl('manage-account/manage-employee');
  }
  getListDepartment() {
    this.employeeAccountService.getListDepartmentService().subscribe((res) => {
      this.department = res.data;
    });
  }
  getEmployeeInformation() {
    this.employeeAccountService
      .getEmployeeInformationService(this.route.snapshot.params['id'])
      .subscribe((res) => {
        console.log(res);
        this.employeeForm.controls.employeeID.setValue(
          res.data[0]['employeeID']
        );
        this.employeeForm.controls.accountID.setValue(res.data[0]['accountID']);
        this.employeeForm.controls.fullName.setValue(res.data[0]['fullName']);
        this.employeeForm.controls.userName.setValue(res.data[0]['userName']);
        this.employeeForm.controls.email.setValue(res.data[0]['email']);
        this.employeeForm.controls.identifyNumber.setValue(
          res.data[0]['identifyNumber']
        );
        this.employeeForm.controls.phoneNumber.setValue(
          res.data[0]['phoneNumber']
        );
        this.employeeForm.controls.dateOfBirth.setValue(
          this.formatDate(res.data[0]['dateOfBirth'])
        );
        this.employeeForm.controls.departmentID.setValue(
          res.data[0]['departmentID']
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
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
