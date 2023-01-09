import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class ManageOrderRoomService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
  getOrderRooms(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_order_room/GetListOrderRoom", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  updateStatusPayment(orderID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_order_room/UpdateStatusPayment?orderID=" + orderID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getOrderRoomsWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_order_room/GetListOrderRoomWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  
  completedBackPayment(orderID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_order_room/CompletedBackPayment?orderID=" + orderID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  deleteOrderRoom(orderID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_order_room/DeleteAOrderRoom?orderID=" + orderID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
