import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeStatusRoom } from '../model/changeStatusRoom';
import { SearchStatusRoom } from '../model/searchStatusRoom';

@Injectable({
  providedIn: 'root'
})
export class ViewStatusRoomService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getListRoom(searchStatusRoom: Date): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/view_status_room/GetListRoom?selectDate=" + searchStatusRoom, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getNumberOfRoomStatus(searchStatusRoom: Date): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/view_status_room/GetNumberRoomStatus?selectDate=" + searchStatusRoom, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  updateStatusRoom(changeStatusRoom: ChangeStatusRoom): Observable<any> {
    console.log(changeStatusRoom);
    return this.http.get<any>(this.apiUrl + "/v1/api/view_status_room/UpdateStatusRoom?valueStatus=" + changeStatusRoom.valueStatus + "&orderID=" + changeStatusRoom.orderID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getListFloor(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/view_status_room/GetListFloor", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  
}
