import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Department } from 'src/app/model/Department';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import Validation from '../constant/checkMatchPass';
import { CustomerAccountService } from '../services/customer-account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false
  errMessageContent!: string;
  errMessage!: string
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
  isPassword = Validate.contentValidate.isPassword
  atLeast8C = Validate.contentValidate.atLeast8C
  notspace = Validate.contentValidate.notspace;
  matchPassword = Validate.contentValidate.matchPassword
  defaultCheckYears:any
  siteKey="6LdHBlQjAAAAAHl30pXt05LgWO0D7EQ7N4fRaXdy";

  //
  customerForm = new UntypedFormGroup({
    fullName: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.letter),
    ]),
    userName: new UntypedFormControl('', [Validators.required,Validators.pattern(Validate.username)]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    identifyNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.number),
    ]),
    phoneNumber: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(Validate.phone),
    ]),
    dateOfBirth: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required,Validators.pattern(Validate.password)]),
    passwordConfirm: new UntypedFormControl('', [Validators.required,Validators.pattern(Validate.password)]),
    recaptcha: new UntypedFormControl('', Validators.required),
  },
  {
    validators: [Validation.match('password', 'passwordConfirm')]
  });
  constructor(
    private customerAccountService: CustomerAccountService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) { }

  ngOnInit(): void {
    this.loadSnipper()
    this.defaultCheckYears = new Date();
    this.defaultCheckYears = formatDate(
      this.defaultCheckYears.setDate(this.defaultCheckYears.getDate() - 6570),
      'yyyy-MM-dd',
      'en-US','+0700'
    );
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    } else {
      this.customerAccountService
        .registerCustomerAccount(this.customerForm.value)
        .subscribe((res) => {
          this.errMessage = res.code
          if (this.errMessage === '200') {
            this.confirmationDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title, Constant.ManaCRUD_DIALOG_TITLE.AddEvents)
            setTimeout(() => {
              this.router.navigateByUrl('manage-login').then(() => {
                window.location.reload();
              });
            }, 1500);
          }
        },
        (error) => {
         this.confirmationErrDialogService.confirm(Constant.ManaCRUD_DIALOG_TITLE.title,error.error.errorMessage)
        });
    }
  }
  loadSnipper(): void {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }

  // private dateRangeValidatorAge: ValidatorFn = (): {
  //   [key: string]: any;
  // } | null => {
  //   let invalid = false;
  //   const from = this.customerForm && this.customerForm.get('checkInDate')!.value;
  //   const to = this.customerForm && this.customerForm.get('checkOutDate')!.value;
  //   if (from && to) {
  //     invalid = new Date(from).valueOf() > new Date(to).valueOf();
  //   }
  //   return invalid ? { invalidRange: { from, to } } : null;
  // };
}
