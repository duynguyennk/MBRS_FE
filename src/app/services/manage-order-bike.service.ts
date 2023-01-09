import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from '../model/filter';
import { StatusBike } from '../model/statusBike';

@Injectable({
  providedIn: 'root'
})
export class ManageOrderBikeService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrderBikes(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_order_room/GetListOrderBike", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  updateStatusBike(statusBike: StatusBike): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_order_room/UpdateStatusBike", statusBike, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getOrderBikesWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_order_room/GetListOrderBikeWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  deleteOrderBike(orderBikeID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_order_room/DeleteAOrderBike?orderRoomID=" + orderBikeID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
