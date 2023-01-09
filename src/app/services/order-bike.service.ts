import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderBikeInformation } from '../model/orderBikeInformation';
import { SearchBike } from '../model/searchBike';

@Injectable({
  providedIn: 'root'
})
export class OrderBikeService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTypeBike(searchBike: SearchBike): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_bike/GetListTypeBike?dateGet=" + searchBike.dateRent + "&hoursGet=" + searchBike.hoursGetBike + "&hoursRent=" + searchBike.timeHire + "&quantity=" + searchBike.numberOfBike, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByRoomName(roomName: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_bike/GetCustomerInformationByRoomName?roomName=" + roomName, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  paymentBikeOrder(price: string, numberHoursRent: number, typeBikeName: string, numberOfBike: number) {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_bike/CreateLinkPaymentBikeOrder?price=" + price + "&numberHoursRent=" + numberHoursRent + "&typeBikeName=" + typeBikeName + "&numberOfBike=" + numberOfBike, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getCustomerInformationByID(accountID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/order_bike/GetCustomerInformationByID?accountID=" + accountID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createOrderBike(orderBikeInformation: OrderBikeInformation): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/order_bike/CreateOrderBike", orderBikeInformation, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
