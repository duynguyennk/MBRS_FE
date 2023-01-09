import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from '../model/filter';
import { ItemImage } from '../model/itemImage';
import { TypeBike } from '../model/typeBike';

@Injectable({
  providedIn: 'root'
})
export class ManageTypeBikeService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTypeBike(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_bike/GetListTypeBike", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getTheTypeBikeInformation(typeBikeID: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_bike/GetTheTypeBikeInformation?typeBikeID=" + typeBikeID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  getTypeBikeWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_type_bike/GetListTypeBikeWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  createTypeBike(typeBike: TypeBike): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_bike/CreateTypeBike", typeBike, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  updateTypeBike(typeBike: TypeBike): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_bike/UpdateTypeBike", typeBike, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  deleteTypeBike(typeBikeID: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/v1/api/manage_type_bike/DeleteATypeBike?typeBikeID=" + typeBikeID, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }
  public postImage(itemImage: ItemImage): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_type_bike/UpdateImageTypeBike", itemImage, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      }),
    });
  }
}
