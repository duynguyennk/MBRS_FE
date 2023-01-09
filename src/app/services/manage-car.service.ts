import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarAirport } from '../model/carAirport';
import { filter } from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class ManageCarService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllCar(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_car/GetListCar", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  deleteCar(carID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_car/DeleteACar?carID=" + carID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getTheCarInformation(carID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_car/GetTheCarInformation?carID=" + carID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getCarsWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_car/GetListCarWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  updateCar(carAirport: CarAirport): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_car/UpdateCar", carAirport, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getAllTypeCar(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_car/GetAllTypeCar", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getDetailInformationCar(typeCarID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_car/GetDetailInformationCar?typeCarID=" + typeCarID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  createCar(carAirport: CarAirport): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_car/CreateCar", carAirport, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
