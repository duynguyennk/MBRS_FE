import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bike } from '../model/bike';
import { filter } from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class ManageBikeService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAllBike(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_bike/GetListBike", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  deleteBike(bikeID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_bike/DeleteABike?bikeID=" + bikeID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getTheBikeInformation(bikeID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_bike/GetTheBikeInformation?bikeID=" + bikeID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getBikesWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_bike/GetListBikeWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  updateBike(bike: Bike): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_bike/UpdateBike", bike, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getAllTypeBike(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_bike/GetAllTypeBike", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getDetailInformationBike(typeBikeID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_bike/GetDetailInformationBike?typeBikeID=" + typeBikeID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  createBike(bike: Bike): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_bike/CreateBike", bike, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
