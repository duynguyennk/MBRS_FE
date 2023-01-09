import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';
import { filter } from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class ManageCustomerAccountService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCustomerService(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetListCustomerAccount", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationService(customerID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetACustomerAccountToUpdateByID?customerID=" + customerID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  deleteCustomerService(customerID: number, accountID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_account/DeleteCustomerAccount?customerID=" + customerID + "&accountID=" + accountID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createCustomerService(customerViewModel: Customer): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_account/CreateCustomerAccount", customerViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  updateCustomerService(customerViewModel: Customer): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/v1/api/manage_account/UpdateCustomerAccount?customerID=" + customerViewModel.customerID + "&accountID=" + customerViewModel.accountID, customerViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getListDepartmentService(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetListDeparment", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomersWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_account/GetListCustomerAccountWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
