import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from '../model/filter';
import { TypeFood } from '../model/typeFood';

@Injectable({
  providedIn: 'root'
})
export class ManageTypeFoodService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTypeFoods(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_food/GetListTypeFood", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getTheTypeFoodsInformation(typeFoodID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_food/GetTheTypeFoodInformation?typeFoodID=" + typeFoodID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getTypeFoodsWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_food/GetListTypeFoodWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createTypeFoods(typeFood: TypeFood): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_food/CreateTypeFood", typeFood, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  updateTypeFoods(typeFood: TypeFood): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_food/UpdateTypeFood", typeFood, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  deleteTypeFoods(typeFoodID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_type_food/DeleteATypeFood?typeFoodID=" + typeFoodID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
