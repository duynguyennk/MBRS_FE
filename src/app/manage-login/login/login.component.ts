import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Users } from 'src/app/model/Users';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  checkLogin!: number;
  stringError: any;
  isLoading = false
  siteKey="6LdHBlQjAAAAAHl30pXt05LgWO0D7EQ7N4fRaXdy";
  //
  submitted = false;
  isEmpty = Validate.contentValidate.isEmpty;
  //
  fieldTextType!: boolean;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  loginForm = new UntypedFormGroup({
    UserName: new UntypedFormControl('', Validators.required),
    Password: new UntypedFormControl('', Validators.required),
    recaptcha: new UntypedFormControl('', Validators.required),
  });
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loadSnipper()
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    } else {
      this.loginService
        .loginService(this.loginForm.value)
        .subscribe((result) => {
          localStorage.setItem('TokenData', result.data);

          if (result.user !== null) {
            localStorage.setItem('idUser', result.user.accountID);
            localStorage.setItem('UserInformation', result.user.fullName);
            localStorage.setItem('Role', result.user.departmentCode);
            if (result.user.departmentCode === 'AM') {
              this.router.navigate(['manage-account']);
            } else if (result.user.departmentCode === 'MN') {
              this.router.navigate(['manage-room']);
            } else if (result.user.departmentCode === 'LT') {
              this.router.navigate(['receptionist']);
            } else {
              this.router.navigate(['homepage']).then(() => {
                window.location.reload();
              })
            }
          } else {
            if (result.code !== '200') {
              this.stringError = result.errorMessage;
              console.log(result.code)
            }
          }
        });
    }
  }
  loadSnipper() {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), LoadingComponent.timeLoad);
  }
}
