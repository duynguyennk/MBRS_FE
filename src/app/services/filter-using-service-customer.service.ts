import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterUsingServiceCustomerService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  checkUsingCustomerService(accountID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/filter_using_service_customer/FilterUsingCustomerService?accountID=" + accountID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
