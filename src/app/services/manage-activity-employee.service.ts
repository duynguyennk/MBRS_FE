import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivityEmployee } from '../model/activityEmployee';
import { filter } from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class ManageActivityEmployeeService {
  private token = environment.tokenHeader + localStorage.getItem("TokenData");
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getActivityEmployee(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_activity_employee/GetListActivityEmployee", {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  getActivityEmployeeWithFilter(filter: filter): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/v1/api/manage_activity_employee/GetListActivityEmployeeWithFilter?filterName=" + filter.filterName + "&filterValue=" + filter.filterValue, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

  createActivityEmployee(activityEmployee: ActivityEmployee): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/v1/api/manage_activity_employee/CreateActivityEmployee", activityEmployee, {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    });
  }

}
