import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/constant/checkMatchPass';
import { Constant } from 'src/app/constant/constant';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { TitleMessage } from 'src/app/model/titleMessage.type';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { ConfirmationErrDialogService } from 'src/app/services/confirmation-err-dialog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
})
export class ChangePassComponent implements OnInit {
  isLoading = false;
  errMessage!: string;
  stringMessage!: string;
  resultResponse: any;
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  isPassword = Validate.contentValidate.isPassword;
  atLeast2C = Validate.contentValidate.atLeast2C;
  atLeast8C = Validate.contentValidate.atLeast8C;
  notspace = Validate.contentValidate.notspace;
  siteKey = '6LdHBlQjAAAAAHl30pXt05LgWO0D7EQ7N4fRaXdy';
  objectConfirm: any;
  matchPassword = Validate.contentValidate.matchPassword;
  fieldTextType!: boolean;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  //
  changePasswordForm = new UntypedFormGroup(
    {
      userName: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(Validate.username),
      ]),
      oldPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(Validate.password),
      ]),
      confirmPassword: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(Validate.password),
      ]),
      recaptcha: new UntypedFormControl('', Validators.required),
    },
    {
      validators: [Validation.match('newPassword', 'confirmPassword')],
    }
  );
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialogService: DialogService,
    private confirmationDialogService: ConfirmationDialogService,
    private confirmationErrDialogService: ConfirmationErrDialogService
  ) {}

  ngOnInit(): void {
    this.loadSnipper();
  }

  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    } else {
      var titleMessage: TitleMessage = {
        title: Constant.textNotice.title,
        titleMessageContent: Constant.ManaCRUD_DIALOG_TITLE.confirmChangePass,
      };
      this.objectConfirm = this.dialogService.openConfirmDialog(titleMessage);
      this.objectConfirm.afterClosed().subscribe((result: any) => {
        if (result) {
          this.loginService
            .changePasswordService(this.changePasswordForm.value)
            .subscribe((res) => {
              this.errMessage = res.code;
              if (this.errMessage === '200' || res.user !== null) {
                localStorage.clear();
                this.confirmationDialogService.confirm(
                  Constant.LOGIN_DIALOG_CONTENT.title,
                  Constant.LOGIN_DIALOG_CONTENT.changePassSuccess
                );
              } else if (this.errMessage === '404') {
                this.stringMessage = res.errorMessage;
              } else {
                this.stringMessage = res.errorMessage;
                this.confirmationErrDialogService.confirm(
                  Constant.LOGIN_DIALOG_CONTENT.title,
                  Constant.LOGIN_DIALOG_CONTENT.changePassFailed
                );
              }
            });
        }
        setTimeout(() => {
          this.router.navigateByUrl('/manage-login').then(() => {
            window.location.reload();
          });
        }, 1500);
      });
    }
  }

  loadSnipper() {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
