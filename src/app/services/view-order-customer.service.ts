import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CancelOrderRoomCustomer } from '../model/cancelOrderRoomCustomer';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderCustomerService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getListOrderRoom(customerID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/view_order_customer/GetAllOrderRoom?customerID=" + customerID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getListOrderFood(customerID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/view_order_customer/GetAllOrderFood?customerID=" + customerID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getListOrderBike(customerID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/view_order_customer/GetAllOrderBike?customerID=" + customerID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  cancelOrderRoomCustomer(cancelOrderRoomCustomer: CancelOrderRoomCustomer): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/view_order_customer/CancelOrderRoomCustomer", cancelOrderRoomCustomer, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByID(accountID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/view_order_customer/GetCustomerInformationByID?accountID=" + accountID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
