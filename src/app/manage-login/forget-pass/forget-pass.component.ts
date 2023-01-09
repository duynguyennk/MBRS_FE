import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingComponent } from 'src/app/constant/loading';
import { Validate } from 'src/app/constant/validation';
import { Users } from 'src/app/model/Users';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  isLoading = false
  errMessage!:string
  stringMessage!:string
  siteKey="6LdHBlQjAAAAAHl30pXt05LgWO0D7EQ7N4fRaXdy";
  checkForgetPassword: any;
  // 
  submitted = false
  isEmpty = Validate.contentValidate.isEmpty
  atLeast2C = Validate.contentValidate.atLeast2C
  atLeast4C = Validate.contentValidate.atLeast4C
  isEmail = Validate.contentValidate.isEmail
  notspace = Validate.contentValidate.notspace
  // 
  forgetPasswordForm = new UntypedFormGroup({
    UserName: new UntypedFormControl("",[Validators.required, Validators.pattern(Validate.username)]),
    Email: new UntypedFormControl("",[Validators.required,Validators.email]),
    recaptcha: new UntypedFormControl('', Validators.required),
  })
  constructor(private loginService : LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loadSnipper()
  }
  onSubmit(){
    this.submitted = true
    if(this.forgetPasswordForm.invalid){
      return
    }else{
      this.loginService.forgetPasswordService(this.forgetPasswordForm.value).subscribe(res =>
        {
          this.errMessage = res.code
          console.log(res.code)               
          if(res.user !== null){
            this.checkForgetPassword = res.data;    
          }else{
            if(this.errMessage !== '200'){
              this.stringMessage = res.errorMessage
            }
          }
        })     
        this.router.navigateByUrl('/manage-login')        
    } 
  }
  loadSnipper(){
    this.isLoading= true;
    setTimeout(()=>(this.isLoading=false),LoadingComponent.timeLoad)
  }
}
