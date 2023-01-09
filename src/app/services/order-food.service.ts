import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderFoodService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getListFood(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_food/GetListFood", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByIdentity(identifyNumber: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_food/GetCustomerInformationByIdentity?identifyNumber=" + identifyNumber, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByRoomName(roomName: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_food/GetCustomerInformationByRoomName?roomName=" + roomName, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  paymentFoodOrder(price: any) {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_food/CreateLinkPaymentFoodOrder?price=" + price, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByID(accountID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_food/GetCustomerInformationByID?accountID=" + accountID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderFood(orderFoodInformationViewModel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_food/CreateOrderFood", orderFoodInformationViewModel, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
