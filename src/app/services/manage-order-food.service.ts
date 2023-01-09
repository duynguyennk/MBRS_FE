import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from '../model/filter';
import { StatusFood } from '../model/statusFood';

@Injectable({
  providedIn: 'root'
})
export class ManageOrderFoodService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrderFoods(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_order_food/GetListOrderFood", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  updateStatusFood(statusFood: StatusFood): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_order_food/UpdateStatusFood", statusFood, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getOrderFoodsWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_order_food/GetListOrderFoodWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
