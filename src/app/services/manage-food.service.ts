import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from '../model/filter';
import { Food } from '../model/food';
import { ItemImage } from '../model/itemImage';

@Injectable({
  providedIn: 'root'
})
export class ManageFoodService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getFoods(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_food/GetListFood", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  public postImage(itemImage: ItemImage): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_food/UpdateImageFood", itemImage, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      }),
    });
  }

  getTheFoodInformation(foodID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_food/GetTheFoodInformation?foodID=" + foodID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getFoodWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_food/GetListFoodWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createFood(food: Food): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_food/CreateFood", food, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  updateFood(food: Food): Observable<any> {
    console.log(food)
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_food/UpdateFood", food, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getAllType(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_food/GetAllTypeFood", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  
  deleteFood(foodID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_food/DeleteAFood?foodID=" + foodID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
}
