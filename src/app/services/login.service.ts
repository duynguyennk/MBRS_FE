import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { changePassword } from '../model/changePassword';
import { Users } from '../model/Users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  loginService(Users: Users): Observable<any> {
    console.log(Users);
    return this.http.post<any>(this.apiUrl + "/v1/api/login/Login", Users);
  }
  changePasswordService(changePasswordModel: changePassword): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/login/ChangePassword", changePasswordModel);
  }
  forgetPasswordService(Users: Users): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/login/ForgetPassword", Users);
  }
  getCustomerInformationByID(accountID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/login/GetCustomerInformationByID?accountID=" + accountID);
  }

}
