import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  registerCustomerAccount(customerViewModel: Customer): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/customer_account/RegisterCustomerAccount", customerViewModel);
  }
  getCustomerInformationByID(accountID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/customer_account/GetCustomerInformationByID?accountID=" + accountID);
  }
  updateCustomerService(customerViewModel: Customer): Observable<any> {
    console.log(customerViewModel);
    return this.http.put<any>(this.apiUrl + "/v1/api/customer_account/UpdateCustomerAccount?customerID=" + customerViewModel.customerID + "&accountID=" + customerViewModel.accountID, customerViewModel);
  }
}
